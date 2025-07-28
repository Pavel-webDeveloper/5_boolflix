<template>
    <section>
        <!-- <input type="text" v-model="textInput">
        <button @click="search(textInput)">Cerca</button> -->


        <!-- FILM E SERIE TV DATI DALLA RICERCA -->
        <!-- <div class="container-results" v-if="listaFilm != ''">

            <div class="container-film">
                <h1>Film</h1>
                <ul>
                    <li v-for="film in listaFilm" :key="film.id" @click="searchFilm(film.id)">
                          {{ film.title }}
                    </li>
                </ul>
            </div>

            <div class="container-serie" v-if="listaSerie.length > 0">
                <h1>Serie</h1>
                <ul>
                    <li v-for="serie in listaSerie" :key="serie.id">
                          {{ serie.name }}
                    </li>
                </ul>
            </div>
        </div> -->


        <!-- FILM SELEZIONATO -->
        <!-- <div class="dettaglio-film" v-if="filmSelezionato != null">
            <h1>film selezionato</h1>
            <ul>
                <li>{{ filmSelezionato.id }}</li>
                <li>{{ filmSelezionato.original_title }}</li>
                <li>{{ filmSelezionato.popularity }}</li>
                <li v-if="filmSelezionato.poster_path != null && filmSelezionato.poster_path != undefined">
                    <img :src="`https://image.tmdb.org/t/p/w500${filmSelezionato.poster_path}`"  alt="">
                </li>
            </ul>
            
                <div class="saga-collection" v-if="sagaFilm">
                    <h3>{{ sagaFilmName }}</h3>
                    <ul>
                        <li v-for="elm in sagaFilm" :key="elm.id">
                            {{ elm.title }}
                        </li>
                    </ul>
                </div>
        </div> -->


    <!-- CONTAINER LISTA FILM -->
        <div class="grid-container">

            <!-- FILM IN ARRIVO -->
            <!-- <div class="grid-list">
                <div class="title-list">
                    <h2><em>FILM IN ARRIVO</em></h2>
                </div>
                <div class="my-griglia">
                     <div class="my-box" v-for="film in listaFilmInArrivo" :key="film.id" @click="search(film.title), searchFilm(film.id)">
                        <div class="image-container">
                            <img :src="pathImg + film.poster_path" alt="">
                        </div>
                        <div class="my-description" :style="{ bottom: film.overview.length === 0 ? '-38px' : '-135px' }">
                            <h3>{{ film.title }}</h3>
                            <p>
                                <span v-if="film.overview.length > 0"><strong>Trama :</strong></span> <br/>
                                <em>{{ film.overview.slice(0, 250) }}</em>
                                <span v-if="film.overview.length > 250">...</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- adult: false
            backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg"
            first_air_date: "2008-01-20"
            genre_ids: [18, 80]
            id: 1396
            name: "Breaking Bad"
            origin_country: ["US"]
            original_language: "en"
            original_name: "Breaking Bad"
            overview: "Un insegnante di chimica con un cancro allo stadio terminale comincia a produrre e spacciare metanfetamina con un suo ex studente per assicurare un futuro alla famiglia."
            popularity: 168.758
            poster_path: "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg"
            vote_average: 8.925
            vote_count: 15822 -->

            <!-- SERIE TV piu' votate -->
            <!-- <div class="grid-list">
                <div class="title-list">
                    <h2><em>LE SERIE TV PIU' VOTATE</em></h2>
                </div>
                <div class="my-griglia">
                     <div class="my-box" v-for="serie in serieTvVotati" :key="serie.id">
                        <div class="image-container">
                            <img :src="pathImg + serie.poster_path" alt="">
                        </div>
                        <div class="my-description" :style="{ bottom: serie.overview.length === 0 ? '-38px' : '-135px' }">
                            <h3>{{ serie.name }}</h3>
                            <p>
                                <span v-if="serie.overview.length > 0"><strong>Trama :</strong></span> <br/>
                                <em>{{ serie.overview.slice(0, 250) }}</em>
                                <span v-if="serie.overview.length > 250">...</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div> -->

           


            
           
            <grid-list-component :listaVideo="listaFilmCercati" :titolo="'FILM CORRELATI'" :tipologia="'film'" @cercaTitolo="search" v-if="listaFilmCercati.length > 1"/>
            <grid-list-component :listaVideo="sagaFilm" :titolo="sagaFilmName" :tipologia="'film'" @cercaTitolo="search" v-if="sagaFilm != null"/>
            <grid-list-component :listaVideo="listaSerieCercati" :titolo="'SERIE TV POTREBBE INTERESSARTI ANCHE...'" :tipologia="'serieTv'" v-if="listaSerieCercati.length > 0"/>
            <grid-list-component :listaVideo="listaFilmSelezionati" :titolo="'FILM SELEZIONATI IN PRECEDENZA'" :tipologia="'film'" v-if="listaFilmSelezionati.length > 1"/>

            <grid-list-component :listaVideo="listaFilmInArrivo" :titolo="'FILM IN ARRIVO'" :tipologia="'film'" @cercaTitolo="search"/>
            <grid-list-component :listaVideo="listaFilmTendenza" :titolo="'FILM DI TENDENZA'" :tipologia="'film'" @cercaTitolo="search"/>
            <grid-list-component :listaVideo="serieTvVotati" :titolo="'LE SERIE TV PIU VOTATE'" :tipologia="'serieTv'"/>
            <grid-list-component :listaVideo="serieTvPopolare" :titolo="'SERIE TV POPOLARE'" :tipologia="'serieTv'"/>
        </div>

    </section>
</template>

<script>
import axios from 'axios';
import GridListComponent from './GridListComponent.vue';



export default {
    name: "GridComponent",
    components: {
        GridListComponent,
    },
    data(){
        return {
            // costruzione per le chiamate
            urlPath: "https://api.themoviedb.org/3/",
            typePath: "",
            apiKey: "?api_key=e2acc82b5ea3362735d7f317dd66428f",
            queryString: "&query=",
            language: "&language=it-IT",

            // liste film da mostrare in pagina al caricamento
            listaFilmInArrivo: [],
            listaFilmTendenza: [],
            serieTvPopolare: [],        //tv/popular
            serieTvVotati: [],          //top_rated
            

            // l'elemento deve essere leggibile da tutti i componenti
            textInput: "",

            // elementi ritornati in base al titolo inserito nella casella di input
            listaFilmCercati: [],
            listaSerieCercati: [],


            // se clicco su un film devo ritornare quel film per id, e relative sage
            listaFilmSelezionati: [],
            filmSelezionato: null,
            sagaFilm: null,
            sagaFilmName: null,
            listaFilmSimili: [],

        }
    },
    methods: {

        // CERCO UN FILM IN BASE AL TITOLO IMMESSO DALL'UTENTE
            search(elmTitle = ""){
                if(elmTitle === ""){
                    // console.log("vuoto");
                    return;
                }
            console.log(elmTitle, 'search');
            
                this.typePath = "search/movie";
                // this.textInput = elmTitle;
                axios.get(this.urlPath + this.typePath + this.apiKey + this.queryString + elmTitle + this.language)
                .then((res)=>{
                    // console.log(res.data.results, "array results film");
                    // console.log(res.data.total_results, "risultati trovati film");
                    this.listaFilmCercati = res.data.results;
                    let filmCercato = res.data.results[0];
                    console.log(filmCercato);
                    // some scorre l array e restituisce vero se trova la condizione
                    if( !this.listaFilmSelezionati.some( film => film.id === filmCercato.id) ){
                        this.listaFilmSelezionati.push(filmCercato);
                        // console.log(this.listaFilmSelezionati, "listaFilmCercati");
                    }
                    this.searchFilm(filmCercato.id);
                    this.typePath = "search/tv";
                    axios.get(this.urlPath + this.typePath + this.apiKey + this.queryString + elmTitle + this.language)
                    .then((res)=>{
                        // console.log(res.data.results, "array results serie");
                        // console.log(res.data.total_results, "risultati trovati serie");
                        
                        this.listaSerieCercati = res.data.results;
                    });
                }).finally(()=>{
                    this.textInput = "";
                });
            },


        // PRENDO IL FILM DATO L'ID
            searchFilm(id){
                this.typePath = "movie/";
                axios.get(this.urlPath + this.typePath + id + this.apiKey)
                .then((res)=>{
                    console.log(res.data, "filmSelezionato");  
                    this.filmSelezionato = res.data;

                    if(this.filmSelezionato.belongs_to_collection === null){
                        this.sagaFilm = null;
                    }else {

                        // https://api.themoviedb.org/3/collection/{collection_id}
                        this.typePath = "collection/";
                        let collection_id = this.filmSelezionato.belongs_to_collection.id;
                        axios.get(this.urlPath + this.typePath + collection_id + this.apiKey)
                        .then((res)=>{
                            console.log(res, "collection");
                            this.sagaFilmName = res.data.name;
                            this.sagaFilm = res.data.parts;
                            console.log(this.sagaFilm, "sagaFilm");
                        })
                    }
                })
            },


            // CHIAMATA GENERICA 
                chiamataApi(path, nomeArray){
                    axios.get(this.urlPath + path + this.apiKey + this.language)
                    .then((res)=>{
                        // console.log(res.data.total_results, "risultati trovati novità");
                        this[nomeArray] = res.data.results;
                        // console.log(nomeArray, "nome array");
                    });
                }
    },
    mounted(){

        // film
        this.chiamataApi('trending/movie/day', 'listaFilmTendenza');
        this.chiamataApi('movie/upcoming', 'listaFilmInArrivo');
        

        // serieTv
        this.chiamataApi('tv/popular', 'serieTvPopolare');
        this.chiamataApi('tv/top_rated', 'serieTvVotati');

      
    }
}
</script>

<style lang="scss">
@import '../style/generals.scss';

    section {
        padding-left: 40px;
        .grid-container {
            margin-top: 200px;
        }
    }

</style>


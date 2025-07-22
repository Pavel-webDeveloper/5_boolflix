<template>
    <section>
        <input type="text" v-model="textInput">
        <button @click="search(textInput)">Cerca</button>


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


        <!-- FILM POPOLARI -->
        <div class="container-film">
            <h1>Popolari</h1>
            <ul>
                <li v-for="film in listaNovita" :key="film.id" @click="search(film.title), searchFilm(film.id)">
                    <!-- {{ film.original_title }} -->
                        {{ film.title }}
                </li>
            </ul>
        </div>

        
    </section>
</template>

<script>
import axios from 'axios';


export default {
    name: "GridComponent",
    data(){
        return {
            urlPath: "https://api.themoviedb.org/3/",
            typePath: "",
            apiKey: "?api_key=e2acc82b5ea3362735d7f317dd66428f",
            queryString: "&query=",
            textInput: "",
            language: "it-It",

            listaFilm: [],
            listaSerie: [],
            listaNovita: [],
            filmSelezionato: null,
            sagaFilm: null,
            sagaFilmName: null,
        }
    },
    methods: {
        // generaStelle(voto) {
        //     const stellePiene = Math.floor(voto);
        //     const haMezzaStella = voto % 1 >= 0.5;
        //     const stelleVuote = 5 - stellePiene - (haMezzaStella ? 1 : 0);

        //     let risultato = '★'.repeat(stellePiene);       // Stelle piene
        //     if (haMezzaStella) risultato += '☆';           // Mezza stella (o puoi usare 🌓, ◐)
        //     risultato += '☆'.repeat(stelleVuote);          // Stelle vuote

        //     return risultato;

            // <span class="fa fa-star checked"></span>   <!-- Stella piena -->
            // <span class="fa fa-star-half-o checked"></span> <!-- Mezza stella -->
            // <span class="fa fa-star"></span>           <!-- Stella vuota -->

            // <!-- Aggiungi lo stile CSS -->
            // <style>
            // .checked {
            //     color: gold;
            // }
            // </style>

        // }

        search(nome = ""){
            if(nome === ""){
                console.log("vuoto");
                return;
            }
        
            this.typePath = "search/movie";
            this.textInput = nome;
            axios.get(this.urlPath + this.typePath + this.apiKey + this.queryString + this.textInput + "&language=" + this.language)
            .then((res)=>{
                // console.log(res.data.results, "array results film");
                // console.log(res.data.total_results, "risultati trovati film");
                
                this.listaFilm = res.data.results;

                this.typePath = "search/tv";
                axios.get(this.urlPath + this.typePath + this.apiKey + this.queryString + this.textInput + "&language=" + this.language)
                .then((res)=>{
                    // console.log(res.data.results, "array results serie");
                    // console.log(res.data.total_results, "risultati trovati serie");
                    
                    this.listaSerie = res.data.results;
                });
            }).finally(()=>{
                this.textInput = "";
            });
        },

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
    },
    mounted(){

        // DI TENDENZA POPOLARI
        this.typePath = "trending/movie/day";
        axios.get(this.urlPath + this.typePath + this.apiKey)
        .then((res)=>{
            // console.log(res.data.results, "array results novità");
            // console.log(res.data.total_results, "risultati trovati novità");
            
            this.listaNovita = res.data.results;
        });
    }
}
</script>

<style lang="scss">

</style>


<template>
    <section>

    <!-- CONTAINER LISTA FILM -->
        <div class="grid-container">

            <p class="failed" v-if="failed">La tua ricerca "{{ userInput }}"" non ha prodotto risultati</p>
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
import state from '../store.js';
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
            // textInput: "",       in store.js

            // elementi ritornati in base al titolo inserito nella casella di input
            listaFilmCercati: [],
            listaSerieCercati: [],


            // se clicco su un film devo ritornare quel film per id, e relative sage
            listaFilmSelezionati: [],
            filmSelezionato: null,
            sagaFilm: null,
            sagaFilmName: null,
            listaFilmSimili: [],

            // se la ricerca non produce risultati
            failed: false,
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
                    if(res.data.results.length > 0) {
                        this.failed = false;

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
                    }
                    else {
                        this.failed = true;
                    }
                }).finally(()=>{
                    // state.textInput = "";
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth' // Effetto di scorrimento fluido
                    });
                });
            },


        // PRENDO IL FILM DATO L'ID
            searchFilm(id){
                this.typePath = "movie/";
                axios.get(this.urlPath + this.typePath + id + this.apiKey + this.language)
                .then((res)=>{
                    console.log(res.data, "filmSelezionato");  
                    this.filmSelezionato = res.data;

                    if(this.filmSelezionato.belongs_to_collection === null){
                        this.sagaFilm = null;
                    }else {

                        // https://api.themoviedb.org/3/collection/{collection_id}
                        this.typePath = "collection/";
                        let collection_id = this.filmSelezionato.belongs_to_collection.id;
                        axios.get(this.urlPath + this.typePath + collection_id + this.apiKey + this.language)
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
    computed: {
        userInput(){
            console.log(state.textInput, "computed");
            return state.textInput;
        }
    },
    watch: {
        userInput(){
            this.search(state.textInput);
            console.log(this.listaFilmCercati, "listaFilmCercati in watch");  
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

    .failed {
        font-size: 30px;
    }

    section {
        padding-left: 40px;
        .grid-container {
            margin-top: 200px;
        }
    }

</style>


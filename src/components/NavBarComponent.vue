<template>
        
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Serie TV</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Film</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Genere</a>
                    </li>                
                </ul>
            </div>
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Recipient’s username" aria-label="Recipient’s username" aria-describedby="button-addon2" v-model="searchInput" @keyup.enter="cercaInput">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="cercaInput">cerca</button>
        </div>
    </nav>


</template>

<script>
import state from '../store.js';
export default {
    name: "NavBarComponent",
    data(){
        return {
            searchInput: "",
        }
    },
    methods: {
        cercaInput(){
            state.setInput(this.searchInput);
            console.log(state.getInput(), "getInput");
        }
    }
}
</script>

<style lang="scss">

    .navbar-expand-lg {
        width: 70%;
        display: flex;
        align-items: baseline !important;
        
        .input-group {
                min-width: 200px;
                max-width: 500px !important;
            }
        
    }
    .navbar-toggler-icon {
        // filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(105%) contrast(100%);
        display: none !important;
    }

    .navbar-nav {
        --bs-navbar-active-color: white !important;
        --bs-navbar-brand-hover-color: white !important;
        --bs-navbar-color: white !important;
        --bs-nav-link-color: white !important;
        width: 70%;
        display: flex;
        align-items: baseline;

        li {
            font-size: 25px;
            margin-right: 30px;
        }

        .nav-link {
            transition: 0.4s;
            &:hover {
                color: red;
                transform: scale(1.2);
            }
        }
    }

    @media (max-width: 1200px) {
        .navbar-expand-lg {
            flex-direction: column;

            input .form-control {
                min-width: 200px;
                max-width: 500px !important;
            }
        }
    }
   
</style>
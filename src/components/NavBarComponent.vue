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
    </nav>


</template>

<script>
export default {
    name: "NavBarComponent",
}
</script>

<style lang="scss">

    .navbar-toggler-icon {
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(105%) contrast(100%);
    }

    .navbar-nav {
        --bs-navbar-active-color: white !important;
        --bs-navbar-brand-hover-color: white !important;
        --bs-navbar-color: white !important;
        --bs-nav-link-color: white !important;

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
   
</style>
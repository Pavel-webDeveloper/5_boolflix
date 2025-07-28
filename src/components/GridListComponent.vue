<template>
    <div class="grid-list">
        <div class="title-list">
            <!-- <h2 v-if="listaVideo.length === 1"><em>
                Non ci sono elementi correlati
            </em></h2>
            <h2 v-else><em>
                {{ titolo }}
            </em></h2> -->
            <h2><em>
                {{ titolo }}
            </em></h2>
        </div>
        <div class="my-griglia">
                <div class="my-box" v-for="item in listaVideo" :key="item.id" @click="mySearch(item.title), mySearchItem(item.id)">
                <div class="image-container">
                    <img :src="pathImg + item.poster_path" alt="">
                </div>
                <div class="my-description" :style="{ bottom: item.overview.length === 0 ? '-38px' : '-135px' }">
                    <h3 v-if="tipologia == 'serieTv'">{{ item.name }}</h3>
                    <h3 v-else>{{ item.title }}</h3>
                    <p>
                        <span v-if="item.overview.length <= 0">Trama non disponibile</span>
                        <span v-if="item.overview.length > 0"><strong>Trama :</strong></span> <br/>
                        <em>{{ item.overview.slice(0, 250) }}</em>
                        <span v-if="item.overview.length > 250">...</span>
                    </p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "GridListComponent",
    props: ['listaVideo', 'titolo', 'tipologia'],
    data(){
        return {
            pathImg: "https://image.tmdb.org/t/p/w500",
        }
    },
    methods: {
        mySearch(itemTitle){
            this.$emit('cercaTitolo', itemTitle);
        },
        mySearchItem(itemId){
            console.log(itemId, 'itemId figlio');
            
        }
    }
}
</script>

<style lang="scss">
    .grid-list {
            overflow-x: scroll;
            overflow-y: clip;
            margin-bottom: 50px;
            // ::-webkit-scrollbar {
            //     display: none;
            // }
             scrollbar-width: none;       /* Firefox */
            // -ms-overflow-style: none;    /* Edge */

            .title-list {
                height: 39px;
            }
        }
        
        .my-griglia {
            width: max-content;
            display: flex;
            gap: 20px;
            margin-bottom: 50px;
            transition: margin-bottom 2s;
            &:hover {
                margin-bottom: 200px;
            }
        }
        
        .my-box {
            flex-shrink: 0;
            cursor: pointer;
            position: relative;
            transition: margin 1.5s;
            overflow: visible;
            height: 300px;
    
            &:hover {
                .my-description {
                    opacity: 1;
                }
            }
            .image-container {
                height: 100%;
                img {
                    height: 100%;
                    transition: 1s;
                }
            }

            &:hover img {
                transform: scaleX(2.5);
            }
            &:hover {
                margin:0 150px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            }

                .my-description {
                    width: 500px;
                    color: white;
                    position: absolute;
                    bottom: -135px;
                    left: -150px;
                    padding: 0 20px;
                    opacity: 0;
                    transition: opacity 2s;
                }
        }
    
</style>
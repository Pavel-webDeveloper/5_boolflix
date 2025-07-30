<template>
  <div id="app">
    <intro-component v-if="state.loading" />
    <header v-if="state.loading === false">
      <div class="logo">
        <img src="../public/img/logo_boolflix_modificato.png" alt="">
      </div>
      <nav-bar-component />
    </header>

    <main v-if="state.loading === false">
      <grid-component />
    </main>
    
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import state from './store.js';
import IntroComponent from './components/IntroComponent.vue';
import GridComponent from './components/GridComponent.vue';
import NavBarComponent from './components/NavBarComponent.vue';

export default {
  name: 'App',
  components: {
    IntroComponent,
    NavBarComponent,
    GridComponent
  },
  data(){
    return {
      state
    }
  }
}
</script>

<style lang="scss">
@import './style/generals.scss';
  #app {
    background-color: black;
    color: white;
    
  

    header {
      height: 150px;
      padding-top: 15px;
      display: flex;
      align-items: center;
      padding: 0px 20px 0px 30px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      background-color: black;
      width: 100%;

      .logo {
        height: 90%;
        margin-right: 100px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    // li {
    //   --bs-body-color: #fff;
    // }
  }
  @media (max-width: 768px) {
    #app {
      header {
        flex-direction: column;
        align-items: flex-start;

        .logo {
          margin-right: 0;
          height: 80%;

          img {
            object-fit: contain;
          }
        }
      }
    }
  }

</style>

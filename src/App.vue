<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="../public/img/logo_boolflix_modificato.png" alt="">
      </div>
      <nav-bar-component />
    </header>

    <main>
      <grid-component />
    </main>

    <footer>

    </footer>
    
  </div>
</template>

<script>
import GridComponent from './components/GridComponent.vue';
import NavBarComponent from './components/NavBarComponent.vue';

export default {
  name: 'App',
  components: {
    NavBarComponent,
    GridComponent

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

</style>

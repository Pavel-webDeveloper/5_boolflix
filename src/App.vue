<template>
  <div id="app">
    <header>
      <h1>header</h1>
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

</style>

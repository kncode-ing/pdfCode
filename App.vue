<template>
  <div id="app">
    <ShowPdf/>
  </div>
</template>

<script>
import ShowPdf from './components/ShowPdf.vue'

export default {
  name: 'App',
  components: {
    ShowPdf
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

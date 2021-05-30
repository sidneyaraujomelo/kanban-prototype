<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col col sm="3" lg="2" align-self="stretch" class="sidebar-view vh-100">
          <Sidebar/>
        </b-col>
        <b-col align-self="stretch">
          <router-view/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #055bb1;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import Sidebar from '@/components/Sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>
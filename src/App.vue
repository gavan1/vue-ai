<template>
  <div id="app">
            <VGLCanvas></VGLCanvas>
    <div id="nav">
       <!-- <sidenav msg_text="sidenav comp" /> -->

      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>


<style lang="scss">
html, body {
 margin: 0;  
 height: 100%; 
 //overflow: hidden;
  }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
 // padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
button:focus {
  //outline: none;
}
input:focus {
  //outline: none;
}
</style>


<script>
//import Vuetify from './components/Vuetify.vue';
import Sidenav from "@/components/navigation/Sidenav.vue";
import VGLCanvas from "@/components/3d/VGLCanvas.vue";

export default {
  name: 'App',
  components: {
    //Vuetify,
    Sidenav,
    VGLCanvas
  },
  data () {
    return {
      title:"data"
    }
  }
}
</script>

<template>
  <div class="home">
    <!-- <img id="logo" ref="logo" alt="Vue logo" src="../assets/al_logo_r.svg"> -->

  
    <!-- <Vuetify msg="Welcome to Your Vue.js + TypeScript App"/>  -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import Vuetify from '@/components/Vuetify.vue'; // @ is an alias to /src
const VanillaTilt = require("vanilla-tilt/lib/vanilla-tilt.js");


@Component({
  components: {
    //Vuetify,
  },
})
export default class Home extends Vue {

mounted(){

  //this.$refs.logo.style.opacity = .5;
  (<any>this.$refs.logo).style.top = (window.innerHeight - 110) + "px";
   //
    	VanillaTilt.init(this.$refs.logo, {
		max: 70,
    speed: 300,
    perspective: 500
  });
  
  (<any>this.$refs.logo).addEventListener("tiltChange", function (event) {
  console.log(event.detail.percentageX);
   console.log(event.detail.tiltX)
   });

   window.addEventListener('resize', this.onResize)
   


}

onResize(){
(<any>this.$refs.logo).style.top = (window.innerHeight - 110) + "px";
}

}
</script>

<style scoped lang="scss">

body {
  position:relative;
	margin: 0px;
	overflow: hidden;
}

.home{
//float: left;
  height: 100%;
  position:relative;
  z-index: 0;
}
#logo{
  position: absolute;
  width: 150px;
  height: auto;
  right:20px;
}


html {
  height: 100%;
}

</style>

<template>
 <!-- <transition :duration = "{enter: 100,leave: 8000}"  name="expand"> -->

  <transition
  appear
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"

  v-bind:css="false"
  >
  <div id="sidenav" v-show="isOpen">
  <!-- v-bind:class= "{isopen:isOpen}"> -->
  
  <!-- <transition :duration ="{enter: 100,leave: 8000}" name="slide-fade">
    <p v-if="show">hello</p>
  </transition>

  <button @click="animejsshow = !animejsshow" ref="ajs" id="ajs" >
    animejs
  </button>
  
  <transition
  appear
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"

  v-bind:css="false"
  >
    <p v-if="animejsshow">
      ANIMEJS Demo
    </p>
  </transition> -->
            
<!-- 
  <div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20">
  <p>{{ animatedNumber }}</p>
</div>

  <button v-on:click="show = !show">
    Toggle
  </button> -->
      
      <div v-bind:style="styleBackdrop" ref="backdrop" class="backdrop"/>
      <!-- <button id="btn-drawer" @click="toggleOpen"/> -->
      <button id="btn-drawer" @click="isOpen =!isOpen"/>
      <!-- <button id="btn-drawer" v-on:click ="$emit('change', $event.target.expanded)"/> -->

<!-- <transition appear>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>  -->

   </div>

</transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch, Model } from "vue-property-decorator";
//import {TweenLite} from "gsap";
import SVG,{ Polygon } from "svg.js";
//const SVG = require("animejs/lib/anime.js");
const anime = require("animejs/lib/anime.js");
//import VueAnime from 'vue-animejs';
//Vue.use(VueAnime);

@Component
export default class Sidenav extends Vue {

  @Prop(String) msg_text!: string 
  //@Prop({ default: 'false' }) expanded!: boolean 
  @Prop({ default: 'saved' }) docState!: string 
  @Prop({ default: 'default value' }) propB!: string
  @Prop([String, Boolean]) propC!: string | boolean

  show:boolean = true;
  
  isOpen:boolean = true;

  showbounce:boolean = true;
  animejsshow:boolean = false;
  number:number = 0;
  tweenedNumber:number = 0;
  backdrop_svg:any;

  beforeCreate(){
  console.log("beforeCreate");
  }
  beforeMount(){
      console.log("beforeMount");
 

  }
  created (){
      console.log("created");
  }
  mounted() {
      console.log("mounted");
      // var w = 180;
      // var h = 500;
      // var draw = SVG('svg_test').size('100%','100%');
      // this.backdrop_svg = draw.polygon('0,0').fill('#ff0000');
      // this.backdrop_svg.plot([[0,0], [200,0], [180,h], [0,h]]);
      //console.log(this.$el);
     // console.log(this.$refs.backdrop);
      //console.log(TweenLite);

      //draw btn-drawer 
      var draw = SVG('btn-drawer').size('50px','50px');
      var line1 = draw.line(0, 0, 0, 35).move(0,0);
          line1.stroke({ color: '#fff', width: 3, linecap: 'cap' });
       var line2 = draw.line(0, 0, 0, 35).move(9,0);
          line2.stroke({ color: '#fff', width: 3, linecap: 'cap' });
       var line3 = draw.line(0, 0, 0, 35).move(18,0);
          line3.stroke({ color: '#fff', width: 3, linecap: 'cap' });  

        var line_grp = draw.group();
            line_grp.add(line1); 
            line_grp.add(line2); 
            line_grp.add(line3);   
       line_grp.move(14.5,5);
          
      //var line = draw.line.plot([[0, 0], [100, 150]]);
  }

  styleBackdrop = {
   // backgroundColor: 'black',
   position:'relative',
   float:'left',
    width:'300px',
    height:'100vh',
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,1) transparent transparent',
    borderWidth: '100vh 50px 0 0',
    filter:[
      'drop-shadow(0px 0px 4px rgba(0,0,0,.8))'
    ]
  }



 @Model('change', { type: Boolean }) checked!: boolean
 //@Model('change', { type: Boolean }) expanded!: boolean



 @Emit()
  addToCount(n: number) {
    this.number += n
  }
 
  @Emit('reset')
  resetCount() {
    this.number = 0
  }
  
  // toggleOpen(){
  //  //this.isOpen = true;
  // }

  get animatedNumber():any {
      return this.tweenedNumber.toFixed(0);
    }

  get buttonMessage():any {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }



  @Watch('number')
  onNumberChanged(newValue: number, oldVal: number) { 
      console.log(this.$data);
   // TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
  }
 @Watch('expanded')
  onExpandedChanged(val: any, oldVal: any) { 
    console.log("expanded:"+ val ,oldVal);
  }
 
  @Watch('isOpen')
  onChildChanged(val: boolean, oldVal: boolean) { 
    console.log(val);
  }
 

  beforeEnter (el:any) {
   
    //el.style.opacity=1;
    //Velocity(el, { opacity: 0}, { duration: 0 })
  }
  // the done callback is optional when
  // used in combination with CSS
  enter (el:any, done:any) {
       
       console.log("enter");
          anime({
          targets: this.$el,
          easing: 'easeInOutExpo',
          right:220,
          duration: 600
        });
    
  }
  afterEnter(el:HTMLElement) {
    // ...
  }
  enterCancelled(el:HTMLElement) {
    // ...
  }
  beforeLeave(el:HTMLElement) {
    // ...
  }
  // the done callback is optional when
  // used in combination with CSS
  leave (el:any, done:any) {
             console.log("leave");
          anime({
          targets: this.$el,
          easing: 'easeOutExpo',
          right:0,
          duration: 800
        });      
  }

  afterLeave(el:HTMLElement) {
    // ...
  }
  // leaveCancelled only available with v-show
  leaveCancelled(el:HTMLElement) {
    // ...
  }
}
</script>

<style scoped lang="scss">

$width: 5em;
$font-size: 2em;
$font-weight: light;

#btn-drawer{
    position: absolute;
     margin: auto;
     top: 0;
     right: 0;
     bottom: 0;
     left: 200px;
  width: 50px;
  height: 50px;
  background-color: rgba($color: red, $alpha:0);

}

#sidenav {
  position: relative;
  z-index: 1;
  float: left;
  right: 220px;
  //right: 0px;
  font-size: $font-size;
  font-weight: $font-weight;
  color: rgb(253, 253, 253);
 
  .backdrop{
  position: relative;
  z-index: 0;
  float: left;
  
  }
}
//#svg_test{
  //position: relative;
  //z-index: 1;
  // float: left;
  // height: 100%;
  // width:  100%;
//}
.expand-enter{
opacity: 1;
}
.expand-leave{
opacity: 1;
}

.expand-enter-active {
  transition: all .3s ease;
}
.expand-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.expand-enter, .expand-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(400px);
  opacity: 1;
}

 
.isopen{
  right: 0px !important;
   transition: all .6s ease-in-out;
}


.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<template>
  <div id="vgl-canvas">

    <!-- <div ref="ui-layer" id="ui-layer">
           <img ref="circ" id="circ" src="../../assets/circle.svg">  
     </div> -->
    <div ref="scene3d" id="scene3d"/>
    
       <div ref="ios-note" class="ios-note">
        Visit this page on IOS 12 to try AR Quick Look
      </div>  
     
     <div ref="item-info" id="item-info">
      
            <button ref="ar-tag" id="ar-tag"/>

            <p class="h1"> LARGE INFO </p>

            <p class="typography-description"> 
                Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua 
            </p>

            <p class="typography-description-disclaimer"> 
              sed do eiusmod tempor
            </p>

            <div ref="selector-color" id="selector-color"/>

            <p class="typography-price"> ¥22,000 (TAX IN)</p>

      </div>  


      <!-- <vgl-renderer style="width: 100%; height: 100%;">
    <vgl-scene>
      <vgl-sphere-geometry name="sphere" radius=25></vgl-sphere-geometry>
      <vgl-mesh-standard-material name="std"></vgl-mesh-standard-material>
      <vgl-mesh geometry="sphere" material="std" :position="`${x} ${y} ${z}`"></vgl-mesh>
      <vgl-axes-helper size=140></vgl-axes-helper>
      <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
      <vgl-directional-light position="0 1 1"></vgl-directional-light>
    </vgl-scene>
    <vgl-perspective-camera orbit-position="200 1 0.5"></vgl-perspective-camera>
  </vgl-renderer> -->

      <!-- <aside class="control-panel">
    <h3>Position</h3>
    <label>x<input type="range" v-model="x"></label>
    <br>
    <label>y<input type="range" v-model="y"></label>
    <br>
    <label>z<input type="range" v-model="z"></label>
      </aside> -->
    
    <img id="back_drop" ref="back_drop" src="../../assets/DSCF2523_opt.jpg"/> 

 </div>
  
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Emit,
  Watch,
  Model
} from "vue-property-decorator";
//import SVG from
//import { TweenLite } from "gsap";
const anime = require("animejs/lib/anime.js");
import GLTFLoader from "three-gltf-loader";
import { OrbitControls } from 'three-orbitcontrols-ts';
//import {GroundSceneReflector} from 'three-reflector2';
//import { DeviceOrientationController } from 'device-orientation-controls';
import * as THREE from "three";


const THREE = require("three");
const Reflector = require('three-reflector')(THREE);
//const STLLoader = require("../../vendor/Reflector.js");//(THREE);
//const controls = require('three-orbit-controls')(THREE);
//const DeviceOrientationController = require("device-orientation-controls");
const loader = new GLTFLoader();
var _gltf;
var _gltf2;
var _gltf_ref;
var _floor;

//import * as Three from "three";

@Component
export default class VGLCanvas extends Vue {
  x = 50;
  y = 50;
  z = 50;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  //mirrorCamera

  cubeCamera = new THREE.CubeCamera(1, 100, 128);
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true});

  controls = new OrbitControls( this.camera, this.renderer.domElement );
  
  

   //controls  = new THREE.OrbitControls(this.camera, this.renderer.domElement);

  //scene3d = this.$el.('scene3d');

  //private el3d: HTMLElement = document.getElementById('vgl-canvas');
  

  @Model("change", { type: Boolean }) checked!: boolean;

  created() {
    //this.render = this.render.bind(this);
    //console.log(this.scene3d);
    window.addEventListener('keydown', this.onkey);
     window.addEventListener('scroll', this.onScroll);
   // this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
   
   // this.renderer.setClearColor(0xffffff, .5);
    this.renderer.gammaFactor = 2;
    this.renderer.gammaOutput = true;
   // this.onResize();
  //(<any>document.getElementById('back_drop')).width = (window.innerWidth - 295);
  //(<any>this.controls).domElement = document;
    

 //console.log(this.device_controls);

    //    Object.keys(VueGL).forEach(name => {
    //   Vue.component(name, VueGL[name]);
    // });
  }


  mounted() {
   // (<any>document.getElementById('back_drop')).width = (window.innerWidth - 295);
      
      window.addEventListener('resize', this.onResize);
      (<any>this.controls).addEventListener( 'change', this.onChange );
     
    //this.$refs.scene3d.appendChild(this.renderer.domElement);   // cast as any LIKE A BOSS to prevent errors
      (<any>this.$refs.scene3d).appendChild(this.renderer.domElement);
          


    // var geometry = new THREE.BoxGeometry(3, 3, 3);
    // var material = new THREE.MeshBasicMaterial({
    //   wireframe: true,
    //   color: 0x00fff0
    // });
    // var cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);

    		//		LIGHTS
			var	hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, .5);
				hemiLight.color.setHSL( 1, 1, 1);
				hemiLight.groundColor.setHSL( 0, 0, 1 );
				hemiLight.position.set( 0, 50, 0 );
       //this.scene.add( hemiLight );
        
         var ambient = new THREE.AmbientLight( 0xffffff,.7);
         this.scene.add( ambient );

var light1 = new THREE.PointLight( 0xffffff, .5, 10,2 );
light1.position.set( 0, 3, 0 );
var light2 = new THREE.PointLight( 0xffffff, 1, 10,2);
light2.position.set( 0, 0, 3 );
var light3 = new THREE.PointLight( 0xffffff, 1, 10,2 );
light3.position.set( 1, 1, -2 );
var light4 = new THREE.PointLight( 0xffffff, 1, 10,2 );
light4.position.set( 0, -2.5 , -2.5 );

this.scene.add( light1 );
this.scene.add( light2 );
this.scene.add( light3 );
this.scene.add( light4 );


var gridHelper = new THREE.GridHelper( 10, 10 ,0xff0000);
//this.scene.add( gridHelper );

var plane = new THREE.PlaneGeometry( 20, 20, 1);
	var geometry = new THREE.PlaneBufferGeometry( 20, 20 );
      
      var groundMirror = new Reflector( geometry, {
					clipBias: 0.003,
					textureWidth: window.innerWidth * window.devicePixelRatio,
					textureHeight: window.innerHeight * window.devicePixelRatio,
					color: 0x777777,
					recursion: 1
				} );
				groundMirror.position.y = -1.45;
				groundMirror.rotation.x = THREE.Math.degToRad(-90);
				
      console.log(groundMirror.material);
    
        this.scene.add( groundMirror );

//var mirrorMaterial = new THREE.MeshPhongMaterial( { emissive: 0x111111, envMap: mirrorCamera.renderTarget } );
//var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
//_floor = new THREE.Mesh( geometry, material );
//this.scene.add( _floor );
//_floor.rotation.x = THREE.Math.degToRad(90);

 var sphereSize = 1;
//  var pointLightHelper1 = new THREE.PointLightHelper( light1, .5 );
//  this.scene.add( pointLightHelper1 );
//  var pointLightHelper2 = new THREE.PointLightHelper( light2, .75 );
//  this.scene.add( pointLightHelper2 );
//  var pointLightHelper3 = new THREE.PointLightHelper( light3, 1 );
//  this.scene.add( pointLightHelper3 );
//  var pointLightHelper4 = new THREE.PointLightHelper( light4, 1.25 );
//  this.scene.add( pointLightHelper4 );



 

    this.camera.position.z = 5;
    this.camera.position.y = 1;
    this.camera.lookAt(new THREE.Vector3(0, 1, 0));
    this.scene.position.y = 1;

    var that = this;
     // this.threeRender();

	// How far you can orbit vertically, upper and lower limits.
this.controls.minPolarAngle = 0;
this.controls.maxPolarAngle = Math.PI;
this.controls.enabled = true;


// How far you can dolly in and out ( PerspectiveCamera only )
this.controls.minDistance = 0;
this.controls.maxDistance = Infinity;
//controls.autoRotate = true;
//controls.autoRotateSpeed = 2;



this.controls.enablePan = false; // Set to false to disable panning (ie vertical and horizontal translations)
this.controls.enableRotate = true; 
this.controls.enableZoom = false; // Set to false to disable zooming
this.controls.zoomSpeed = 1.0;

this.controls.enableDamping = true; // Set to false to disable damping (ie inertia)
this.controls.dampingFactor = 0.25;
this.controls.autoRotate = false;



   loader.load(
     //onLoaded
      //'assets/gltf/airforce_one.glb',
      //'assets/gltf/shoe.glb',
      'assets/gltf/NA1.glb',
      //'assets/gltf/scene.gltf',
      function(gltf: any) {
       //_gltf_ref = gltf.scene.clone();
        _gltf = gltf.scene;
        that.scene.add(gltf.scene);
        //that.scene.add(_gltf_ref);
        
        that.onResize();
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Scene
        gltf.scenes; // Array<THREE.Scene>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
       // _gltf_ref.scale.set(0.13,0.13,0.13);
        gltf.scene.scale.set(0.13,0.13,0.13);
        
        gltf.scene.position.y= -1.5;
        gltf.scene.position.x= 0;
       // _gltf_ref.position.y= -1.4;
       // _gltf_ref.position.x= 0.3;
       // _gltf_ref.rotation.x = THREE.Math.degToRad(-175);
        //gltf_ref.rotation.z = THREE.Math.degToRad(-180);
      //  _gltf_ref.rotation.y = THREE.Math.degToRad(-185);

  //       anime({
  //         targets: gltf.scene.rotation,
  //         easing: 'easeInOutExpo',
  //         x:[
  //   { value: THREE.Math.degToRad(0), duration: 1200 },
  //   { value: THREE.Math.degToRad(-95), duration: 1200, delay: 2000 },
  //   { value: THREE.Math.degToRad(-26), duration: 1200, delay: 2000 },
  //   { value: THREE.Math.degToRad(0), duration: 1200, delay: 2000 }
  // ],
  //         y:[
  //   { value: THREE.Math.degToRad(-90), duration: 1200 },
  //   { value: THREE.Math.degToRad(-90), duration: 1200, delay: 2000 },
  //   { value: THREE.Math.degToRad(-150), duration: 1200, delay: 2000 },
  //    { value: THREE.Math.degToRad(-170), duration: 1200, delay: 2000 }
  // ],
  //        z:[
  //    { value: THREE.Math.degToRad(0), duration: 1200 },
  //    { value: THREE.Math.degToRad(0), duration: 1200,delay: 2000 },
  //    { value: THREE.Math.degToRad(0), duration: 1200,delay: 2000 },
  //    { value: THREE.Math.degToRad(0), duration: 1200,delay: 2000 }
  //        ],
  //         loop:false,
  //         duration: 3000,
  //         delay:1000,
  //       });

      },
      //onProgress
      function(xhr: any) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function(error: any) {
        console.log(error);
      }
    );


loader.load(
     //onLoaded
      //'assets/gltf/airforce_one.glb',
      //'assets/gltf/shoe.glb',
      'assets/gltf/NA2.glb',

      function(gltf2: any) {
      //_gltf_ref = gltf2.scene.clone();
        _gltf2 = gltf2.scene;
       //that.scene.add(gltf2.scene);
        //that.scene.add(_gltf_ref);
        
        that.onResize();
        gltf2.animations; // Array<THREE.AnimationClip>
        gltf2.scene; // THREE.Scene
        gltf2.scenes; // Array<THREE.Scene>
        gltf2.cameras; // Array<THREE.Camera>
        gltf2.asset; // Object
        //_gltf2_ref.scale.set(0.13,0.13,0.13);
        gltf2.scene.scale.set(0.13,0.13,0.13);
        
        gltf2.scene.position.y= -1.5;
        gltf2.scene.position.x= 0;
        //_gltf_ref.position.y= -1.4;
       // _gltf_ref.position.x= 0.3;
        //_gltf_ref.rotation.x = THREE.Math.degToRad(-175);
        //gltf_ref.rotation.z = THREE.Math.degToRad(-180);
       // _gltf_ref.rotation.y = THREE.Math.degToRad(-185);

  //       anime({
  //         targets: gltf.scene.rotation,
  //         easing: 'easeInOutExpo',
  //         x:[
  //   { value: THREE.Math.degToRad(0), duration: 1200 },
  //   { value: THREE.Math.degToRad(-95), duration: 1200, delay: 2000 },
  //   { value: THREE.Math.degToRad(-26), duration: 1200, delay: 2000 },
  //   { value: THREE.Math.degToRad(0), duration: 1200, delay: 2000 }
  // ],
  //         y:[
  //   { value: THREE.Math.degToRad(-90), duration: 1200 },
  //   { value: THREE.Math.degToRad(-90), duration: 1200, delay: 2000 },
  //   { value: THREE.Math.degToRad(-150), duration: 1200, delay: 2000 },
  //    { value: THREE.Math.degToRad(-170), duration: 1200, delay: 2000 }
  // ],
  //        z:[
  //    { value: THREE.Math.degToRad(0), duration: 1200 },
  //    { value: THREE.Math.degToRad(0), duration: 1200,delay: 2000 },
  //    { value: THREE.Math.degToRad(0), duration: 1200,delay: 2000 },
  //    { value: THREE.Math.degToRad(0), duration: 1200,delay: 2000 }
  //        ],
  //         loop:false,
  //         duration: 3000,
  //         delay:1000,
  //       });

      },
      //onProgress
      function(xhr: any) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function(error: any) {
        console.log(error);
      }
    );



    //console.log(this.$el);
    // console.log(this.$refs.backdrop);
    //console.log(TweenLite);
    this.threeRender();
   }

  threeRender() {
    requestAnimationFrame(this.threeRender);
    this.renderer.render(this.scene, this.camera);
    this.cubeCamera.update(this.renderer, this.scene);
    this.controls.update();
  }

    onkey (event) {
    console.log(event);

      switch (event.key) {
            case '1':
         // (<any>document.getElementById('scene3d')).style.top=((<any>document.getElementById('scene3d')).style.top)+10);
         _gltf.visible = true;
        _gltf2.visible = false;
        break;
             case '2':
        _gltf.visible = false;
        _gltf2.visible = true;
        break;
             case '3':
       //(<any>document.getElementById('scene3d')).style.top
        break;
             case '4':
          //_gltf.rotation.y -= 0.005;
        break;

          case 'q':
          _gltf.rotation.z += 0.005;
          _gltf2.rotation.z += 0.005;
        break;
             case 'w':
          _gltf.rotation.z -= 0.005;
          _gltf2.rotation.z -= 0.005;
        break;
           case 'e':
          _gltf.rotation.y += 0.005;
          _gltf2.rotation.y += 0.005;
        break;
             case 'r':
          _gltf.rotation.y -= 0.005;
          _gltf2.rotation.y -= 0.005;
        break;

        case 'b':
          _gltf.scale.x += 0.005;
          _gltf.scale.y += 0.005;
          _gltf.scale.z += 0.005;

          _gltf2.scale.x += 0.005;
          _gltf2.scale.y += 0.005;
          _gltf2.scale.z += 0.005;
        break;
          case 's':
          _gltf.scale.x -= 0.005;
          _gltf.scale.y -= 0.005;
          _gltf.scale.z -= 0.005;

          _gltf2.scale.x -= 0.005;
          _gltf2.scale.y -= 0.005;
          _gltf2.scale.z -= 0.005;
        break;
            case 'u':
               if(event.ctrlKey== true){
           this.scene.position.y += 0.05;
           }else{
           
          _gltf.position.y += 0.05;
          _gltf2.position.y += 0.05;
           }
        break;

         case 'd':
                if(event.ctrlKey== true){
           this.scene.position.y -= 0.05;
           }else{
          _gltf.position.y -= 0.05;
           _gltf2.position.y -= 0.05;
           }
        break;
         case 'ArrowLeft':
             if(event.ctrlKey== true){
           this.scene.position.x -= 0.05;
           }else{
          _gltf.position.x -= 0.05;
          _gltf2.position.x -= 0.05;
           }
        break;
         case 'ArrowUp':
           if(event.ctrlKey== true){
           this.scene.position.z -= 0.05;
           }else{
           _gltf.position.z -= 0.05;
           }    
           //_gltf2.position.z -= 0.05;
        break;
         case 'ArrowRight':
             if(event.ctrlKey== true){
           this.scene.position.x += 0.05;
           }else{
          _gltf.position.x += 0.05;
          _gltf2.position.x += 0.05;
           }
        break;
         case 'ArrowDown':
             if(event.ctrlKey== true){
           this.scene.position.z += 0.05;
           }else{
          _gltf.position.z += 0.05;
           _gltf2.position.z += 0.05;
           }
        break;
        default:
         console.log(event.key); 
          }
    
    }
    onScroll(e){
   
   console.log(window.scrollY);

    }

  onResize(){
// (<any>this.$refs.circ).style.top = (window.innerHeight - 110) + "px";
//(<any>this.$refs.scene3d).style.right = (-100) + "px";

if(window.innerWidth > 750) {
 
//(<any>document.getElementById('back_drop')).style.width = (window.innerWidth - 295) + 'px';

//(<any>document.getElementById('back_drop')).style.opacity = .5;
//console.log(window.innerWidth - 295);
}

if(window.innerWidth < 750){
 
 // (<any>document.getElementById('back_drop')).opacity = 1;
 //(<any>document.getElementById('back_drop')).style.width = (window.innerWidth - 0) +'px';
 
}

var w = (<any>document.getElementById('back_drop')).width ;
var h = (<any>document.getElementById('back_drop')).height ;
//var h = window.innerHeight;
   console.log( "h=" +h);
      console.log( (<any>document.getElementById('back_drop')).naturalWidth);
 // if (canvas.width !== width ||canvas.height !== height) {
  //  console.log("resize");
    // you must pass false here or three.js sadly fights the browser
   
    this.camera.aspect = w/h;//1.497150997150997;//w / h;
   // console.log("asp = " + w/h)
   this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h,true);
    //this.camera.aspect = 1.497150997150997;//w / h;
    //requestAnimationFrame(this.threeRender);
    this.renderer.render(this.scene, this.camera);
     
  //}


}

  onChange(e){
  //console.log(THREE.Math.radToDeg(_gltf.rotation.x) +" , "+ THREE.Math.radToDeg(_gltf.rotation.y) +" , "+ THREE.Math.radToDeg(_gltf.rotation.z) );
   // console.log(THREE.Math.radToDeg(e.rotation.x) +" , "+ THREE.Math.radToDeg(e.rotation.y) +" , "+ THREE.Math.radToDeg(e.rotation.z) );
   //console.log(THREE.Math.radToDeg(e.target.object.rotation.x)+" , "+THREE.Math.radToDeg(e.target.object.rotation.y)+" , "+THREE.Math.radToDeg(e.target.object.rotation.z));
  
}

  
}
</script>

<style scoped lang="scss">

canvas { width: 100vw; height: 100vh; display: block; }
:root{
  --nav-padding:295px;
  --item-box-w:200px;
}

#vgl-canvas {
  position: absolute;
  height: 100vh;
  width: 100%;
  float: left;
  top:400;

  z-index: 0;
  //background-color: red;
 
}

.ios-note{
  
  position: relative;
  top: 30px;
  //margin-top: 600px;
  //background-color: green;
  width: auto;
  height: auto;
  padding: 4px 8px;
  font-size: 13px;
  line-height: 1.47059;
  font-weight: 400;
  letter-spacing: -0.022em;
  font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  color: #ef5602;
  background: transparent;
  border: 1px solid #ef5602;
  border-radius: 4px;
  display: inline-block;
  //left: -300px;
  white-space: nowrap; 

}

#item-info{
position: absolute;
width: 500px;
height: auto;
//background-color: #ef5602;
//display: block;
//padding-top: 150px;
bottom: 40px;
float: right;
right: 200px;


#ar-tag{
  outline: none;
  right: -150px;
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  background-color: #ef5602;
  background-image: url(../../assets/ar-badge.png),;
  background-size: 50px 50px;
  background-position:left top;
  background-repeat: no-repeat;
}

.h1{
  font-size: 24px;
    font-family:  "Hiragino Kaku Gothic Pro","ヒラギノ角ゴ Pro W3","メイリオ",Meiryo,"ＭＳ Ｐゴシック",Arial,Verdana,sans-serif;
    font-weight: 400;
    font-style: strong;
    padding-bottom: 8px;
    text-align: right;
     width: 200px;
}
.typography-description{
  font-size: 10px;
  font-family:  Arial,Verdana,sans-serif;
  width: 200px;
  text-align: right;
  padding-bottom: 20px;
    //font-weight: 400;


}
.typography-description-disclaimer{  
   opacity: .5;
   padding-bottom: 15px;
   text-align: right;
   width: 200px;
}

.typography-price{
    font-family:  Arial,Verdana,sans-serif;
 width: 200px;
font-size: 15px;
text-align: right;
}



}


#scene3d{
  position: relative;
  z-index: 5 !important;
  opacity: 1;
  //width: 1696px;
  //height: 100vh;
  top: 0px;
  left: 0px;
  //float: left;
  //visibility: hidden;
  //bottom: -290px;
 //background-color: green;
}


#ui-layer{
  margin: 0;
  width: 500px;
  height: 100vh;
  position: absolute;
  z-index: 6;
  //background-color: rgba($color:red, $alpha: .5);
  
  #circ{
  float: right;
  position: relative;
  right: 30px;
  bottom: -290px;
  }

}

#back_drop{
   
  position: absolute;
  z-index: 0;
  left: 0px;
  top: 0;
  //max-height: 800px;
  //width: 100%;
  //width:100vw - --nav-padding;
  //opacity: .5;
  
}
/* MOBILE  If screen 750px or less, apply.. */
@media screen and (max-width: 750px) {
 #back_drop{
width:100vw;
 //visibility: hidden;

}
.ios-note{
  left: calc(50% - 135px);
}

}

/* If screen 850px or less, apply.. */
@media screen and (max-height: 850px) {
 #item-info{
top: 600px;
 //visibility: hidden;

}

}

/* DESKTOP If screen 751px or more, apply.. */
@media screen and (min-width: 751px) {
 #back_drop{
width:calc(100vw - 295px);
 //visibility: hidden;

}

}



</style>

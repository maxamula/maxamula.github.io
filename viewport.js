import * as THREE from './three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader';
import * as GSAP from './gsap/all.js';

var projIndex = 0;
var model;
const scene = new THREE.Scene();
//const camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 0.0001, 10000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'), antialias: true, alpha: true});
renderer.setClearColor( 0x33444E, 1);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const ambient = new THREE.AmbientLight(0x8aa4bf);
ambient.intensity = 0.4;
scene.add(ambient);
//const pointLight = new THREE.PointLight(0xffffff, 0.6, 100);
//pointLight.position.set(1, 1.4, 0);
//scene.add(pointLight);
//const pointLightHelper = new THREE.PointLightHelper( pointLight, 0.3 );
//scene.add( pointLightHelper );

const dirlight = new THREE.DirectionalLight(0x4dc463, 2);
dirlight.position.set(-1, 0, 0);
dirlight.intensity = 0.3;
scene.add(dirlight);

const dirlight2 = new THREE.DirectionalLight(0xc44d75, 2);
dirlight2.position.set(1, 0, 0);
dirlight2.intensity = 0.1
scene.add(dirlight2);

const dirlight4 = new THREE.DirectionalLight(0xffffff, 2);
dirlight4.position.set(1, 0, 0);
dirlight4.intensity = 0.5;
scene.add(dirlight4);

const dirlight3 = new THREE.DirectionalLight(0xffffff, 2);
dirlight3.position.set(0, 1, 0);
dirlight3.intensity = 0.3;
scene.add(dirlight3);

var loader = new GLTFLoader();
loader.load('models/scene.glb', (object) =>{
  for(var i = 0; i < object.scene.children.length; i++)
  {
    var submesh = object.scene.children[i];
    console.log(submesh.name);
    var material;
    if(submesh.name == "Screen" && projIndex != 0)
    {
      material = new THREE.MeshBasicMaterial({color: 0xffffff});
    }
    else{
      material = new THREE.MeshStandardMaterial({color: 0xffffff});
    }
    var texture = new THREE.TextureLoader().load("models/"+ submesh.name +".png");
    texture.flipY = false;
    material.map  = texture;
    submesh.material = material;
  }
  model = object.scene;
  scene.add(object.scene);
});

camera.position.z = 0.3;
camera.position.y = 1.4;
camera.position.x = -0.1;
camera.rotation.x = -1.3;

//const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();


var button = document.getElementById("go");
var hero = document.getElementById("hero_header");
var c1 = document.getElementById("c1");
var labs = document.getElementById("labs");
button.addEventListener('click', onExploreBtnClick, false );
function onExploreBtnClick()
{
  // Camera anim
  GSAP.gsap.to(camera.position, {z:1.8, duration: 2, ease: GSAP.Power2.easeInOut });
  GSAP.gsap.to(camera.rotation, {y:0.3, duration: 2, ease: GSAP.Power2.easeInOut });
  GSAP.gsap.to(camera.rotation, {x:0, duration: 2, ease: GSAP.Power2.easeInOut });
  GSAP.gsap.to(camera.position, {x:0.3, duration: 2, ease: GSAP.Power2.easeInOut });
  // Text anim
  GSAP.gsap.to(c1, {opacity:0, duration: 0.5, ease: GSAP.Power2, onComplete: function(){
    c1.hidden = true;
    labs.hidden = false;
    GSAP.gsap.to(labs, {opacity:1, duration: 1, ease: GSAP.Power2});
  } } );
  // remove old/add new components
  //document.removeChild(hero.nodeValue);
  //GSAP.gsap.to(camera.position, {x:12.3, duration: 2, ease: GSAP.Power2.easeInOut }, 8);
  
}


window.addEventListener('resize', onWindowResize, false );
function onWindowResize()
{
  projIndex = 1;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
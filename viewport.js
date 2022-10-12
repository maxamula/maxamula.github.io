import * as THREE from './three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader';

let width = window.innerWidth;
let height = window.innerHeight;
let room;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, 0.0001, 10000);
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'), antialias: true, alpha: true});
renderer.setClearColor( 0xffffff, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF, wireframe: false});

const light = new THREE.AmbientLight(0xffffff);
light.position.set(9, 5, 85);
scene.add(light);

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'models/room.fbx',
    (object) => {

        object.traverse(function (child) {
            if (child.isMesh) {
              console.log(child.geometry.attributes.uv)
              const texture = new THREE.TextureLoader().load(
                'models/tex.png'
              )
              material.map = texture;
              child.material.map = texture;
              child.material = material;
              child.material.needsUpdate = true;
              room = object;
            }
          })

        object.scale.set(1, 1, 1);
        object.rotation.set(0.6,-0.7, 0);
        scene.add(object)
        console.log(object)
    }
)

camera.position.z = 600;
camera.position.x = 0;
camera.position.y = 0;
camera.zoom = 3;
camera.updateProjectionMatrix();


renderer.render(scene, camera);


const controls = new OrbitControls( camera, renderer.domElement );

let i = 1;

function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
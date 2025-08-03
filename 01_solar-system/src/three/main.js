import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";

//Initialize the pane
const pane = new Pane();

//Initialize the scene
const scene = new THREE.Scene();

//Initialize texture loader
const textureLoader = new THREE.TextureLoader();

//Initialize the geometry
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

//Initialize the sun material
const sunMaterial = new THREE.MeshBasicMaterial();
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
// const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
// console.log(sunTexture);
sunMaterial.color.set("red");
// sunMaterial.map = sunTexture;
// sunMaterial.displacementScale = 0.5;
scene.add(sun);

//Initialize the camera
const camera = new THREE.PerspectiveCamera(
	35,
	window.innerWidth / window.innerHeight,
	0.1,
	100
);
camera.position.x = 100;
camera.position.y = 5;

//Initialize the renderer
const canvas = document.querySelector(".canvas");

const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: false,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

//Resize listener
window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

//render loop
const renderLoop = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(renderLoop);
};

renderLoop();

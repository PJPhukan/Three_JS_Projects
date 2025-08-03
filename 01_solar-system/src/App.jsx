import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";
import "./index.css";

const App = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const pane = new Pane();
		const scene = new THREE.Scene();
		const textureLoader = new THREE.TextureLoader();

		const geometry = new THREE.SphereGeometry(1, 32, 32);
		//Sun->Mercury->Venus->Earth(Moon)->Mars->Jupiter->Saturn->Uranus->Neptune
		//SUN
		const sunMaterial = new THREE.MeshBasicMaterial();
		const sun = new THREE.Mesh(geometry, sunMaterial);
		const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
		sunMaterial.map = sunTexture;
		sun.scale.setScalar(5);
		sunMaterial.side = THREE.DoubleSide;
		scene.add(sun);

		//Mercury
		const mercuryMaterial = new THREE.MeshBasicMaterial();
		const mercury = new THREE.Mesh(geometry, mercuryMaterial);
		const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
		mercuryMaterial.map = mercuryTexture;
		mercury.scale.setScalar(0.2);
		mercury.position.x = 2;
		mercuryMaterial.side = THREE.DoubleSide;
		sun.add(mercury);

		//Venus(//TODO:)

		//Earth
		const earthMaterial = new THREE.MeshBasicMaterial({
			// color:"blue"
		});
		const earth = new THREE.Mesh(geometry, earthMaterial);
		const earthTexture = textureLoader.load(
			"/textures/2k_earth_daymap.jpg"
		);
		earthMaterial.map = earthTexture;
		earth.scale.setScalar(0.5);
		earth.position.x = 4;
		earthMaterial.side = THREE.DoubleSide;
		sun.add(earth);

		//Moon
		const moonMaterial = new THREE.MeshBasicMaterial();
		const moon = new THREE.Mesh(geometry, moonMaterial);
		const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
		moonMaterial.map = moonTexture;
		moon.scale.setScalar(0.3);
		moon.position.x = 2;
		moonMaterial.side = THREE.DoubleSide;
		earth.add(moon);

		const camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			0.0001,
			100
		);
		camera.position.set(100, 5, 0);

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasRef.current,
			antialias: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.maxDistance = 200;
		controls.minDistance = 20;

		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener("resize", handleResize);

		const renderLoop = () => {
			//Add animation
			earth.rotation.y += 0.01;
			sun.rotation.y += 0.01;
			// earth.rotation.z += 0.01;

			controls.update();
			renderer.render(scene, camera);
			requestAnimationFrame(renderLoop);
		};
		renderLoop();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div>
			<canvas className="canvas" ref={canvasRef}></canvas>
		</div>
	);
};

export default App;

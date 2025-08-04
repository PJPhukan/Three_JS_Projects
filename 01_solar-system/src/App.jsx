import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";
import "./index.css";

const App = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		// const pane = new Pane();
		const scene = new THREE.Scene();
		const textureLoader = new THREE.TextureLoader();
		//load texture
		const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
		const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
		const venusTexture = textureLoader.load(
			"/textures/2k_venus_surface.jpg"
		);
		const earthTexture = textureLoader.load(
			"/textures/2k_earth_daymap.jpg"
		);
		const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
		const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
		// const phobosTexture = textureLoader.load("/textures/2k_phobos.jpg");
		// const deimosTexture = textureLoader.load("/textures/2k_deimos.jpg");
		const jupiterTexture = textureLoader.load("/textures/2k_jupiter.jpg");
		// const ioTexture = textureLoader.load("/textures/2k_io.jpg");
		// const europaTexture = textureLoader.load("/textures/2k_europa.jpg");
		const saturnTexture = textureLoader.load("/textures/2k_saturn.jpg");
		// const titanTexture = textureLoader.load("/textures/2k_titan.jpg");
		const uranusTexture = textureLoader.load("/textures/2k_uranus.jpg");
		const neptuneTexture = textureLoader.load("/textures/2k_neptune.jpg");
		
		const cubeTextureLoader = new THREE.CubeTextureLoader();
		cubeTextureLoader.setPath("/textures/cubeMap/");
		const backgroundCubeMap = cubeTextureLoader.load([
			"nx.png",
			"ny.png",
			"nz.png",
			"px.png",
			"py.png",
			"pz.png",
		]);

		scene.background = backgroundCubeMap;
		scene.backgroundIntensity = 0.1;

		const geometry = new THREE.SphereGeometry(1, 32, 32);

		const sunMaterial = new THREE.MeshBasicMaterial();
		const sun = new THREE.Mesh(geometry, sunMaterial);
		sunMaterial.map = sunTexture;
		sun.scale.setScalar(9);
		scene.add(sun);

		//Add materials
		const mercuryMaterial = new THREE.MeshStandardMaterial({
			map: mercuryTexture,
		});
		const venusMaterial = new THREE.MeshStandardMaterial({
			map: venusTexture,
		});
		const earthMaterial = new THREE.MeshStandardMaterial({
			map: earthTexture,
		});
		const moonMaterial = new THREE.MeshStandardMaterial({
			map: moonTexture,
		});
		const marsMaterial = new THREE.MeshStandardMaterial({
			map: marsTexture,
		});
		const phobosMaterial = new THREE.MeshStandardMaterial({
			map: moonTexture, //Need to change
		});
		const deimosMaterial = new THREE.MeshStandardMaterial({
			map: moonTexture, //Need to change
		});
		const jupiterMaterial = new THREE.MeshStandardMaterial({
			map: jupiterTexture,
		});
		const ioMaterial = new THREE.MeshStandardMaterial({
			map: moonTexture, //Need to change
		});
		const europaMaterial = new THREE.MeshStandardMaterial({
			map: moonTexture, //Need to change
		});
		const saturnMaterial = new THREE.MeshStandardMaterial({
			map: saturnTexture,
		});
		const titanMaterial = new THREE.MeshStandardMaterial({
			map: moonTexture, //Need to change
		});
		const uranusMaterial = new THREE.MeshStandardMaterial({
			map: uranusTexture,
		});
		const neptuneMaterial = new THREE.MeshStandardMaterial({
			map: neptuneTexture,
		});

		const planets = [
			{
				id: 1,
				name: "Mercury",
				radius: 1,
				distance: 12,
				speed: 0.015,
				material: mercuryMaterial,
				moons: [{}],
			},
			{
				id: 2,
				name: "Venus",
				radius: 3,
				distance: 20,
				speed: 0.012,
				material: venusMaterial,
				moons: [{}],
			},
			{
				id: 3,
				name: "Earth",
				radius: 2,
				distance: 30,
				speed: 0.01,
				material: earthMaterial,
				moons: [
					{
						id: 1,
						name: "Moon",
						radius: 0.3,
						distance: 1.5,
						speed: 0.03,
						material: moonMaterial,
					},
				],
			},
			{
				id: 4,
				name: "Mars",
				radius: 1.7,
				distance: 40,
				speed: 0.008,
				material: marsMaterial,
				moons: [
					{
						id: 1,
						name: "Phobos",
						radius: 0.3,
						distance: 1.5,
						speed: 0.04,
						material: phobosMaterial,
					},
					{
						id: 2,
						name: "Deimos",
						radius: 0.2,
						distance: 2.5,
						speed: 0.025,
						material: deimosMaterial,
					},
				],
			},
			{
				id: 5,
				name: "Jupiter",
				radius: 4,
				distance: 55,
				speed: 0.005,
				material: jupiterMaterial,
				moons: [
					{
						id: 1,
						name: "Io",
						radius: 0.3,
						distance: 1.3,
						speed: 0.05,
						material: ioMaterial,
					},
					{
						id: 2,
						name: "Europa",
						radius: 0.25,
						distance: 2,
						speed: 0.035,
						material: europaMaterial,
					},
				],
			},
			{
				id: 6,
				name: "Saturn",
				radius: 3,
				distance: 70,
				speed: 0.003,
				material: saturnMaterial,
				moons: [
					{
						id: 1,
						name: "Titan",
						radius: 0.4,
						distance: 1.5,
						speed: 0.02,
						material: titanMaterial,
					},
				],
			},
			{
				id: 7,
				name: "Uranus",
				radius: 2.3,
				distance: 85,
				speed: 0.002,
				material: uranusMaterial,
				moons: [],
			},
			{
				id: 8,
				name: "Neptune",
				radius: 2.7,
				distance: 100,
				speed: 0.001,
				material: neptuneMaterial,
				moons: [],
			},
		];

		const planetsMeshes = planets.map((planet) => {
			//create mesh
			const planetMesh = new THREE.Mesh(geometry, planet.material);

			//add scale
			planetMesh.scale.setScalar(planet.radius);

			//set position
			planetMesh.position.x = planet.distance;

			//add it in the scene
			scene.add(planetMesh);

			const moonsMeshes =
				planet.moons.length > 0 &&
				planet.moons.map((moon) => {
					const moonMesh = new THREE.Mesh(geometry, moon.material);
					moonMesh.scale.setScalar(moon.radius);
					moonMesh.position.x = moon.distance;
					planetMesh.add(moonMesh);
					return moonMesh;
				});

			return planetMesh;
		});

		// console.log(planetsMeshes);
		//add light
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
		scene.add(ambientLight);

		//add point light
		const pointLight = new THREE.PointLight(0xfdb813, 2000);
		scene.add(pointLight);

		

		const camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			0.1,
			400
		);
		camera.position.y = 35.0;
		camera.position.z = 100;

		

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

		//Initialize a clock
		const clock = new THREE.Clock();

		const renderLoop = () => {
			planetsMeshes.map((planet, index) => {
				planet.rotation.y += planets[index].speed;
				planet.position.x =
					Math.sin(planet.rotation.y) * planets[index].distance;
				planet.position.z =
					Math.cos(planet.rotation.y) * planets[index].distance;

				planet.children?.length > 0 &&
					planet.children.map((moon, indexMoon) => {
						moon.rotation.y +=
							planets[index].moons[indexMoon].speed;
						moon.position.x =
							Math.sin(moon.rotation.y) *
							planets[index].moons[indexMoon].distance;
						moon.position.z =
							Math.cos(moon.rotation.y) *
							planets[index].moons[indexMoon].distance;
					});
			});

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

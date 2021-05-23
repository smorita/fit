import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as FIT from "./fit";

// import "bootstrap"
// import "bootstrap/dist/css/bootstrap.min.css"
import "bootswatch/dist/slate/bootstrap.min.css";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const canvas = document.querySelector("#myCanvas");
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setClearAlpha(0.0);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
  camera.position.set(3.0, 1.0, 0.0);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.maxDistance = 10;
  controls.minDistance = 0.1;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x999999, 0.75));

  const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
  pointLight.position.copy(camera.position);
  scene.add(pointLight);

  scene.add(FIT.fit);

  tick();

  function tick() {
    requestAnimationFrame(tick);
    pointLight.position.copy(camera.position);
    controls.update();

    FIT.fit.change_color();

    renderer.render(scene, camera);
  }
}

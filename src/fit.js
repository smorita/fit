import * as THREE from "three";
export { fit };

const v0 = new THREE.Vector3(1.0, 1.0, 1.0);
const v1 = new THREE.Vector3(1.0, -1.0, -1.0);
const v2 = new THREE.Vector3(-1.0, 1.0, -1.0);
const v3 = new THREE.Vector3(-1.0, -1.0, 1.0);

const points = new Array().concat(
  triangular_face(v0, v1, v2),
  triangular_face(v0, v2, v3),
  triangular_face(v0, v3, v1),
  triangular_face(v3, v2, v1)
);

const geometry = new THREE.BufferGeometry().setFromPoints(points);
geometry.computeVertexNormals();

let material, mesh;
const fit = new THREE.Group();
const n = 5;
const phi = (Math.sqrt(5) + 1) / 2.0;
const axis = new THREE.Vector3(0, phi + 2, 3 * phi + 1).normalize();
const angle = (2.0 * Math.PI) / n;

for (let i = 0; i < n; ++i) {
  material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  material.side = THREE.DoubleSide;
  material.roughness = 1.0;
  material.metalness = 0.0;

  mesh = new THREE.Mesh(geometry, material);
  mesh.rotateOnAxis(axis, i * angle);

  fit.add(mesh);
}

fit.theta = 0.0;
fit.change_color = function () {
  const lightness = (Math.cos(this.theta) + 9.0) / 10.0;
  for (let i = 0; i < n; ++i) {
    this.children[i].material.color.setHSL((i + 0.5) / n, 1.0, lightness);
  }
  this.theta += 0.005;
};

function triangular_face(v0, v1, v2) {
  const q = (3 - Math.sqrt(5)) / 8;
  const p = 1 - 2 * q;
  const v3 = new THREE.Vector3()
    .add(v0.clone().multiplyScalar(p))
    .add(v1.clone().multiplyScalar(q))
    .add(v2.clone().multiplyScalar(q));
  const v4 = new THREE.Vector3()
    .add(v0.clone().multiplyScalar(q))
    .add(v1.clone().multiplyScalar(p))
    .add(v2.clone().multiplyScalar(q));
  const v5 = new THREE.Vector3()
    .add(v0.clone().multiplyScalar(q))
    .add(v1.clone().multiplyScalar(q))
    .add(v2.clone().multiplyScalar(p));

  // prettier-ignore
  return [
    v0, v1, v3,
    v1, v4, v3,
    v1, v2, v4,
    v2, v5, v4,
    v2, v0, v5,
    v0, v3, v5,
  ];
}

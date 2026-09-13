import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,100);
camera.position.set(0,2,5);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);

const cubeMat = new THREE.MeshStandardMaterial({color:0x42a5f5});
const cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), cubeMat);
scene.add(cube);
scene.add(new THREE.AmbientLight(0xffffff,0.5));
scene.add(new THREE.DirectionalLight(0xffffff,0.8));


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
window.addEventListener('pointerdown',(event)=>{
pointer.x = (event.clientX / window.innerWidth)*2 -1;
pointer.y = -(event.clientY / window.innerHeight)*2 +1;
raycaster.setFromCamera(pointer,camera);
const intersects = raycaster.intersectObjects(scene.children);
if(intersects.length>0){
const obj = intersects[0].object;
obj.material.color.setHex(Math.random()*0xffffff);
}
})

function animate(){
requestAnimationFrame(animate);
controls.update();
renderer.render(scene,camera);
}
animate();
window.addEventListener('resize',()=>{
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
})

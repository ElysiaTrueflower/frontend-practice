import * as THREE from 'three';


const USE_ANTIALIAS = false;
const COUNT =5000; 

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,200);
camera.position.z = 40;
const renderer = new THREE.WebGLRenderer({antialias:USE_ANTIALIAS});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


const fpsDiv = document.createElement('div');
fpsDiv.style.position = 'fixed';fpsDiv.style.top='10px';fpsDiv.style.left='10px';
fpsDiv.style.color='#fff';fpsDiv.style.zIndex='9999';document.body.appendChild(fpsDiv);
let lastTime = performance.now();
let frameCount = 0;


const mat = new THREE.MeshStandardMaterial({color:0x66ccff});
for(let i=0;i<COUNT;i++){
const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.8,0.8,0.8),mat);
mesh.position.set(
(Math.random()-0.5)*40,
(Math.random()-0.5)*40,
(Math.random()-0.5)*40
);
scene.add(mesh);
}
scene.add(new THREE.AmbientLight(0xffffff,0.4));

function animate(time){
requestAnimationFrame(animate);
frameCount++;
if(time-lastTime >=1000){
fpsDiv.innerText = `FPS:${frameCount} | antialias:${USE_ANTIALIAS} | 物体数:${COUNT}`;
frameCount=0;lastTime=time;
}
renderer.render(scene,camera);
}
animate(performance.now());
window.addEventListener('resize',()=>{
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
})

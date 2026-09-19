import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MMDLoader } from 'three/addons/loaders/MMDLoader.js';
import { MMDAnimationHelper } from 'three/addons/animation/MMDAnimationHelper.js';

const threeWrap=document.querySelector('#threeContainer');
const bgAudio=document.querySelector('#bgAudio');
const musicBtn=document.querySelector('#musicBtn');
let musicplaying =false;

musicBtn.addEventListener('click', () => {
        if (!musicplaying) {
            bgAudio.play();
            musicBtn.textContent = '暂停';
            musicplaying = true;
        }
        else {
            bgAudio.pause();
            musicBtn.textContent ='播放';
            musicplaying = false;
        }
})

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x16213e);
scene.fog = new THREE.Fog(0x16213e, 8, 20);

const camera = new THREE.PerspectiveCamera(45, threeWrap.clientWidth / threeWrap.clientHeight, 0.1, 100);
camera.position.set(4, 3, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(threeWrap.clientWidth, threeWrap.clientHeight);
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
threeWrap.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const dir = new THREE.DirectionalLight(0xffffff, 0.8);
dir.position.set(3, 6, 4);
dir.castShadow = true;
scene.add(dir);


const stage = new THREE.Mesh(
    new THREE.CylinderGeometry(2.2, 2.4, 0.3, 48),
    new THREE.MeshStandardMaterial({ color: 0x37474f })
);

stage.position.y = -0.15;
stage.receiveShadow = true;
scene.add(stage);

const items = new THREE.Group();
    const geos = [
        new THREE.BoxGeometry(0.8, 0.8, 0.8),
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.TorusGeometry(0.4, 0.16, 16, 48)
];

const colors = [0x4fc3f7, 0xffb74d, 0xef5350];
    geos.forEach((geo, i) => {
    const angle = (i / geos.length) * Math.PI * 2;
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: colors[i] }));
    mesh.position.set(Math.cos(angle) * 1.4, 0.6, Math.sin(angle) * 1.4);
    mesh.castShadow = true;
    items.add(mesh);
});

scene.add(items);



const mmdLoader = new MMDLoader();
const modelWrap = new THREE.Group();
scene.add(modelWrap);
mmdLoader.load(
    './model/fuxuan.pmx',
    (model) => {
        modelWrap.add(model);
        modelWrap.scale.set(0.2,0.2,0.2);
        modelWrap.position.y = 0.2;

        model.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.frustumCulled = false;
            }
        });
        scene.add(modelWrap);
    },
    (progress) => {
        const percent = (progress.loaded / progress.total *100).toFixed(1);
        console.log(`PMX加载进度: ${percent}%`);
    },
    (err) => {
        console.error("PMX加载失败：", err);
    }
);
const clock = new THREE.Clock();

const animate = () => {
    requestAnimationFrame(animate);

    items.rotation.y += 0.015;
    modelWrap.rotation.y -= 0.015;

    controls.update();
    renderer.render(scene, camera);
};
animate();


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});



const pageSpinBtn = document.querySelector('#pageSpinBtn');
const pageWrap    = document.querySelector('#pageWrap');

pageSpinBtn.addEventListener('click', () => {
    const nowSpinning = !pageWrap.classList.contains('spinning');

    pageWrap.classList.toggle('spinning', nowSpinning);
    pageSpinBtn.textContent = nowSpinning ? '停止旋转' : '整页旋转';

    if (nowSpinning && !musicplaying) {
        bgAudio.play();
        musicBtn.textContent = '暂停';
        musicplaying = true;
    } else if (!nowSpinning && musicplaying) {
        bgAudio.pause();
        musicBtn.textContent = '播放';
        musicplaying = false;
    }
});
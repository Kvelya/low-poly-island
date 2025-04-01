import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const gltfLoader = new GLTFLoader();
function getRandomString(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xB2DDF7);
scene.receiveShadow = true;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
let isNight = false;

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Light
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(0, 40, 0);
light.target.position.set(0, 0, 0);
light.castShadow = true;

// Shadow map
light.shadow.mapSize.width = 25;
light.shadow.mapSize.height = 25;
light.shadow.camera.left = -15;
light.shadow.camera.right = 15;
light.shadow.camera.top = 15;
light.shadow.camera.bottom = -15;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 50;

scene.add(light);
scene.add(light.target);
/*
 * This function toggles the day-night cycle in the 3D scene.
 * It changes the background color, light intensity, and visibility of street lights.
 */
function toggleDayNight() {
    isNight = !isNight;

    if (isNight) {
        scene.background = new THREE.Color(0x161636);
        light.intensity = 0.2;
        ambientLight.intensity = 2;
        streetLights.forEach(light => light.visible = true);

    } else {
        scene.background = new THREE.Color(0xB2DDF7);
        light.intensity = 3;
        ambientLight.intensity = 30;
        streetLights.forEach(light => light.visible = false);

    }
}


// Ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 30);
scene.add(ambientLight);

// Island
const islandGeometry = new THREE.CylinderGeometry(10, 9.5, 1, 12);
const islandMaterial = new THREE.MeshStandardMaterial({ color: 0x8AAC3C, flatShading: true });
const island = new THREE.Mesh(islandGeometry, islandMaterial);
island.position.y = -0.5;
island.receiveShadow = true;
scene.add(island);
const islandBottomGeometry = new THREE.CylinderGeometry(9.5, 0, 7, 12);
const islandBottomMaterial = new THREE.MeshStandardMaterial({ color: 0xa7a7a7, flatShading: true });
const islandBottom = new THREE.Mesh(islandBottomGeometry, islandBottomMaterial);
islandBottom.position.y = -4.5;
islandBottom.receiveShadow = true;
scene.add(islandBottom);

// Houses
const colors = [0xaaf683, 0xffe66d, 0xff8fab, 0x84d2f6, 0xF2B7C6, 0xcbf57a, 0xf59ac5, 0xffd6a5, 0xcfbaf0, 0xB9F5D8, 0xFCFCFC, 0xFFCAD4];
function createHouse(x, z) {
    const houseGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const houseMaterial = new THREE.MeshStandardMaterial({ color: getRandomString(colors) });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(x, 0.5, z);
    house.receiveShadow = true;
    scene.add(house);

    const roofGeometry = new THREE.ConeGeometry(1.5, 0.8, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x742103 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(x, 1.6, z);
    roof.rotateY(Math.PI / 4);
    roof.receiveShadow = true;
    scene.add(roof);
}

createHouse(-7, -2);
createHouse(-2, -3.5);
createHouse(-5.5, 2);
createHouse(2, -1);
createHouse(2, -7);
createHouse(-1.5, 5);

function doors(x, y, z, rotation) {
    gltfLoader.load('models/house/door.glb', (glb) => {
        const model = glb.scene;
        model.position.set(x, y, z);
        model.scale.set(0.22, 0.22, 0.22);
        model.rotation.y = Math.PI / rotation;
        scene.add(model);
    });
}
doors(-7, 0.48, -1.25, 2);
doors(-1.25, 0.48, -3.5, 1);
doors(-5.5, 0.48, 1.25, 2);
doors(1.25, 0.48, -1, 1);
doors(1.25, 0.48, -7, 1);
doors(-2.25, 0.48, 5, 1);

function windows(x, y, z, rotation) {
    gltfLoader.load('models/house/window.glb', (glb) => {
        const model = glb.scene;
        model.position.set(x, y, z);
        model.scale.set(0.01, 0.01, 0.01);
        model.rotation.y = Math.PI / rotation;
        scene.add(model);
    });
}
//House 1
windows(-7, 0.5, -2.75, 0.5);
windows(-6.25, 0.5, -2.25, -2);
windows(-7.75, 0.5, -1.75, 2);
//House 2
windows(-1.75, 0.5, -2.75, 1);
windows(-2.75, 0.5, -3.85, 2);
windows(-2.75, 0.5, -3.15, 2);
windows(-2, 0.5, -4.25, 0.5);
//House 3
windows(-4.75, 0.5, 2, -2);
windows(-5.15, 0.5, 2.75, 1);
windows(-5.85, 0.5, 2.75, 1);
windows(-6.25, 0.5, 2, 2);
//House 4
windows(1.65, 0.5, -0.25, 1);
windows(2.35, 0.5, -0.25, 1);
windows(2.75, 0.5, -1, -2);
windows(1.8, 0.5, -1.75, 0.5);
//House 5
windows(1.65, 0.5, -6.25, 1);
windows(1.8, 0.5, -7.75, 0.5);
windows(2.75, 0.5, -7, -2);
//House 6
windows(-1.75, 0.5, 5.75, 1);
windows(-1.5, 0.5, 4.25, 0.5);
windows(-0.75, 0.5, 5.25, -2);

// Roads
const roadMaterial = new THREE.MeshStandardMaterial({
    color: 0x404040,
    side: THREE.DoubleSide,
    roughness: 0.6,
    metalness: 0.0
});
function createRoadHorizontal(x1, z1, x2, z2) {
    const roadGeometry = new THREE.PlaneGeometry(1.5, 9.5);
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.position.set((x1 + x2) / 2, 0.01, (z1 + z2) / 2);
    scene.add(road);
}
function createRoadVertical(x1, z1, x2, z2) {
    const roadGeometry = new THREE.PlaneGeometry(1.5, 10.55);
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = -Math.PI / 2;
    road.rotation.z = -Math.PI / 2;
    road.position.set((x1 + x2) / 2, 0.01, (z1 + z2) / 2);
    scene.add(road);
}

createRoadHorizontal(-1, -5.1, 1, -5);  // vertical road
createRoadHorizontal(-10, 6.24, 3, 2);    // horizontal road
createRoadVertical(-9.05, -5, 0, 5);   // vertical road

const triangle1 = new Float32Array([
    0.75, 0.01, -9.8,
    0.0, 0.01, -10,
    -0.75, 0.01, -9.8
]);
const triangle2 = new Float32Array([
    -2.75, 0.01, 9.27,
    -4.25, 0.01, 8.87,
    -2.75, 0.01, 8.87,
]);
const triangle3 = new Float32Array([
    -9.8, 0.01, -0.75,
    -10.0, 0.01, 0.0,
    -9.8, 0.01, 0.75
]);

function roadEnd(pointsArray) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(pointsArray, 3));
    geometry.computeVertexNormals();
    const triangle = new THREE.Mesh(geometry, roadMaterial);
    return triangle;
}

const road1 = roadEnd(triangle1);
const road2 = roadEnd(triangle2);
const road3 = roadEnd(triangle3);

scene.add(road1);
scene.add(road2);
scene.add(road3);

// Street lights
function streetLight(x, y, z, rotation) {
    gltfLoader.load('models/outdoor/Streetlight.glb', (glb) => {
        const model = glb.scene;
        model.position.set(x, y, z);
        model.scale.set(2, 2, 2);
        model.rotation.y = Math.PI / rotation;
        scene.add(model);
        model.receiveShadow = true;
        model.castShadowq = true;
    });
}
streetLight(-4.3, 0, 0.8, 0.3);
streetLight(-4.3, 0, 4, 1);
streetLight(-4.3, 0, 7.2, 1);
streetLight(-0.8, 0, -0.8, -0.3);
streetLight(-5, 0, -0.8, 2);
streetLight(-9.2, 0, -0.8, 2);
streetLight(-0.8, 0, -5, 1);
streetLight(-0.8, 0, -9.2, 1);

const streetLights = [];

function addStreetLight(x, y, z) {
    const pointLight = new THREE.PointLight(0xffaa33, 3, 10);
    pointLight.position.set(x + 0.1, y + 1.2, z + 0.1);
    pointLight.castShadow = true;
    pointLight.visible = false;
    const targetObject = new THREE.Object3D();
    targetObject.position.set(x, y, z);
    scene.add(targetObject);
    pointLight.target = targetObject;
    scene.add(pointLight);
    streetLights.push(pointLight);
}


// Streetlight glow
addStreetLight(-4.3, 0, 0.8);
addStreetLight(-4.3, 0, 4);
addStreetLight(-4.3, 0, 7.2);
addStreetLight(-0.8, 0, -0.8);
addStreetLight(-5, 0, -0.8);
addStreetLight(-9.2, 0, -0.8);
addStreetLight(-0.8, 0, -5);
addStreetLight(-0.8, 0, -9.2);

// Car
let car;
gltfLoader.load('models/outdoor/Car.glb', (glb) => {
    car = glb.scene;
    car.scale.set(2, 2, 2);
    car.position.set(0, 0.15, -9.5);
    scene.add(car);
    animateCar();
});

function animateCar() {
    if (!car) return;

    car.position.set(0, 0.15, -9.5);
    car.rotation.y = 0;
    car.visible = true;

    new TWEEN.Tween(car.position)
        .to({ x: 0, z: 0 }, 2000)
        .onComplete(() => {
            new TWEEN.Tween(car.rotation)
                .to({ y: -Math.PI / 2 }, 500)
                .onComplete(() => {
                    new TWEEN.Tween(car.position)
                        .to({ x: -9.5, z: 0 }, 2000)
                        .onComplete(() => {
                            car.visible = false;
                            setTimeout(animateCar, 1000);
                        })
                        .start();
                })
                .start();
        })
        .start();
}
// Vlouds
function createCloud(x, y, z) {
    const cloudMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        flatShading: true,
        transparent: true,
        opacity: 0.6
    });

    for (let i = 0; i < 4; i++) {
        const cloudGeometry = new THREE.SphereGeometry(1, 8, 8);
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(x + (Math.random()) * 2, y + Math.random() * 0.6, z + (Math.random() - 0.5) * 2);
        cloud.castShadow = false;
        cloud.receiveShadow = false;
        scene.add(cloud);
    }
}

createCloud(3, 6, -2);
createCloud(-7, 6.5, 0);
createCloud(-5, 6, 4);
createCloud(-2, 7, 5);
createCloud(4, 7, 4);
createCloud(1, 8, 0);
createCloud(-4, 7, -7);

// Wall
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(0.5, 0.4);
const brickMaterial = new THREE.MeshStandardMaterial({ map: brickTexture });
const wallGeometry = new THREE.BoxGeometry(2, 2, 0.2);
const wall = new THREE.Mesh(wallGeometry, brickMaterial);
wall.position.set(6.5, 1, -5);
scene.add(wall);

// Tap
gltfLoader.load('models/outdoor/tap.glb', (glb) => {
    const tap = glb.scene;
    tap.position.set(6.5, 0.8, -4.1);
    tap.scale.set(0.2, 0.2, 0.2);
    tap.rotation.y = Math.PI / 2;
    scene.add(tap);
});


// River
const riverGeometry = new THREE.PlaneGeometry(2, 11.2, 5, 15);
const riverBaseGeometry = new THREE.PlaneGeometry(2, 11.2, 5, 15);

const riverMaterial = new THREE.MeshStandardMaterial({
    color: 0x5dcef1,
    flatShading: true,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
});

const river = new THREE.Mesh(riverGeometry, riverMaterial);
river.rotation.x = -Math.PI / 2;
river.position.set(6.5, 0.01, 0.6);
scene.add(river);

const riverBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x4cc9f0,
    transparent: false,
    side: THREE.DoubleSide
});

const riverBase = new THREE.Mesh(riverBaseGeometry, riverBaseMaterial);
riverBase.rotation.x = -Math.PI / 2;
riverBase.position.set(6.5, 0.01, 0.6);
riverBase.material.transparent = false;
scene.add(riverBase);

const riverTriangle = new Float32Array([
    5.5, 0.01, 6.2,
    5.5, 0.01, 8.2,
    7.5, 0.01, 6.2
]);

function riverEnd(pointsArray) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(pointsArray, 3));
    geometry.computeVertexNormals();
    const triangle = new THREE.Mesh(geometry, riverBaseMaterial);
    return triangle;
}
const riverEnding = riverEnd(riverTriangle);
scene.add(riverEnding);

// Water stream
const streamGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1);
const stream = new THREE.Mesh(streamGeometry, riverMaterial);
stream.position.set(6.52, 0.5, -3.4);
scene.add(stream);

// Waterfall
const waterfallGeometry = new THREE.PlaneGeometry(2.8, 11.2, 10, 10);
const positions = waterfallGeometry.attributes.position;
const watercolors = [];

for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const opacity = THREE.MathUtils.clamp((y + 5.59) / 11.2, 0, 1);
    watercolors.push(0.365, 0.808, 0.945, opacity);
}

waterfallGeometry.setAttribute("color", new THREE.Float32BufferAttribute(watercolors, 4));

const waterfallMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
    transparent: true,
    side: THREE.DoubleSide
});

const waterfall = new THREE.Mesh(waterfallGeometry, waterfallMaterial);
waterfall.position.set(6.5, -5.59, 7.2);
waterfall.rotation.y = Math.PI / 4;
scene.add(waterfall);



// Bridge
gltfLoader.load('models/outdoor/bridge.glb', (glb) => {
    const bridge = glb.scene;
    bridge.position.set(6.5, 0.01, 2);
    bridge.scale.set(0.25, 0.25, 0.25);
    bridge.rotation.y = Math.PI / 2;
    scene.add(bridge);
});

// Plants near river
function createBush(x, y, z) {
    const bushMaterial = new THREE.MeshStandardMaterial({ color: 0xa5be00, flatShading: true });

    for (let i = 0; i < 4; i++) {
        const bushGeometry = new THREE.SphereGeometry(0.5, 8, 8);
        const bush = new THREE.Mesh(bushGeometry, bushMaterial);
        bush.position.set(x + (Math.random()) * 0.5, y + Math.random() * 0.3, z + (Math.random() - 0.5));
        bush.castShadow = true;
        bush.receiveShadow = false;
        scene.add(bush);
    }
}
createBush(4.5, 0.01, -3.5);
createBush(4.5, 0.01, 5);
createBush(4.5, 0.01, 7.2);
createBush(4.5, 0.01, -0.5);
createBush(8, 0.01, 3.5);
createBush(8, 0.01, 0);
createBush(8, 0.01, -3);

gltfLoader.load('models/plants/low_poly_flowers.glb', (glb) => {
    const flowers = glb.scene;
    flowers.position.set(4.5, 0.01, 3);
    scene.add(flowers);
});

gltfLoader.load('models/plants/low_poly_flowers.glb', (glb) => {
    const flowers = glb.scene;
    flowers.position.set(8, 0.01, -1.8);
    scene.add(flowers);
});

function flowers(x, y, z, rotation) {
    gltfLoader.load('models/plants/low_poly_flowers_2.glb', (glb) => {
        const flowers = glb.scene;
        flowers.position.set(x, y, z);
        flowers.scale.set(0.005, 0.005, 0.005);
        flowers.rotation.y = Math.PI / rotation;
        scene.add(flowers);
    });
}
flowers(5, 0.01, 1, 1)
flowers(4.8, 0.01, 0.6, 3)
flowers(8.7, 0.01, -1.2, 3)
flowers(8.2, 0.01, 4.6, 3)
flowers(8, 0.01, 4.9, 1)
flowers(5, 0.01, -4.5, 1)
flowers(4.6, 0.01, -4.8, 2)
flowers(5, 0.01, -4.8, 3)

gltfLoader.load('models/plants/low_poly_mushrooms_1.glb', (glb) => {
    const model = glb.scene;
    model.position.set(5, 0.01, -2);
    model.scale.set(0.005, 0.005, 0.005);
    model.rotation.y = Math.PI / 3;
    scene.add(model);
});

gltfLoader.load('models/plants/low_poly_mushrooms_2.glb', (glb) => {
    const model = glb.scene;
    model.position.set(5, 0.01, 6);
    model.scale.set(0.005, 0.005, 0.005);
    model.rotation.y = Math.PI / -7;
    scene.add(model);
});

renderer.localClippingEnabled = true;
const clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.01);

// Forest
gltfLoader.load('models/plants/low_poly_forest.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-5, -0.13, -5);
    model.scale.set(0.18, 0.18, 0.18);
    model.rotation.y = Math.PI / 1;

    model.traverse((child) => {
        if (child.isMesh) {
            child.material.clippingPlanes = [clipPlane];
            child.material.clipShadows = true;
        }
    });

    scene.add(model);
});
gltfLoader.load('models/plants/tree.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-9, 0.01, -6);
    model.scale.set(0.5, 0.5, 0.5);
    model.rotation.y = Math.PI / -7;
    scene.add(model);
});
gltfLoader.load('models/plants/tree.glb', (glb) => {
    const model = glb.scene;
    model.position.set(0.5, -0.2, -7);
    model.scale.set(0.5, 0.5, 0.5);
    model.rotation.y = Math.PI / 1;
    scene.add(model);
});
gltfLoader.load('models/plants/Tree-2.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-2.2, 2.2, -6);
    model.scale.set(1.3, 1.3, 1.3);
    scene.add(model);
});
gltfLoader.load('models/plants/Tree-2.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-7.5, 1.2, -5.5);
    model.scale.set(0.7, 0.7, 0.7);
    scene.add(model);
});
gltfLoader.load('models/plants/Winding-Tree.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-6, 0.8, -7);
    model.scale.set(1.8, 1.8, 1.8);
    scene.add(model);
});
gltfLoader.load('models/plants/Winding-Tree.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-3.2, 0.8, -8);
    model.scale.set(1.8, 1.8, 1.8);
    model.rotation.y = Math.PI / 2;
    scene.add(model);
});
gltfLoader.load('models/plants/rock.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-4.5, 0.01, -7.5);
    model.scale.set(2, 2, 2);
    model.rotation.y = Math.PI / 1;
    scene.add(model);
});
gltfLoader.load('models/plants/Tree-Branches.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-7.2, -0.68, -4.5);
    model.scale.set(0.03, 0.03, 0.03);
    scene.add(model);
});
gltfLoader.load('models/plants/Tree-Branches.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-2.2, -0.68, -8.2);
    model.scale.set(0.031, 0.031, 0.031);
    model.rotation.y = Math.PI / 2;
    scene.add(model);
});

// Rock path
function Path(x, z, rotation) {
    gltfLoader.load('models/outdoor/path.glb', (glb) => {
        const model = glb.scene;
        model.position.set(x, -0.01, z);
        model.rotation.y = Math.PI / rotation;
        scene.add(model);
    });
}
Path(4.5, 2, 1);
Path(3.35, 1.92, -0.45);
Path(2.45, 1.2, 1.3);
Path(1.4, 0.7, 0.5);

// Playground
gltfLoader.load('models/outdoor/low_poly_picnic_table.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-7.7, 0.01, 2.5);
    model.scale.set(0.25, 0.25, 0.25);
    model.rotation.y = Math.PI / -7;
    scene.add(model);
});
gltfLoader.load('models/outdoor/swing.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-5.5, 0.55, 5);
    model.scale.set(0.07, 0.07, 0.07);
    model.rotation.y = Math.PI / -0.3;
    scene.add(model);
});
gltfLoader.load('models/outdoor/Gazebo.glb', (glb) => {
    const model = glb.scene;
    model.position.set(2, 0.55, 4);
    model.scale.set(1.4, 1.2, 1.4);
    model.rotation.y = Math.PI / 1 / 3;
    scene.add(model);
});
gltfLoader.load('models/outdoor/Slide.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-6.5, 0.35, 6);
    model.scale.set(5, 5, 5);
    model.rotation.y = Math.PI / -4;
    scene.add(model);
});

// Carousel
const carouselGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 8);
const carouselMaterial = new THREE.MeshStandardMaterial({ color: 0xb37256 });
const carousel = new THREE.Mesh(carouselGeometry, carouselMaterial);
carousel.position.set(2, 0.1, 7.5);
scene.add(carousel);

let carouselModel;

gltfLoader.load('models/outdoor/carousel.glb', (glb) => {
    carouselModel = glb.scene;
    carouselModel.position.set(2, 0.3, 7.5);
    carouselModel.scale.set(1.2, 1.2, 1.2);
    scene.add(carouselModel);
});

// Sandbox
gltfLoader.load('models/outdoor/Crate.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-1, 0, 8);
    model.scale.set(0.8, 0.5, 0.8);
    scene.add(model);
});

const geometry = new THREE.BoxGeometry(1.4, 0.2, 1.4);
const material = new THREE.MeshStandardMaterial({ color: 0xdcb863 });
const sandbox = new THREE.Mesh(geometry, material);
sandbox.position.set(-1, 0.2, 8);
scene.add(sandbox);

gltfLoader.load('models/outdoor/Sandcastle.glb', (glb) => {
    const model = glb.scene;
    model.position.set(-1.2, 0.28, 7.7);
    model.scale.set(0.05, 0.05, 0.05);
    scene.add(model);
});

// Plane
let plane;
let mixer;
let angle = 0;
const radius = 6;
gltfLoader.load('models/outdoor/cartoon_plane.glb', (glb) => {
    plane = glb.scene;
    plane.scale.set(1.8, 1.8, 1.8);
    scene.add(plane);
    if (glb.animations.length > 0) {
        mixer = new THREE.AnimationMixer(plane);
        const action = mixer.clipAction(glb.animations[0]);
        action.play();
    }
});

// Animations
let time = 0;
const riverVertices = river.geometry.attributes.position;
const clock = new THREE.Clock();

/**
 * This function is responsible for animating the scene.
 * It is called repeatedly using the requestAnimationFrame method.
 * It updates the positions of various elements in the scene, such as waves, carousel, and plane.
 * It also updates the animations of the plane model.
 */
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    TWEEN.update();

    time += 0.02; // Wave speed

    // Waves animation
    for (let i = 0; i < riverVertices.count; i++) {
        const y = riverVertices.getY(i);
        const x = riverVertices.getX(i);
        riverVertices.setZ(i, Math.sin(x * 1.5 + time) * 0.05 + Math.cos(y * 1.5 + time) * 0.08);
    }
    riverVertices.needsUpdate = true;

    // Carousel animation
    if (carouselModel) {
        carouselModel.rotation.y += 0.01;
    }

    // Plane animation
    if (plane) {
        angle += 0.01;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        plane.position.set(x, 9, z);

        plane.lookAt(Math.cos(angle + 0.1) * radius, 9, Math.sin(angle + 0.1) * radius);
    }

    if (mixer) {
        mixer.update(clock.getDelta());
    }

    renderer.render(scene, camera);
}

animate();
document.getElementById('toggleTime').addEventListener('click', toggleDayNight);

// Resizing event
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

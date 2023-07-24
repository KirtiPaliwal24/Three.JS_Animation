import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Texture Loader
const textureLoader = new THREE.TextureLoader()
const texture_0 = textureLoader.load('img_0.png')
const texture_1 = textureLoader.load('img_1.png')
const texture_2 = textureLoader.load('img_2.png')
const texture_3 = textureLoader.load('img_3.png')
const texture_4 = textureLoader.load('img_4.png')
const texture_5 = textureLoader.load('img_5.png')
const texture_6 = textureLoader.load('img_6.png')
const texture_7 = textureLoader.load('img_7.png')
const texture_8 = textureLoader.load('img_8.png')
const texture_9 = textureLoader.load('img_9.png')
const texture_10 = textureLoader.load('img_10.png')
const texture_11 = textureLoader.load('img_11.png')
const texture_12 = textureLoader.load('img_12.png')

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xb73666,0.4)
directionalLight.position.set(0,0,2)
scene.add(directionalLight)

 // Group
const geometry = new THREE.PlaneBufferGeometry(1, 1)
const material = new THREE.MeshStandardMaterial({ map: texture_12, side: THREE.DoubleSide })
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)

const floating_msgs = new THREE.Group()
const geometry_0 = new THREE.PlaneBufferGeometry(0.1, 0.1)
const geometry_1 = new THREE.PlaneBufferGeometry(0.5, 0.2)
const geometry_2 = new THREE.PlaneBufferGeometry(0.5, 0.1)
const geometry_3 = new THREE.PlaneBufferGeometry(0.15, 0.15)
const material_0 = new THREE.MeshStandardMaterial({map:texture_0,transparent:true})
const material_1 = new THREE.MeshStandardMaterial({map:texture_1,transparent:true})
const material_2 = new THREE.MeshStandardMaterial({map:texture_2,transparent:true})
const material_4 = new THREE.MeshStandardMaterial({map:texture_4,transparent:true})
const material_5 = new THREE.MeshStandardMaterial({map:texture_5,transparent:true})
const material_6 = new THREE.MeshStandardMaterial({map:texture_6,transparent:true})
const material_7 = new THREE.MeshStandardMaterial({map:texture_7,transparent:true})
const material_8 = new THREE.MeshStandardMaterial({map:texture_8,transparent:true})
const material_9 = new THREE.MeshStandardMaterial({map:texture_9,transparent:true})
const material_11 = new THREE.MeshStandardMaterial({map:texture_11,transparent:true})

const plane_0 = new THREE.Mesh(geometry_0, material_0)
const plane_1 = new THREE.Mesh(geometry_0, material_1)
const plane_2 = new THREE.Mesh(geometry_0, material_2)
const plane_8 = new THREE.Mesh(geometry_3,material_8)
//profiles
const plane_4 = new THREE.Mesh(geometry_3,material_4)
const plane_5 = new THREE.Mesh(geometry_3,material_5)
const plane_6 = new THREE.Mesh(geometry_3,material_6)
const plane_7 = new THREE.Mesh(geometry_3,material_7)
//msg
const plane_9 = new THREE.Mesh(geometry_1,material_9)
const plane_11 = new THREE.Mesh(geometry_2,material_11)

plane_0.position.set(0.4,0.55,0)
plane_1.position.set(0.3,0.55,0)
plane_2.position.set(0.2,0.55,0)
plane_8.position.set(-0.4,0.5,0.02)

//profiles
plane_4.position.set(-0.4,-0.1,0.02)
plane_5.position.set(-0.4,-0.2,0.03)
plane_6.position.set(-0.4,-0.3,0.04)
plane_7.position.set(-0.4,-0.4,0.05)
//msg
plane_9.position.set(0.4,-0.1,0.1)
plane_11.position.set(0.4,0.05,0.1)

floating_msgs.add(plane_0,plane_1,plane_2,plane_4,plane_5,plane_6,plane_7,plane_8,plane_9,plane_11)
scene.add(floating_msgs)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    // Update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update aspect ratio of camera
    camera.aspect = sizes.width / sizes.height
    // Update changes projection data
    camera.updateProjectionMatrix()
    // Resize renderer
    renderer.setSize(sizes.width, sizes.height)
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 1.2)
scene.add(camera)

// Orbit Controls
const control = new OrbitControls(camera, canvas)
control.enableRotate = false

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.clearColor(0x5ce1e6)
renderer.render(scene, camera)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Constants
const pi = Math.PI
let degree = 1
plane.rotation.y = pi

//clock
const clock = new THREE.Clock()
function tick() {
    control.update()
    floating_msgs.visible = false
    if(degree >= 2 && degree < 2.25){
        animate_msgs(degree)
        plane.rotation.y = pi*degree
        degree += 0.001
    }
    else if(degree >= 1 && degree < 2){
        //fast
        plane.rotation.y = pi*degree
        degree += 0.1
    }
    else if(degree >= 2.25 && degree < 3){
        //fast
        plane.rotation.y = pi*degree
        degree += 0.1
    }
    else{
        const elapsed_time = clock.getElapsedTime()
        if(elapsed_time%3 >= 2){
            degree = 1
        }
        plane.rotation.y = pi
    }  
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()

function animate_msgs(degree){
    floating_msgs.visible = true
    floating_msgs.rotation.y = pi*degree
}
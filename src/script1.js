import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Texture Loader
const texture = new THREE.TextureLoader()


// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight(0xe0dbb0,1)
directionalLight.position.set(0,1.5,0)
directionalLight.castShadow = true
directionalLight.shadow.normalBias = 0.05
directionalLight.shadow.mapSize.set(64,64)
directionalLight.position.set(0.25, 3, 2.25)
scene.add(directionalLight)

/**
 * Table
 */
const loader = new GLTFLoader()
loader.load('table.glb',(glb)=>{
    const table_obj = glb.scene
    table_obj.rotation.x = Math.PI
    table_obj.traverse((child) => {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
            child.material.color = new THREE.Color(0xff0000)
            child.material.metalness = 0.1
            child.material.castShadow = true
            child.material.recieveShadow = true
        }
    })
    scene.add(table_obj)
    // const box = new THREE.BoxHelper(table_obj, 0x0000ff)
    // scene.add(box)
    console.log(table_obj)
}, (err)=>{
    console.log(err)
})

const geometry = new THREE.PlaneBufferGeometry(1,1)
const material = new THREE.MeshStandardMaterial({color:0xf0f00f})
const plane = new THREE.Mesh(geometry,material)
plane.rotation.x = Math.PI * -0.5
plane.position.set(0,-0.2,0)
plane.material.recieveShadow = true
plane.material.castShadow = true
scene.add(plane)
/**
 * Sizes
 */
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
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0.5,0.5,1)
scene.add(camera)
/*
 * Orbit Controls
 */
const control = new OrbitControls(camera,canvas)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true,
    antialias : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.clearColor(0x5ce1e6)
renderer.render(scene, camera)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3

//clock

function tick()
{
    //const time = clock.getElapsedTime()
    control.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}
tick()
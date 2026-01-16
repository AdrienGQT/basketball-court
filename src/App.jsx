import BasketballCourt from "./components/environment/BasketballCourt.jsx";
import MainLight from "./components/lights/MainLight.jsx";
import AmbientLight from "./components/lights/AmbientLight.jsx";
import { BakeShadows, OrbitControls, Sparkles } from "@react-three/drei";
import DirectionalLight from "./components/lights/DirectionalLight.jsx";
import Camera from "./components/misc/Camera.jsx";
import * as THREE from 'three'

export default function App() {
    return (
        <>
            <Camera />
            {/* <OrbitControls target={new THREE.Vector3(-1, 1, -10)} /> */}

            {/* Model court */}
            <BasketballCourt />

            <Sparkles position={[0.2, 2.7, -6.3]} scale={[12, 2.5, 5]} opacity={0.3} size={6} speed={1} count={50} color={new THREE.Color('#e3c069')} />

            {/* Lights */}
            <AmbientLight />
            <DirectionalLight />
            <MainLight />

            <BakeShadows />
        </>
    );
}

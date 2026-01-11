import BasketballCourt from "./BasketballCourt.jsx";
import MainLight from "./MainLight.jsx";
import AmbientLight from "./AmbientLight.jsx";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from 'three'

export default function App() {
    
    return (
        <>
            <OrbitControls target={new THREE.Vector3(-3, 0, -8)} />

            {/* Model court */}
            <BasketballCourt />

            {/* Lights */}
            <MainLight />
            <AmbientLight />
            
            {/* <pointLight args={['#ffffff', 200, 1000]} position={[-2, 2 ,-2]}/> */}
        </>
    );
}

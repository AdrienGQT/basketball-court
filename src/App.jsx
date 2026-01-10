import BasketballCourt from "./BasketballCourt.jsx";
import MainLight from "./MainLight.jsx";
import AmbientLight from "./AmbientLight.jsx";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";

export default function App() {
    
    return (
        <>
            <OrbitControls />

            {/* Model court */}
            <BasketballCourt />

            {/* Lights */}
            <MainLight />
            <AmbientLight />
            
            {/* <pointLight args={['#ffffff', 200, 1000]} position={[-2, 2 ,-2]}/> */}
        </>
    );
}

import BasketballCourt from "./BasketballCourt.jsx";
import MainLight from "./MainLight.jsx";
import AmbientLight from "./AmbientLight.jsx";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize, Resolution } from "postprocessing";

export default function App() {
    return (
        <>
            <OrbitControls target={new THREE.Vector3(-1, 1, -10)} />

            <EffectComposer>
                <Bloom
                    intensity={1.0}
                    luminanceThreshold={0.6}
                    // luminanceSmoothing={0.025}
                />
            </EffectComposer>

            {/* Model court */}
            <BasketballCourt />

            {/* Lights */}
            <MainLight />
            <AmbientLight />

            {/* <pointLight args={['#ffffff', 200, 1000]} position={[-2, 2 ,-2]}/> */}
        </>
    );
}

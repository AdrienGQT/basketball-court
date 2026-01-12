import BasketballCourt from "./components/environment/BasketballCourt.jsx";
import MainLight from "./components/lights/MainLight.jsx";
import AmbientLight from "./components/lights/AmbientLight.jsx";
import { BakeShadows, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
    EffectComposer,
    Bloom,
    ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import DirectionalLight from "./components/lights/DirectionalLight.jsx";
import Camera from "./components/misc/Camera.jsx";

export default function App() {
    return (
        <>  
            <Camera />
            {/* <OrbitControls target={new THREE.Vector3(-1, 1, -10)} /> */}

            {/* Model court */}
            <BasketballCourt />

            {/* Lights */}
            <AmbientLight />
            <DirectionalLight />
            <MainLight />

            <BakeShadows />

            <EffectComposer>
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
                {/* <Bloom
                    intensity={1.0}
                    luminanceThreshold={0.8}
                    luminanceSmoothing={0.1}
                /> */}
            </EffectComposer>
        </>
    );
}

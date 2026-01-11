import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import App from "./App.jsx";
import * as THREE from 'three'

const root = createRoot(document.getElementById("root"));

root.render(
    <Canvas
        gl={{
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1,
        }}
        camera={{
            fov: 54,
            near: 0.1,
            far: 100,
            position: [9, 2, -4],
        }}
    >   
    <color args={['#2c3b5f']} attach="background" />
        <App />
    </Canvas>
);

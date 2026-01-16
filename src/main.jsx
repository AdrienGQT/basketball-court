import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import App from "./App.jsx";
import { Perf } from "r3f-perf";
import * as THREE from 'three';

const root = createRoot(document.getElementById("root"));

root.render(
    <Canvas
        shadows
        onCreated={({ gl }) => {
            gl.toneMapping = THREE.NeutralToneMapping;
            gl.toneMappingExposure = 1.4;
        }}
    >
        <color args={["#2c3b5f"]} attach="background" />
        <Perf position="top-left" />
        <App />
    </Canvas>
);
import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
    <Canvas
        camera={{
            fov: 45,
            near: 0.1,
            far: 100,
            position: [9, 2, -4],
        }}
    >   
    <color args={['#2c3b5f']} attach="background" />
        <App />
    </Canvas>
);

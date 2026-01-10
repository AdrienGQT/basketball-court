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
            position: [9, 2, 3.3],
        }}
    >
        <App />
    </Canvas>
);

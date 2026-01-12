import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import App from "./App.jsx";
import { Perf } from "r3f-perf";

const root = createRoot(document.getElementById("root"));

root.render(
    <Canvas
        shadows
        onPointerMove={(e) => {
            console.log(e);
        }}
    >
        <color args={["#2c3b5f"]} attach="background" />
        <Perf position="top-left" />
        <App />
    </Canvas>
);

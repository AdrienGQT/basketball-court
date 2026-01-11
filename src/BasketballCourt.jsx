import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";
import { useEffect, useState } from "react";
import { folder, useControls } from "leva";
// import { GroundReflector } from "./GroundReflector.jsx";
import * as THREE from "three";
import GroundReflector from "./GroundReflector";

export default function BasketballCourt() {
    const model = useGLTF("./model/basketball_court.glb");
    const [groundMesh, setGroundMesh] = useState(null);
    const [groundSize, setGroundSize] = useState(null);

    const materialMap = {
        ground: new THREE.MeshStandardMaterial({ color: "#321a14" }),
        groundClearer: new THREE.MeshStandardMaterial({ color: "#5b2d20" }),
        courtLinesBasket: new THREE.MeshStandardMaterial({ color: "white" }),
        courtLinesCenter: new THREE.MeshStandardMaterial({ color: "white" }),
        wall1: new THREE.MeshStandardMaterial({ color: "#28875f" }),
        wall2: new THREE.MeshStandardMaterial({ color: "#28875f" }),
        ceiling: new THREE.MeshStandardMaterial({ color: "#949494" }),
        ball: new THREE.MeshStandardMaterial({color: '#c9542d'})
    };

    useEffect(() => {
        model.scene.traverse((child) => {
            if (child.isMesh) {
                if (child.name === "ground") {
                    setGroundMesh(child);

                    child.geometry.computeBoundingBox();
                    const bbox = child.geometry.boundingBox;
                    const size = new THREE.Vector3();
                    bbox.getSize(size);

                    setGroundSize(size);

                    console.log(groundSize);
                }
                child.material =
                    materialMap[child.name] ||
                    new THREE.MeshBasicMaterial({ color: "purple" });
            }
        });
    }, [model]);

    return (
        <>
            <primitive object={model.scene} />

            {/* <GroundReflector /> */}

            {groundMesh && groundSize && (
                <GroundReflector
                    groundMesh={groundMesh}
                    groundSize={groundSize}
                />
            )}
        </>
    );
}

import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export default function BasketballCourt() {
    const model = useGLTF("./model/basketball_court.glb");
    const [groundMesh, setGroundMesh] = useState(null);

    const materialMap = {
        ground: new THREE.MeshStandardMaterial({ color: "#321a14" }),
        groundClearer: new THREE.MeshStandardMaterial({ color: "#5b2d20" }),
        courtLinesBasket: new THREE.MeshStandardMaterial({color: "white"}),
        courtLinesCenter: new THREE.MeshStandardMaterial({color: "white"}),
        wall1: new THREE.MeshStandardMaterial({ color: "#28875f" }),
        wall2: new THREE.MeshStandardMaterial({ color: "#28875f" }),
        ceiling: new THREE.MeshStandardMaterial({ color: "#949494" }),
    };

    useEffect(() => {
        model.scene.traverse((child) => {
            if (child.isMesh) {
                if (child.name === "ground") {
                    setGroundMesh(child);
                    child.visible = false;
                } else {
                    child.material =
                        materialMap[child.name] ||
                        new THREE.MeshBasicMaterial({ color: "purple" });
                }
            }
        });
    }, [model]);

    return (
        <>
            <primitive object={model.scene} />

            {groundMesh && (
                <mesh
                    geometry={groundMesh.geometry}
                    position={groundMesh.position}
                    rotation={groundMesh.rotation}
                >
                    <MeshReflectorMaterial
                        color={"#2f1e13"}
                    />
                </mesh>
            )}
        </>
    );
}

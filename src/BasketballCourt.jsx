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
        ground: new THREE.MeshBasicMaterial({ color: "#281a10" }),
        groundClearer: new THREE.MeshBasicMaterial({ color: "#c75c05" }),
        courtLinesBasket: new THREE.MeshBasicMaterial({ color: "#cacaca" }),
        courtLinesCenter: new THREE.MeshBasicMaterial({ color: "#cacaca" }),
        wall1: new THREE.MeshStandardMaterial({ color: "#265736" }),
        wall2: new THREE.MeshStandardMaterial({ color: "#265736" }),
        ceiling: new THREE.MeshStandardMaterial({ color: "#949494" }),
        ball: new THREE.MeshStandardMaterial({color: '#c9542d'}),
        door1: new THREE.MeshStandardMaterial({ color: "#281a10" }),
        door2: new THREE.MeshStandardMaterial({ color: "#281a10" }),
        basketPannelBase: new THREE.MeshStandardMaterial({color: '#b37e94'}),
        basketPannelPaintCenter: new THREE.MeshStandardMaterial({ color: "#4f1818" }),
        basketPannelPaintBorder: new THREE.MeshStandardMaterial({ color: "#4f1818" }),
        basketBase: new THREE.MeshStandardMaterial({ color: "#4f1818"}),
        basketNet : new THREE.MeshStandardMaterial({ color: "#e1e1e1"})
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
                }
                child.material =
                    materialMap[child.name] ||
                    new THREE.MeshBasicMaterial({ color: "purple" });
                child.castShadow = true
                child.receiveShadow = true
                if(child.name ==="basketPannelBase"){
                    console.log(child)
                }
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

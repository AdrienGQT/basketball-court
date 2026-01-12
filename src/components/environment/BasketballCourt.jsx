import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";
import { useEffect, useState } from "react";
import { folder, useControls } from "leva";
// import { GroundReflector } from "./GroundReflector.jsx";
import * as THREE from "three";
import GroundReflector from "./GroundReflector";

export default function BasketballCourt() {
    const textureLoader = new THREE.TextureLoader();

    const ballTexture = textureLoader.load('./tiles.png')
    ballTexture.colorSpace = THREE.SRGBColorSpace

    const model = useGLTF("./model/basketball_court3.glb");
    const [groundMesh, setGroundMesh] = useState(null);
    const [groundSize, setGroundSize] = useState(null);

    const shadowCaster = ["basketPannelBase"];

    const shadowReceiver = ["wall1", "wall2"];

    const materialMap = {
        ground: new THREE.MeshBasicMaterial({ color: "#281a10" }),
        groundClearer: new THREE.MeshBasicMaterial({ color: "#c75c05" }),
        courtLinesBasket: new THREE.MeshBasicMaterial({ color: "#ddd1b5" }),
        courtLinesCenter: new THREE.MeshBasicMaterial({ color: "#ddd1b5" }),
        wall1: new THREE.MeshStandardMaterial({
            color: "#265736",
            roughness: 0.96,
        }),
        wall2: new THREE.MeshStandardMaterial({
            color: "#265736",
            roughness: 0.96,
        }),
        ceiling: new THREE.MeshStandardMaterial({ color: "#52472f" }),
        ball: new THREE.MeshStandardMaterial({
            color: "#b14409",
        }),
        door1: new THREE.MeshStandardMaterial({ color: "#281a10" }),
        door2: new THREE.MeshStandardMaterial({ color: "#281a10" }),
        basketPannelBase: new THREE.MeshStandardMaterial({
            color: "#b37e94",
            roughness: 0.2,
        }),
        basketPannelPaintCenter: new THREE.MeshStandardMaterial({
            color: "#4f1818",
            roughness: 0.5,
        }),
        basketPannelPaintBorder: new THREE.MeshStandardMaterial({
            color: "#4f1818",
            roughness: 0.5,
        }),
        basketBase: new THREE.MeshStandardMaterial({ color: "#4f1818" }),
        basketNet: new THREE.MeshStandardMaterial({ color: "#e1e1e1" }),
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
                if (shadowCaster.includes(child.name)) {
                    child.castShadow = true;
                    console.log(child);
                }
                if (shadowReceiver.includes(child.name)) {
                    child.receiveShadow = true;
                    console.log(child);
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

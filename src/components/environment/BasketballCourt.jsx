import { useGLTF, MeshReflectorMaterial } from "@react-three/drei";
import { useEffect, useState } from "react";
import { folder, useControls } from "leva";
// import { GroundReflector } from "./GroundReflector.jsx";
import * as THREE from "three";
import GroundReflector from "./GroundReflector";

export default function BasketballCourt() {
    const textureLoader = new THREE.TextureLoader();

    const ballTexture = textureLoader.load("./tiles.png");
    ballTexture.colorSpace = THREE.SRGBColorSpace;

    const model = useGLTF("./model/basketball_court7.glb");
    const [groundMesh, setGroundMesh] = useState(null);
    const [groundSize, setGroundSize] = useState(null);
    const [groundPosition, setGroundPosition] = useState(null);

    const shadowCaster = ["basketPannelBase"];

    const shadowReceiver = ["wall1", "wall2"];

    const materialMap = {
        ground: new THREE.MeshBasicMaterial({ color: "#1a180e" }),
        groundClearer: new THREE.MeshBasicMaterial({ color: "#c75c05" }),
        courtLinesBasket: new THREE.MeshBasicMaterial({ color: "#ddd1b5" }),
        courtLinesCenter: new THREE.MeshBasicMaterial({ color: "#ddd1b5" }),
        walls: new THREE.MeshStandardMaterial({
            color: "#265736",
            roughness: 0.96,
        }),
        wallDetail: new THREE.MeshStandardMaterial({
            color: "#234f32",
            roughness: 0.96,
        }),
        ceiling1: new THREE.MeshStandardMaterial({ color: "#52472f" }),
        ball: new THREE.MeshStandardMaterial({
            color: "#99481d",
            roughness: 0.75,
        }),
        door1: new THREE.MeshStandardMaterial({ color: "#140e0a" }),
        door2: new THREE.MeshStandardMaterial({ color: "#170f0a" }),
        door1Handle: new THREE.MeshStandardMaterial({color: '#6d6d6d', metalness: 0.1, roughness: 0.4}),
        door2Handle: new THREE.MeshStandardMaterial({color: '#6d6d6d', metalness: 0.1, roughness: 0.4}),
        doorStep1: new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        doorStep2: new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        basketPannelBase: new THREE.MeshBasicMaterial({
            color: "#f5d1e0",
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

                    let position = new THREE.Vector3();
                    position.fromBufferAttribute(
                        child.geometry.getAttribute("position"),
                        0
                    );
                    setGroundPosition(child.geometry.boundingSphere.center);

                    child.geometry.computeBoundingBox();
                    const bbox = child.geometry.boundingBox;
                    const size = new THREE.Vector3();
                    bbox.getSize(size);

                    setGroundSize(size);
                }
                if (shadowCaster.includes(child.name)) {
                    child.castShadow = true;
                }
                if (shadowReceiver.includes(child.name)) {
                    child.receiveShadow = true;
                }
                if (child.name === "basketNet") {
                    child.visible = false;
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

            {groundMesh && groundSize && groundPosition && (
                <GroundReflector
                    groundMesh={groundMesh}
                    groundSize={groundSize}
                    groundPosition={groundPosition}
                />
            )}
        </>
    );
}

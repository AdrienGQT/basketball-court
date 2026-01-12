import { folder, useControls } from "leva";
import { useRef, useEffect } from "react";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";

export default function MainLight() {
    const lightRef = useRef();
    const targetRef = useRef();

    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load("./gobo/gobo.jpg");

    const {
        color,
        position,
        targetPosition,
        distance,
        angle,
        intensity,
        penumbra,
        decay,
        shadowCameraNear,
        shadowCameraFar,
        showGizmo,
        gizmoMode,
    } = useControls("Lights", {
        SpotLight: folder({
            color: "#ffb413",
            position: {
                value: {
                    x: 140,
                    y: 31,
                    z: 19,
                },
                step: 0.1,
            },
            targetPosition: {
                value: {
                    x: 0.2,
                    y: 3,
                    z: -7.9,
                },
                step: 0.1,
            },
            distance: {
                value: 400,
                min: 1,
                max: 1000,
                step: 0.1
            },
            angle: {
                value: 0.05,
                min: 0,
                max: Math.PI,
                step: 0.01,
            },
            intensity: {
                value: 45,
                min: 1,
                max: 50,
                step: 0.1,
            },
            penumbra: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
            },
            decay: {
                value: 0,
                min: 0,
                max: 2,
                step: 0.01,
            },
            shadowCameraNear: {
                value: 1,
                min: 1,
                max: 5,
                step: 1
            },
            shadowCameraFar: {
                value: 3,
                min: 1,
                max: 2000,
                step: 1
            },
            showGizmo: true,
            gizmoMode: {
                value: "translate",
                options: ["translate", "rotate", "scale"],
            },
        }),
    });

    useEffect(() => {
        if (targetRef.current) {
            targetRef.current.position.set(
                targetPosition.x,
                targetPosition.y,
                targetPosition.z
            );
        }
    }, [targetPosition]);

    useEffect(() => {
        if (lightRef.current && targetRef.current) {
            lightRef.current.target = targetRef.current;
        }
    }, []);

    return (
        <>
            <spotLight
                ref={lightRef}
                distance={distance}
                color={color}
                intensity={intensity}
                position={[position.x, position.y, position.z]}
                angle={angle}
                penumbra={penumbra}
                decay={decay}
                map={map}
                mapSize={[1024, 1024]}
                castShadow={true}
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={shadowCameraNear}
                shadow-camera-far={shadowCameraFar}
            />

            <object3D
                ref={targetRef}
                position={[targetPosition.x, targetPosition.y, targetPosition.z]}
            />

            {lightRef.current && (
                <primitive
                    object={new THREE.SpotLightHelper(lightRef.current)}
                />
            )}

            {showGizmo && lightRef.current && (
                <TransformControls object={lightRef.current} mode={gizmoMode} />
            )}
        </>
    );
}

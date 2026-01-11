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
        angle,
        intensity,
        penumbra,
        decay,
        showGizmo,
        gizmoMode,
    } = useControls("Lights", {
        SpotLight: folder({
            color: "#ffffff",
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
                    z: -8.2,
                },
                step: 0.1,
            },
            angle: {
                value: 0.05,
                min: 0,
                max: Math.PI,
                step: 0.01,
            },
            intensity: {
                value: 15,
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
                color={color}
                intensity={intensity}
                position={[position.x, position.y, position.z]}
                angle={angle}
                penumbra={penumbra}
                decay={decay}
                map={map}
                mapSize={[2048, 2048]}
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

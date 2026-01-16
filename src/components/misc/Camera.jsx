import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useCameraMove from "../../hooks/useCameraMove";

export default function Camera() {
    const targetRef = useRef();
    const cameraRef = useRef();

    const { fov, position, targetPosition } = useControls(
        "Camera",
        {
            fov: {
                value: 50,
                min: 20,
                max: 100,
                step: 1,
            },
            position: {
                value: { x: 7.8, y: 1.7, z: -4.9 },
                step: 0.1,
            },
            targetPosition: {
                value: {
                    x: 0.2,
                    y: 1.9,
                    z: -7.9,
                },
                step: 0.1,
            },
        },
        { collapsed: true }
    );

    useEffect(() => {
        if (cameraRef.current) {
            cameraRef.current.lookAt(
                new THREE.Vector3(
                    targetPosition.x,
                    targetPosition.y,
                    targetPosition.z
                )
            );
        }
    }, [targetPosition]);

    useCameraMove(targetPosition, {
        onXSensitivity: 0.3,
        onYSensitivity: 0.4,
        onZSensitivity: -0.7,
        lerpFactor: 0.02,
    });

    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                fov={fov}
                near={0.1}
                far={50}
                position={[position.x, position.y, position.z]}
                target
            />

            <object3D
                ref={targetRef}
                position={[
                    targetPosition.x,
                    targetPosition.y,
                    targetPosition.z,
                ]}
            />
        </>
    );
}

import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Camera() {
    const targetRef = useRef();
    const cameraRef = useRef();

    const { fov, position, targetPosition } = useControls("Camera", {
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
    });

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

    return (
        <>
            <PerspectiveCamera
                ref={cameraRef}
                makeDefault
                fov={fov}
                near={0.1}
                far={20}
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

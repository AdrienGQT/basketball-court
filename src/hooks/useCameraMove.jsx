import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function useCameraMove(targetPosition, options = {}) {
    const { camera } = useThree();
    const initialPositionRef = useRef(null);
    const currentOffsetRef = useRef({ x: 0, y: 0, z:0 });

    const onXSensitivity = options.onXSensitivity || 0;
    const onYSensitivity = options.onYSensitivity || 0;
    const onZSensitivity = options.onZSensitivity || 0;
    const lerpFactor = options.lerpFactor || 0.1;

    useFrame((state) => {
        if (!initialPositionRef.current) {
            initialPositionRef.current = camera.position.clone();
        }

        if (initialPositionRef.current && targetPosition) {
            const targetOffsetX = state.mouse.x * onXSensitivity;
            const targetOffsetY = state.mouse.y * onYSensitivity;
            const targetOffsetZ = state.mouse.x * onZSensitivity;

            currentOffsetRef.current.x = THREE.MathUtils.lerp(
                currentOffsetRef.current.x,
                targetOffsetX,
                lerpFactor
            );
            currentOffsetRef.current.y = THREE.MathUtils.lerp(
                currentOffsetRef.current.y,
                targetOffsetY,
                lerpFactor
            );currentOffsetRef.current.z = THREE.MathUtils.lerp(
                currentOffsetRef.current.z,
                targetOffsetZ,
                lerpFactor
            );

            camera.position.x =
                initialPositionRef.current.x + currentOffsetRef.current.x;
            camera.position.y =
                initialPositionRef.current.y + currentOffsetRef.current.y;
            camera.position.z =
                initialPositionRef.current.z + currentOffsetRef.current.z;

            // console.log(targetOffsetX, onXSensitivity)

            camera.lookAt(
                new THREE.Vector3(
                    targetPosition.x,
                    targetPosition.y,
                    targetPosition.z
                )
            );
        }
    });
}

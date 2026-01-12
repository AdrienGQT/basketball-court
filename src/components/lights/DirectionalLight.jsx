import { folder, useControls } from "leva";
import { useRef, useEffect } from "react";

export default function DirectionalLight() {
    const lightRef = useRef();
    const targetRef = useRef();

    const { color, intensity, position, targetPosition } = useControls(
        "Lights",
        {
            DirectionalLight: folder({
                color: "#ffffff",
                intensity: {
                    value: 2,
                    min: 0,
                    max: 10,
                    step: 0.01,
                },
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
            }),
        }
    );

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
            <directionalLight
                ref={lightRef}
                position={[position.x, position.y, position.z]}
                color={color}
                intensity={intensity}
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

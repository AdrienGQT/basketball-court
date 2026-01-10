import { folder, useControls } from "leva";

export default function MainLight() {
    const { color, position, angle, intensity, penumbra, decay } = useControls(
        "Lights",
        {
            SpotLight: folder({
                color: "#ffffff",
                position: {
                    x: 2.8,
                    y: 3.9,
                    z: 2.3,
                },
                angle: {
                    value: Math.PI / 3,
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
            }),
        }
    );
    return (
        <>
            <spotLight
                color={color}
                intensity={intensity}
                position={[position.x, position.y, position.z]}
                angle={angle}
                penumbra={penumbra}
                decay={decay}
            />
        </>
    );
}

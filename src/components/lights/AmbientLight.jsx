import { folder, useControls } from "leva";

export default function AmbientLight() {
    const { intensity, color } = useControls("Lights", {
        AmbientLight: folder({
            intensity: {
                value: 3,
                min: 0,
                max: 25,
                step: 0.01,
            },
            color: "#ffffff",
        }),
    });
    return (
        <>
            <ambientLight intensity={intensity} color={color} />
        </>
    );
}

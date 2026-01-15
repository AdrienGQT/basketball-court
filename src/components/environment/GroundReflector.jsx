import { MeshReflectorMaterial } from "@react-three/drei";
import { folder, useControls } from "leva";

export default function GroundReflector({ groundMesh, groundSize, groundPosition }) {
    const {
        color,
        blurWidth,
        blurHeight,
        roughness,
        mixBlur,
        mixStrength,
        mirror,
        opacity,
    } = useControls("Ground", {
        GroundReflection: folder({
            color: "#281a10",
            blurWidth: {
                value: 100,
                min: 0,
                max: 500,
                step: 10,
            },
            blurHeight: {
                value: 50,
                min: 0,
                max: 500,
                step: 10,
            },
            roughness: {
                value: 0.77,
                min: 0,
                max: 1,
                step: 0.01,
            },
            mixBlur: {
                value: 1,
                min: 0,
                max: 1,
                step: 0.01,
            },
            mixStrength: {
                value: 60,
                min: 0,
                max: 100,
                step: 0.1,
            },
            mirror: {
                value: 0,
                min: 0,
                max: 1,
                step: 0.01,
            },
            opacity: {
                value: 0.25,
                min: 0,
                max: 1,
                step: 0.01,
            },
        }),
    });
    return (
        <mesh rotation={[Math.PI * -0.5, 0, 0]} position={[groundPosition.x, groundPosition.y + 0.027, groundPosition.z]}>
            <planeGeometry args={[groundSize.x, groundSize.z]} />
            <MeshReflectorMaterial
                color={color}
                blur={[blurWidth, blurHeight]}
                roughness={roughness}
                mixBlur={mixBlur}
                mixStrength={mixStrength}
                mirror={mirror}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                resolution={512}
                opacity={opacity}
                transparent={true}
            />
        </mesh>
    );
}

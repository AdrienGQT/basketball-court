import { MeshReflectorMaterial } from "@react-three/drei";
import { folder, useControls } from "leva";

export default function GroundReflector({ groundMesh, groundSize }) {
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
                value: 300,
                min: 0,
                max: 500,
                step: 10,
            },
            blurHeight: {
                value: 100,
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
                value: 100,
                min: 0,
                max: 100,
                step: 0.1,
            },
            mirror: {
                value: 1,
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
        <mesh rotation={[Math.PI * -0.5, 0, 0]} position={[0, 0.03, 0]}>
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
                resolution={2048}
                opacity={opacity}
                transparent={true}
            />
            {/* <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={80}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.5}
            /> */}
        </mesh>
    );
}

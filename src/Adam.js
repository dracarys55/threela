import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";


export default function Adam() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows style={{ width: '100vw', height: '100vh' }}>
        <Square />
      </Canvas>
    </Suspense>
  );
}

function Square() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <mesh receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="lightblue" />
      </mesh>
    </>
  );
}

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { ShaderMaterial } from 'three';
import glsl from 'glslify';

// 着色器代码
const vertexShader = glsl(/* glsl */ `
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`);

const fragmentShader = glsl(/* glsl */ `
  varying vec2 vUv;
  varying vec3 vPos;
  uniform float uTime;

  void main() {
    // 着色器代码，创建水样波纹效果
    float wave = sin(vPos.x * 10.0 + uTime) * 0.1;
    wave += sin(vPos.y * 10.0 + uTime) * 0.1;
    vec3 waterColor = vec3(0.1, 0.2, 0.3) + wave * 0.05;
    gl_FragColor = vec4(waterColor, 1.0);
  }
`);

// 扩展react-three-fiber以包含新的材质类型
class WaterMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        // 其他可能需要的uniforms
      },
      vertexShader,
      fragmentShader,
      // 其他材质属性
    });
  }
}
extend({ WaterMaterial });

const Sphere = () => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.y += 0.005; // 让球体旋转
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime(); // 更新时间uniform
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <waterMaterial ref={materialRef} />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas
      style={{
        background: 'linear-gradient(rgb(8, 23, 39),rgb(24, 62, 103)) ',
        width: '100vw',
        height: '100vh',
      }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Sphere />
    </Canvas>
  );
}

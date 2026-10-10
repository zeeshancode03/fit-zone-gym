import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Dumbbell() {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (!g) return;
    target.current.y = state.pointer.x * 0.9 + state.clock.elapsedTime * 0.25;
    target.current.x = -state.pointer.y * 0.4;
    const k = 4;
    const a = 1 - Math.exp(-k * dt);
    g.rotation.y += (target.current.y - g.rotation.y) * a;
    g.rotation.x += (target.current.x - g.rotation.x) * a;
  });

  const steel = (
    <meshStandardMaterial color="#c9ced6" metalness={1} roughness={0.22} />
  );
  const dark = <meshStandardMaterial color="#1a1c1a" metalness={0.8} roughness={0.35} />;

  return (
    <group ref={group} rotation={[0.2, 0.4, 0.35]} scale={0.8}>
      <mesh castShadow>
        <cylinderGeometry args={[0.16, 0.16, 4.4, 32]} />
        {steel}
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s} position={[0, s * 1.5, 0]}>
          <mesh>
            <cylinderGeometry args={[0.95, 0.95, 0.42, 48]} />
            {dark}
          </mesh>
          <mesh position={[0, s * 0.34, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.3, 48]} />
            {dark}
          </mesh>
          <mesh>
            <torusGeometry args={[0.95, 0.045, 12, 64]} />
            <meshStandardMaterial
              color="#39ff14"
              emissive="#39ff14"
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Motes() {
  const pts = useRef<THREE.Points>(null);
  const positions = new Float32Array(600 * 3);
  for (let i = 0; i < 600; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    if (pts.current) pts.current.rotation.y += dt * 0.05;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ccff00"
        transparent
        opacity={0.7}
        toneMapped={false}
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 6]} intensity={2.2} color="#eaffd0" />
      <pointLight position={[-6, -2, 4]} intensity={40} color="#39ff14" />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.8}>
          <Dumbbell />
        </Float>
        <Motes />
        <Environment>
          <Lightformer intensity={3} position={[0, 5, 2]} scale={[10, 6, 1]} />
          <Lightformer
            intensity={2}
            color="#39ff14"
            position={[-6, 1, -2]}
            rotation-y={Math.PI / 2}
            scale={[20, 2, 1]}
          />
          <Lightformer
            intensity={1.5}
            color="#ccff00"
            position={[6, -2, 2]}
            rotation-y={-Math.PI / 2}
            scale={[20, 2, 1]}
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

export default HeroScene;

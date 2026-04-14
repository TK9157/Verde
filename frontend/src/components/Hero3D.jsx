import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Mouse / Touch Tracker ─── */
function usePointer() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setPointer({ x, y });
    };
    const onTouch = (e) => {
      if (e.touches.length > 0) {
        const x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        const y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        setPointer({ x, y });
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);
  return pointer;
}

/* ─── Abstract Fashion Mannequin ─── */
function Mannequin({ pointer }) {
  const group = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    targetRotation.current.y = pointer.x * 0.3;
    targetRotation.current.x = pointer.y * 0.15;
    group.current.rotation.y += (targetRotation.current.y - group.current.rotation.y) * 2 * delta;
    group.current.rotation.x += (targetRotation.current.x - group.current.rotation.x) * 2 * delta;
  });

  const darkMat = useMemo(() => (
    <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
  ), []);

  const chromeMat = useMemo(() => (
    <meshStandardMaterial color="#333333" roughness={0.1} metalness={1} envMapIntensity={2} />
  ), []);

  return (
    <group ref={group} position={[0, -0.5, 0]} scale={1.1}>
      {/* Head */}
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        {chromeMat}
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.35, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.25, 16]} />
        {darkMat}
      </mesh>

      {/* Torso upper */}
      <mesh position={[0, 1.7, 0]}>
        <boxGeometry args={[0.95, 1.0, 0.45]} />
        {darkMat}
      </mesh>

      {/* Torso lower */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.75, 0.55, 0.38]} />
        {darkMat}
      </mesh>

      {/* Left shoulder */}
      <mesh position={[-0.65, 2.1, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        {chromeMat}
      </mesh>

      {/* Right shoulder */}
      <mesh position={[0.65, 2.1, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        {chromeMat}
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.72, 1.5, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.1, 0.08, 1.0, 12]} />
        {darkMat}
      </mesh>

      {/* Right arm */}
      <mesh position={[0.72, 1.5, 0]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.1, 0.08, 1.0, 12]} />
        {darkMat}
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.22, -0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 1.6, 12]} />
        {darkMat}
      </mesh>

      {/* Right leg */}
      <mesh position={[0.22, -0.1, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 1.6, 12]} />
        {darkMat}
      </mesh>

      {/* Left shoe */}
      <mesh position={[-0.22, -0.95, 0.08]}>
        <boxGeometry args={[0.2, 0.12, 0.38]} />
        {chromeMat}
      </mesh>

      {/* Right shoe */}
      <mesh position={[0.22, -0.95, 0.08]}>
        <boxGeometry args={[0.2, 0.12, 0.38]} />
        {chromeMat}
      </mesh>
    </group>
  );
}

/* ─── Floating Fabric Strips ─── */
function FabricStrips({ pointer }) {
  const strips = useRef([]);
  const count = 8;
  
  const stripData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3 - 1
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: 0.3 + Math.random() * 0.7,
      speed: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <>
      {stripData.map((strip, i) => (
        <Float
          key={i}
          speed={strip.speed}
          rotationIntensity={0.5}
          floatIntensity={0.8}
          floatingRange={[-0.3, 0.3]}
        >
          <mesh
            position={strip.position}
            rotation={strip.rotation}
            scale={strip.scale}
          >
            <planeGeometry args={[0.08, 1.2, 1, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#1a1a1a' : '#e0e0e0'}
              side={THREE.DoubleSide}
              roughness={0.6}
              metalness={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ─── Floating Particles ─── */
function Particles() {
  const count = 50;
  const mesh = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#999999" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ─── Geometric Accent Shapes ─── */
function AccentShapes({ pointer }) {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state, delta) => {
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.2;
      ring1.current.rotation.z += delta * 0.1;
      ring1.current.position.x = pointer.x * 0.5;
    }
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.15;
      ring2.current.rotation.z -= delta * 0.1;
      ring2.current.position.x = -pointer.x * 0.3;
    }
  });

  return (
    <>
      <mesh ref={ring1} position={[-2.5, 1.5, -2]}>
        <torusGeometry args={[0.6, 0.03, 16, 48]} />
        <meshStandardMaterial color="#333" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh ref={ring2} position={[2.8, -0.5, -1.5]}>
        <torusGeometry args={[0.4, 0.02, 16, 48]} />
        <meshStandardMaterial color="#555" roughness={0.3} metalness={0.9} />
      </mesh>
    </>
  );
}

/* ─── 3D Scene ─── */
function Scene() {
  const pointer = usePointer();

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, -3]} intensity={0.4} color="#e0e0e0" />
      <pointLight position={[0, 5, 3]} intensity={0.6} color="#ffffff" />

      <Mannequin pointer={pointer} />
      <FabricStrips pointer={pointer} />
      <Particles />
      <AccentShapes pointer={pointer} />

      <Environment preset="studio" />
    </>
  );
}

/* ─── Exported Component ─── */
export default function Hero3D() {
  return (
    <div className="hero3d-canvas-wrap">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

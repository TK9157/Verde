import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
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

/* ─── Realistic Human Body using LatheGeometry for organic curves ─── */
function HumanTorso() {
  const geometry = useMemo(() => {
    // Create a torso profile using lathe geometry (revolving a curve)
    const points = [];
    // From bottom of torso (waist) to top (shoulders)
    points.push(new THREE.Vector2(0.28, 0));     // waist
    points.push(new THREE.Vector2(0.30, 0.08));
    points.push(new THREE.Vector2(0.32, 0.15));
    points.push(new THREE.Vector2(0.35, 0.25));  // lower ribcage
    points.push(new THREE.Vector2(0.40, 0.40));  // chest
    points.push(new THREE.Vector2(0.42, 0.50));  // chest peak
    points.push(new THREE.Vector2(0.40, 0.58));
    points.push(new THREE.Vector2(0.35, 0.65));  // upper chest
    points.push(new THREE.Vector2(0.28, 0.72));  // shoulders start
    points.push(new THREE.Vector2(0.20, 0.78));
    points.push(new THREE.Vector2(0.14, 0.82));  // neck base
    points.push(new THREE.Vector2(0.10, 0.86));  // neck
    points.push(new THREE.Vector2(0.09, 0.92));
    points.push(new THREE.Vector2(0.00, 0.92));  // close

    return new THREE.LatheGeometry(points, 32);
  }, []);

  return (
    <mesh geometry={geometry} position={[0, -0.1, 0]} scale={[1.15, 1.3, 0.75]}>
      <meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.6} />
    </mesh>
  );
}

/* ─── Realistic Head ─── */
function HumanHead() {
  const headGeo = useMemo(() => {
    // Ellipsoid-like head using scaled sphere
    return new THREE.SphereGeometry(0.17, 32, 24);
  }, []);

  const jawGeo = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0.00, 0));
    points.push(new THREE.Vector2(0.10, 0.02));
    points.push(new THREE.Vector2(0.14, 0.06));
    points.push(new THREE.Vector2(0.15, 0.10));
    points.push(new THREE.Vector2(0.13, 0.14));
    points.push(new THREE.Vector2(0.08, 0.17));
    points.push(new THREE.Vector2(0.00, 0.18));
    return new THREE.LatheGeometry(points, 24);
  }, []);

  return (
    <group position={[0, 1.32, 0]}>
      {/* Cranium */}
      <mesh geometry={headGeo} scale={[1, 1.15, 0.95]}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.25} metalness={0.7} />
      </mesh>
      {/* Jaw / chin */}
      <mesh geometry={jawGeo} position={[0, -0.22, 0.02]} scale={[1, 0.7, 0.9]}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.25} metalness={0.7} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.16, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Realistic Arm ─── */
function HumanArm({ side = 'left' }) {
  const flip = side === 'left' ? -1 : 1;

  const upperArm = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.06, 0.02));
    points.push(new THREE.Vector2(0.065, 0.15));
    points.push(new THREE.Vector2(0.06, 0.35));
    points.push(new THREE.Vector2(0.05, 0.42));
    points.push(new THREE.Vector2(0, 0.44));
    return new THREE.LatheGeometry(points, 12);
  }, []);

  const forearm = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.05, 0.02));
    points.push(new THREE.Vector2(0.048, 0.18));
    points.push(new THREE.Vector2(0.04, 0.35));
    points.push(new THREE.Vector2(0.035, 0.38));
    points.push(new THREE.Vector2(0, 0.40));
    return new THREE.LatheGeometry(points, 12);
  }, []);

  return (
    <group position={[flip * 0.46, 0.95, 0]}>
      {/* Shoulder */}
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Upper arm */}
      <mesh geometry={upperArm} position={[0, -0.42, 0]} rotation={[0, 0, flip * 0.08]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Elbow */}
      <mesh position={[flip * 0.02, -0.42, 0.01]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Forearm */}
      <mesh geometry={forearm} position={[flip * 0.02, -0.82, 0.01]}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Hand */}
      <group position={[flip * 0.02, -0.84, 0.01]}>
        <mesh>
          <boxGeometry args={[0.06, 0.09, 0.03]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Fingers */}
        {[0, 1, 2, 3].map(i => (
          <mesh key={i} position={[(i - 1.5) * 0.014, -0.065, 0]}>
            <boxGeometry args={[0.01, 0.05, 0.015]} />
            <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ─── Realistic Leg ─── */
function HumanLeg({ side = 'left' }) {
  const flip = side === 'left' ? -1 : 1;

  const thigh = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.10, 0.02));
    points.push(new THREE.Vector2(0.098, 0.12));
    points.push(new THREE.Vector2(0.09, 0.30));
    points.push(new THREE.Vector2(0.075, 0.45));
    points.push(new THREE.Vector2(0.06, 0.52));
    points.push(new THREE.Vector2(0, 0.55));
    return new THREE.LatheGeometry(points, 16);
  }, []);

  const calf = useMemo(() => {
    const points = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.065, 0.02));
    points.push(new THREE.Vector2(0.06, 0.10));
    points.push(new THREE.Vector2(0.055, 0.25));
    points.push(new THREE.Vector2(0.04, 0.42));
    points.push(new THREE.Vector2(0.035, 0.48));
    points.push(new THREE.Vector2(0, 0.50));
    return new THREE.LatheGeometry(points, 16);
  }, []);

  return (
    <group position={[flip * 0.16, -0.1, 0]}>
      {/* Hip joint */}
      <mesh>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Thigh */}
      <mesh geometry={thigh} position={[0, -0.55, 0]}>
        <meshStandardMaterial color="#111" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Knee */}
      <mesh position={[0, -0.55, 0.02]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Calf */}
      <mesh geometry={calf} position={[0, -1.05, 0]}>
        <meshStandardMaterial color="#111" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Shoe */}
      <group position={[0, -1.08, 0.06]}>
        <mesh>
          <boxGeometry args={[0.1, 0.06, 0.22]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.15} metalness={0.9} />
        </mesh>
        {/* Sole */}
        <mesh position={[0, -0.04, 0.01]}>
          <boxGeometry args={[0.11, 0.025, 0.24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Full Fashion Model ─── */
function FashionModel({ pointer }) {
  const group = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!group.current) return;
    targetRotation.current.y = pointer.x * 0.25;
    targetRotation.current.x = pointer.y * 0.08;
    group.current.rotation.y += (targetRotation.current.y - group.current.rotation.y) * 2.5 * delta;
    group.current.rotation.x += (targetRotation.current.x - group.current.rotation.x) * 2.5 * delta;

    // Subtle idle sway
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
  });

  return (
    <group ref={group} position={[0, -0.8, 0]} scale={1.75}>
      <HumanHead />
      <HumanTorso />
      <HumanArm side="left" />
      <HumanArm side="right" />
      <HumanLeg side="left" />
      <HumanLeg side="right" />
    </group>
  );
}

/* ─── Floating Fabric Strips ─── */
function FabricStrips() {
  const stripData = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3 - 2
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: 0.3 + Math.random() * 0.6,
      speed: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <>
      {stripData.map((strip, i) => (
        <Float
          key={i}
          speed={strip.speed}
          rotationIntensity={0.4}
          floatIntensity={0.6}
          floatingRange={[-0.2, 0.2]}
        >
          <mesh position={strip.position} rotation={strip.rotation} scale={strip.scale}>
            <planeGeometry args={[0.06, 1.5, 1, 10]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#111' : i % 3 === 1 ? '#ddd' : '#333'}
              side={THREE.DoubleSide}
              roughness={0.5}
              metalness={0.2}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ─── Floating Particles ─── */
function Particles() {
  const count = 40;
  const mesh = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#888" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ─── Accent Rings ─── */
function AccentRings({ pointer }) {
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state, delta) => {
    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.15;
      ring1.current.rotation.z += delta * 0.08;
      ring1.current.position.x = -2.8 + pointer.x * 0.4;
    }
    if (ring2.current) {
      ring2.current.rotation.y += delta * 0.12;
      ring2.current.rotation.z -= delta * 0.08;
      ring2.current.position.x = 3 - pointer.x * 0.3;
    }
  });

  return (
    <>
      <mesh ref={ring1} position={[-2.8, 1.5, -2]}>
        <torusGeometry args={[0.5, 0.02, 16, 48]} />
        <meshStandardMaterial color="#333" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh ref={ring2} position={[3, -1, -1.5]}>
        <torusGeometry args={[0.35, 0.015, 16, 48]} />
        <meshStandardMaterial color="#555" roughness={0.2} metalness={0.9} />
      </mesh>
    </>
  );
}

/* ─── 3D Scene ─── */
function Scene() {
  const pointer = usePointer();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.3} color="#e8e8e8" />
      <spotLight position={[0, 6, 4]} intensity={0.8} angle={0.4} penumbra={0.5} color="#ffffff" />
      <pointLight position={[-2, 2, 3]} intensity={0.3} color="#f0f0f0" />

      <FashionModel pointer={pointer} />
      <FabricStrips />
      <Particles />
      <AccentRings pointer={pointer} />

      <Environment preset="studio" />
    </>
  );
}

/* ─── Exported Component ─── */
export default function Hero3D() {
  return (
    <div className="hero3d-canvas-wrap">
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

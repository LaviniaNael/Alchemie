import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GlassBottle({ position, scale = 1, rotationSpeed = 0.2, geometry }: {
  position: [number, number, number]
  scale?: number
  rotationSpeed?: number
  geometry: 'cylinder' | 'sphere' | 'cone'
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed
    meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05
  })

  const geo = () => {
    switch (geometry) {
      case 'cylinder':
        return <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />
      case 'cone':
        return <coneGeometry args={[0.4, 1.0, 32]} />
      default:
        return <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
    }
  }

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geo()}
      <meshPhysicalMaterial
        color="#050505"
        metalness={0.1}
        roughness={0.08}
        transmission={0.95}
        thickness={2.5}
        ior={1.65}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        attenuationColor={new THREE.Color('#32E0C4')}
        attenuationDistance={2.0}
        transparent
      />
    </mesh>
  )
}

export default function GlassBottles() {
  return (
    <group>
      <GlassBottle
        position={[0, 0, 0]}
        scale={1.2}
        rotationSpeed={0.15}
        geometry="cylinder"
      />
      <GlassBottle
        position={[1.2, -0.3, -0.5]}
        scale={0.9}
        rotationSpeed={0.2}
        geometry="sphere"
      />
      <GlassBottle
        position={[-1.0, 0.2, -0.8]}
        scale={1.0}
        rotationSpeed={0.12}
        geometry="cone"
      />
    </group>
  )
}

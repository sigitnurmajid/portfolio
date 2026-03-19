import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Mesh } from 'three'

function WireShape({
  geometry,
  position,
  color,
  speed = 0.3,
  scale = 1,
}: {
  geometry: 'icosahedron' | 'octahedron' | 'torus'
  position: [number, number, number]
  color: string
  speed?: number
  scale?: number
}) {
  const ref = useRef<Mesh>(null!)

  useFrame((_state, delta) => {
    ref.current.rotation.x += delta * speed * 0.5
    ref.current.rotation.z += delta * speed * 0.3
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        {geometry === 'torus' && <torusGeometry args={[0.8, 0.3, 8, 16]} />}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  )
}

export default function FloatingGeometry() {
  return (
    <>
      <WireShape
        geometry="icosahedron"
        position={[-3, 1.5, -2]}
        color="#3b82f6"
        speed={0.2}
        scale={1.2}
      />
      <WireShape
        geometry="octahedron"
        position={[3, -1, -3]}
        color="#5eead4"
        speed={0.3}
        scale={0.9}
      />
      <WireShape
        geometry="torus"
        position={[1, 2.5, -4]}
        color="#8b5cf6"
        speed={0.15}
        scale={1}
      />
      <WireShape
        geometry="icosahedron"
        position={[-1.5, -2, -1.5]}
        color="#3b82f6"
        speed={0.25}
        scale={0.7}
      />
    </>
  )
}

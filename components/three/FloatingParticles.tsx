import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { Points as ThreePoints } from 'three'

export default function FloatingParticles() {
  const ref = useRef<ThreePoints>(null!)

  const positions = useMemo(() => {
    const count = 180
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      // Distribute in a sphere of radius ~4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.cbrt(Math.random()) * 4
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_state, delta) => {
    ref.current.rotation.y += delta * 0.03
    ref.current.rotation.x += delta * 0.01
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#5eead4"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, MathUtils } from 'three'

export default function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null!)

  useFrame((state) => {
    group.current.rotation.x = MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.05,
      0.1
    )
    group.current.rotation.y = MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.05,
      0.1
    )
  })

  return <group ref={group}>{children}</group>
}

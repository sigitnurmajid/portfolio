import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import PCBCloudScene from './PCBCloudScene'

export default function PCBHeroCanvas() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="absolute inset-0"
    >
      <Canvas
        camera={{ position: [0, 1.5, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <AdaptiveDpr pixelated />
        <PCBCloudScene />
        <Preload all />
      </Canvas>
    </div>
  )
}

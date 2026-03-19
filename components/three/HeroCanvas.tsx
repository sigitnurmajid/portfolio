import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import TelemetryUniverse from './TelemetryUniverse'

export default function HeroCanvas() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="absolute inset-0"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <AdaptiveDpr pixelated />
        <TelemetryUniverse />
        <Preload all />
      </Canvas>
    </div>
  )
}

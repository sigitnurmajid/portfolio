import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import ParallaxRig from './ParallaxRig'
import FloatingParticles from './FloatingParticles'
import FloatingGeometry from './FloatingGeometry'

export default function BackgroundScene() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <AdaptiveDpr pixelated />
        <fog attach="fog" args={['#030712', 5, 15]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 4]} intensity={0.6} color="#3b82f6" />
        <pointLight position={[-3, -2, 3]} intensity={0.3} color="#5eead4" />
        <ParallaxRig>
          <FloatingParticles />
          <FloatingGeometry />
        </ParallaxRig>
        <Preload all />
      </Canvas>
    </div>
  )
}

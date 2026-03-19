import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import {
  Mesh,
  Group,
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  Color,
  Points as ThreePoints,
  Line as ThreeLine,
  LineBasicMaterial,
  BackSide,
  AdditiveBlending,
} from 'three'

// ─── Earth Core (Central Backend Brain) ─────────────────────────
function EarthCore() {
  const meshRef = useRef<Mesh>(null!)
  const glowRef = useRef<Mesh>(null!)
  const atmosphereRef = useRef<Mesh>(null!)
  const texture = useTexture('/textures/earth.jpg')

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.y = t * 0.08
    // Pulsing atmosphere
    const scale = 1 + Math.sin(t * 1.2) * 0.02
    glowRef.current.scale.setScalar(scale * 0.72)
    atmosphereRef.current.scale.setScalar(scale * 0.74)
  })

  return (
    <group>
      {/* Earth globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Inner glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.6}
          transparent
          opacity={0.06}
          side={BackSide}
        />
      </mesh>
      {/* Atmosphere rim */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#22d3ee"
          emissiveIntensity={0.4}
          transparent
          opacity={0.04}
          side={BackSide}
        />
      </mesh>
      <pointLight color="#0ea5e9" intensity={1.5} distance={8} />
    </group>
  )
}

// ─── Orbiting Planet Nodes (IoT Devices) ────────────────────────
interface PlanetNodeConfig {
  texture: string
  radius: number
  speed: number
  offset: number
  tilt: number
  size: number
  emissiveColor: string
}

const PLANET_CONFIGS: PlanetNodeConfig[] = [
  { texture: '/textures/mars.jpg', radius: 2.0, speed: 0.25, offset: 0, tilt: 0.15, size: 0.14, emissiveColor: '#ef4444' },
  { texture: '/textures/jupiter.jpg', radius: 2.8, speed: 0.15, offset: 1.2, tilt: -0.2, size: 0.22, emissiveColor: '#f59e0b' },
  { texture: '/textures/saturn.jpg', radius: 3.5, speed: 0.1, offset: 2.8, tilt: 0.35, size: 0.18, emissiveColor: '#eab308' },
  { texture: '/textures/neptune.jpg', radius: 2.4, speed: 0.2, offset: 3.8, tilt: -0.1, size: 0.12, emissiveColor: '#3b82f6' },
  { texture: '/textures/moon.jpg', radius: 1.4, speed: 0.4, offset: 1.0, tilt: 0.05, size: 0.08, emissiveColor: '#94a3b8' },
]

function PlanetNode({ config }: { config: PlanetNodeConfig }) {
  const meshRef = useRef<Mesh>(null!)
  const texture = useTexture(config.texture)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const angle = t * config.speed + config.offset
    meshRef.current.position.x = Math.cos(angle) * config.radius
    meshRef.current.position.z = Math.sin(angle) * config.radius
    meshRef.current.position.y = Math.sin(angle * 0.5 + config.tilt) * config.radius * 0.25
    meshRef.current.rotation.y += 0.005
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[config.size, 16, 16]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.7}
        metalness={0.1}
        emissive={config.emissiveColor}
        emissiveIntensity={0.15}
      />
    </mesh>
  )
}

function OrbitingPlanets() {
  return (
    <group>
      {PLANET_CONFIGS.map((cfg, i) => (
        <PlanetNode key={i} config={cfg} />
      ))}
    </group>
  )
}

// ─── Saturn Ring ─────────────────────────────────────────────────
function SaturnRing() {
  const ringRef = useRef<Mesh>(null!)
  const ringTexture = useTexture('/textures/saturn_ring.png')

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Follow Saturn's position (index 2 in PLANET_CONFIGS)
    const cfg = PLANET_CONFIGS[2]
    const angle = t * cfg.speed + cfg.offset
    ringRef.current.position.x = Math.cos(angle) * cfg.radius
    ringRef.current.position.z = Math.sin(angle) * cfg.radius
    ringRef.current.position.y = Math.sin(angle * 0.5 + cfg.tilt) * cfg.radius * 0.25
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI * 0.45, 0, 0]}>
      <ringGeometry args={[0.22, 0.35, 32]} />
      <meshStandardMaterial
        map={ringTexture}
        transparent
        opacity={0.6}
        side={2}
        roughness={0.8}
      />
    </mesh>
  )
}

// ─── Orbit Path Lines ───────────────────────────────────────────
function OrbitRing({ radius, tilt, color }: { radius: number; tilt: number; color: string }) {
  const lineRef = useRef<any>(null!)

  const geometry = useMemo(() => {
    const pts: number[] = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push(
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5 + tilt) * radius * 0.25,
        Math.sin(angle) * radius
      )
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(pts, 3))
    return geo
  }, [radius, tilt])

  const material = useMemo(() => {
    return new LineBasicMaterial({ color, transparent: true, opacity: 0.08 })
  }, [color])

  const lineObj = useMemo(() => {
    return new ThreeLine(geometry, material)
  }, [geometry, material])

  return <primitive ref={lineRef} object={lineObj} />
}

function OrbitRings() {
  return (
    <>
      <OrbitRing radius={1.4} tilt={0.05} color="#94a3b8" />
      <OrbitRing radius={2.0} tilt={0.15} color="#ef4444" />
      <OrbitRing radius={2.4} tilt={-0.1} color="#3b82f6" />
      <OrbitRing radius={2.8} tilt={-0.2} color="#f59e0b" />
      <OrbitRing radius={3.5} tilt={0.35} color="#eab308" />
    </>
  )
}

// ─── Data Stream Particles ──────────────────────────────────────
const PARTICLE_COUNT = 80

function DataStreamParticles() {
  const pointsRef = useRef<ThreePoints>(null!)

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    const vel = new Float32Array(PARTICLE_COUNT)

    const palette = [
      new Color('#22d3ee'),
      new Color('#3b82f6'),
      new Color('#8b5cf6'),
      new Color('#06b6d4'),
      new Color('#0ea5e9'),
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.5 + Math.random() * 2.5
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5
      pos[i * 3 + 2] = Math.sin(angle) * radius
      vel[i] = 0.4 + Math.random() * 0.8
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, velocities: vel, colors: col }
  }, [])

  useFrame((_state, delta) => {
    const posAttr = pointsRef.current.geometry.attributes.position
    const arr = posAttr.array as Float32Array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      const iy = i * 3 + 1
      const iz = i * 3 + 2

      const dx = -arr[ix]
      const dy = -arr[iy]
      const dz = -arr[iz]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (dist < 0.5) {
        const angle = Math.random() * Math.PI * 2
        const radius = 1.5 + Math.random() * 2.5
        arr[ix] = Math.cos(angle) * radius
        arr[iy] = (Math.random() - 0.5) * 1.5
        arr[iz] = Math.sin(angle) * radius
      } else {
        const speed = velocities[i] * delta
        arr[ix] += (dx / dist) * speed
        arr[iy] += (dy / dist) * speed
        arr[iz] += (dz / dist) * speed
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

// ─── Space Skybox (Stars Milky Way) ─────────────────────────────
function SpaceSkybox() {
  const texture = useTexture('/textures/stars.jpg')
  const ref = useRef<Mesh>(null!)

  useFrame((_state, delta) => {
    ref.current.rotation.y += delta * 0.003
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[12, 32, 32]} />
      <meshBasicMaterial map={texture} side={BackSide} transparent opacity={0.4} />
    </mesh>
  )
}

// ─── Mouse Parallax Camera Rig ──────────────────────────────────
function CameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    camera.position.x = MathUtils.lerp(
      camera.position.x,
      state.pointer.x * 0.5,
      0.05
    )
    camera.position.y = MathUtils.lerp(
      camera.position.y,
      state.pointer.y * 0.3,
      0.05
    )
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Main Export ─────────────────────────────────────────────────
export default function TelemetryUniverse() {
  return (
    <>
      <fog attach="fog" args={['#030712', 7, 18]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-4, 2, -3]} intensity={0.3} color="#8b5cf6" />
      <SpaceSkybox />
      <EarthCore />
      <OrbitingPlanets />
      <SaturnRing />
      <OrbitRings />
      <DataStreamParticles />
      <CameraRig />
    </>
  )
}

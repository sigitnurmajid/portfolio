import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  Group,
  InstancedMesh,
  Object3D,
  BufferGeometry,
  Float32BufferAttribute,
  MathUtils,
  Color,
  AdditiveBlending,
  Line as ThreeLine,
  LineBasicMaterial,
  Points as ThreePoints,
} from 'three'

// ─── Scene Constants ─────────────────────────────────────────────────────────
const BOARD_Z = 0.032 // height above board for traces/components
const CYAN = '#22d3ee'
const PURPLE = '#8b5cf6'
const COPPER = '#b5651d'
const GOLD = '#ffd700'

// ─── Trace definitions: [x1, y1, x2, y2] in board local space ────────────────
const TRACE_SEGS: [number, number, number, number][] = [
  // Horizontals
  [-1.8, 0.85, -0.38, 0.85],
  [0.38, 0.85, 1.8, 0.85],
  [-1.8, 0.45, 1.8, 0.45],
  [-1.8, 0.05, -0.7, 0.05],
  [0.7, 0.05, 1.8, 0.05],
  [-1.8, -0.35, -0.05, -0.35],
  [0.05, -0.35, 1.8, -0.35],
  [-1.4, -0.75, -0.38, -0.75],
  [0.38, -0.75, 1.4, -0.75],
  [-0.9, -1.05, 0.9, -1.05],
  // Verticals
  [-1.5, 1.1, -1.5, -1.1],
  [-0.9, 1.1, -0.9, 0.45],
  [-0.9, 0.05, -0.9, -1.1],
  [0.0, 1.1, 0.0, 0.85],
  [0.0, 0.25, 0.0, -1.1],
  [0.9, 1.1, 0.9, 0.45],
  [0.9, 0.05, 0.9, -1.1],
  [1.5, 1.1, 1.5, -1.1],
  // L-connectors
  [-1.5, 0.85, -0.9, 0.85],
  [0.9, 0.45, 1.5, 0.45],
  [-1.5, -0.35, -0.9, -0.35],
  [0.9, -0.35, 1.5, -0.35],
  [-1.5, -0.75, -0.9, -0.75],
  [0.9, -0.75, 1.5, -0.75],
  // Mini branches
  [-0.5, 0.85, -0.5, 0.45],
  [0.5, 0.85, 0.5, 0.45],
  [-0.5, -0.35, -0.5, -0.75],
  [0.5, -0.35, 0.5, -0.75],
  [-1.5, 0.45, -1.5, 0.05],
  [1.5, 0.45, 1.5, 0.05],
]

// Via hole positions [x, y]
const VIA_POS: [number, number][] = [
  [-1.5, 0.85], [-1.5, 0.45], [-1.5, 0.05], [-1.5, -0.35], [-1.5, -0.75],
  [-0.9, 0.45], [-0.9, 0.05], [-0.9, -0.35],
  [-0.5, 0.85], [-0.5, 0.45],
  [0.0, 0.85], [0.0, -0.35], [0.0, -0.75],
  [0.5, 0.85], [0.5, 0.45],
  [0.9, 0.45], [0.9, 0.05], [0.9, -0.35],
  [1.5, 0.85], [1.5, 0.45], [1.5, 0.05], [1.5, -0.35], [1.5, -0.75],
]

// IC chip definitions: [cx, cy, width, height]
const IC_DEFS: [number, number, number, number][] = [
  [-1.1, 0.65, 0.55, 0.3],
  [0.0, 0.25, 0.52, 0.28],
  [1.1, 0.65, 0.5, 0.28],
  [-0.45, -0.55, 0.4, 0.2],
  [0.45, -0.55, 0.4, 0.2],
]

// Resistor positions [x, y]
const RES_POS: [number, number][] = [
  [-1.15, -0.88], [0.0, -0.88], [1.15, -0.88],
  [-1.15, 0.05], [1.15, 0.05],
]

// Capacitor positions [x, y]
const CAP_POS: [number, number][] = [
  [0.38, 0.85], [-0.38, 0.85], [-0.38, -0.35], [0.38, -0.35],
]

// ─── Cloud sphere config ──────────────────────────────────────────────────────
const CLOUD_SPHERES: [number, number, number, number][] = [
  // [lx, ly, lz, radius] in cloud local space
  [-0.55, 0.0, 0.1, 0.44],
  [0.0, 0.0, 0.0, 0.55],
  [0.55, 0.0, 0.1, 0.44],
  [-0.35, 0.38, 0.0, 0.3],
  [0.0, 0.46, 0.0, 0.37],
  [0.35, 0.38, 0.0, 0.3],
  [-0.7, -0.08, 0.05, 0.28],
  [0.7, -0.08, 0.05, 0.28],
]

// World-space beam start positions (on main PCB surface)
const BEAM_STARTS: [number, number, number][] = [
  [-1.5, 0.35, 0.05],
  [0.0, 0.35, 0.05],
  [1.5, 0.35, 0.05],
]
const CLOUD_CENTER: [number, number, number] = [0, 4.8, -0.8]

// ─── Star Field ──────────────────────────────────────────────────────────────
function StarField() {
  const count = 600
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = -5 - Math.random() * 10
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#a0c8ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// ─── PCB Trace Lines + Data Packets ──────────────────────────────────────────
function PCBTraces({ scale = 1 }: { scale?: number }) {
  const pointsRef = useRef<ThreePoints>(null!)

  const lineObjects = useMemo(() => {
    return TRACE_SEGS.map((seg) => {
      const pts = new Float32Array([
        seg[0] * scale, seg[1] * scale, BOARD_Z,
        seg[2] * scale, seg[3] * scale, BOARD_Z,
      ])
      const geo = new BufferGeometry()
      geo.setAttribute('position', new Float32BufferAttribute(pts, 3))
      const mat = new LineBasicMaterial({
        color: COPPER,
        transparent: true,
        opacity: 0.85,
      })
      return new ThreeLine(geo, mat)
    })
  }, [scale])

  // Data packets: 2 per trace segment
  const PACKETS_PER_TRACE = 2
  const TOTAL_PACKETS = TRACE_SEGS.length * PACKETS_PER_TRACE

  const { packetPositions, packetTraceIdx } = useMemo(() => {
    const positions = new Float32Array(TOTAL_PACKETS * 3)
    const traceIdx = new Uint8Array(TOTAL_PACKETS)
    for (let i = 0; i < TOTAL_PACKETS; i++) {
      traceIdx[i] = Math.floor(i / PACKETS_PER_TRACE)
    }
    return { packetPositions: positions, packetTraceIdx: traceIdx }
  }, [TOTAL_PACKETS])

  const progressRef = useRef<Float32Array>(null!)
  if (!progressRef.current) {
    const arr = new Float32Array(TOTAL_PACKETS)
    for (let i = 0; i < TOTAL_PACKETS; i++) {
      arr[i] = (i % PACKETS_PER_TRACE) / PACKETS_PER_TRACE
    }
    progressRef.current = arr
  }

  useFrame((_, delta) => {
    const SPEED = 0.38
    const prog = progressRef.current
    const pos = packetPositions

    for (let i = 0; i < TOTAL_PACKETS; i++) {
      prog[i] = (prog[i] + delta * SPEED) % 1
      const seg = TRACE_SEGS[packetTraceIdx[i]]
      const p = prog[i]
      pos[i * 3]     = MathUtils.lerp(seg[0], seg[2], p) * scale
      pos[i * 3 + 1] = MathUtils.lerp(seg[1], seg[3], p) * scale
      pos[i * 3 + 2] = BOARD_Z + 0.008
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[packetPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color={CYAN}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </>
  )
}

// ─── PCB Via Holes (instanced) ────────────────────────────────────────────────
function PCBVias({ scale = 1 }: { scale?: number }) {
  const meshRef = useRef<InstancedMesh>(null!)

  useEffect(() => {
    const dummy = new Object3D()
    VIA_POS.forEach(([vx, vy], i) => {
      dummy.position.set(vx * scale, vy * scale, BOARD_Z)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [scale])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, VIA_POS.length]}>
      <cylinderGeometry args={[0.028 * scale, 0.028 * scale, 0.06, 8]} />
      <meshStandardMaterial
        color={GOLD}
        emissive={CYAN}
        emissiveIntensity={0.6}
        metalness={0.95}
        roughness={0.1}
      />
    </instancedMesh>
  )
}

// ─── PCB Components (ICs, resistors, capacitors) ──────────────────────────────
function PCBComponents({ scale = 1 }: { scale?: number }) {
  return (
    <group>
      {/* IC Chips */}
      {IC_DEFS.map(([cx, cy, w, h], i) => (
        <group key={`ic-${i}`} position={[cx * scale, cy * scale, BOARD_Z + 0.01]}>
          {/* Main chip body */}
          <mesh>
            <boxGeometry args={[w * scale, h * scale, 0.04]} />
            <meshStandardMaterial color="#111118" roughness={0.6} metalness={0.2} />
          </mesh>
          {/* Top label silkscreen */}
          <mesh position={[0, 0, 0.021]}>
            <boxGeometry args={[w * scale * 0.8, h * scale * 0.6, 0.002]} />
            <meshStandardMaterial
              color={CYAN}
              emissive={CYAN}
              emissiveIntensity={0.3}
              roughness={1}
            />
          </mesh>
          {/* Pins left side */}
          {Array.from({ length: 4 }).map((_, pi) => (
            <mesh
              key={`lpin-${pi}`}
              position={[
                (-w * scale) / 2 - 0.018 * scale,
                ((pi - 1.5) * h * scale) / 3.5,
                0.0,
              ]}
            >
              <boxGeometry args={[0.032 * scale, 0.018 * scale, 0.02]} />
              <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.1} />
            </mesh>
          ))}
          {/* Pins right side */}
          {Array.from({ length: 4 }).map((_, pi) => (
            <mesh
              key={`rpin-${pi}`}
              position={[
                (w * scale) / 2 + 0.018 * scale,
                ((pi - 1.5) * h * scale) / 3.5,
                0.0,
              ]}
            >
              <boxGeometry args={[0.032 * scale, 0.018 * scale, 0.02]} />
              <meshStandardMaterial color={GOLD} metalness={0.95} roughness={0.1} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Resistors */}
      {RES_POS.map(([rx, ry], i) => (
        <group key={`res-${i}`} position={[rx * scale, ry * scale, BOARD_Z + 0.006]}>
          <mesh>
            <boxGeometry args={[0.22 * scale, 0.07 * scale, 0.035]} />
            <meshStandardMaterial color="#2a1a00" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <boxGeometry args={[0.12 * scale, 0.04 * scale, 0.002]} />
            <meshStandardMaterial color="#8b6914" roughness={0.5} metalness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Capacitors */}
      {CAP_POS.map(([capx, capy], i) => (
        <group key={`cap-${i}`} position={[capx * scale, capy * scale, BOARD_Z + 0.01]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045 * scale, 0.045 * scale, 0.1, 10]} />
            <meshStandardMaterial
              color="#0a2a0a"
              roughness={0.4}
              metalness={0.5}
              emissive="#004400"
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ─── Full PCB Board ───────────────────────────────────────────────────────────
interface PCBBoardProps {
  scale?: number
  showBeamSources?: boolean
}

function PCBBoard({ scale = 1 }: PCBBoardProps) {
  const w = 4 * scale
  const h = 2.4 * scale
  const thickness = 0.055

  return (
    <group>
      {/* Board substrate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[w, h, thickness]} />
        <meshStandardMaterial
          color="#0a1a08"
          roughness={0.85}
          metalness={0.05}
          emissive="#030a02"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Board edge highlight */}
      <mesh position={[0, 0, thickness / 2]}>
        <boxGeometry args={[w + 0.01, h + 0.01, 0.003]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.25}
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Copper pour (ground plane hint) */}
      <mesh position={[0, 0, thickness / 2 + 0.001]}>
        <boxGeometry args={[w - 0.15, h - 0.15, 0.002]} />
        <meshStandardMaterial
          color="#1a3a10"
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>
      <PCBTraces scale={scale} />
      <PCBVias scale={scale} />
      <PCBComponents scale={scale} />
    </group>
  )
}

// ─── Cloud System ─────────────────────────────────────────────────────────────
function CloudSystem() {
  const groupRef = useRef<Group>(null!)
  const pulseRef = useRef(0)

  useFrame((state) => {
    pulseRef.current = state.clock.elapsedTime
    const pulse = 1 + Math.sin(pulseRef.current * 1.5) * 0.03
    if (groupRef.current) {
      groupRef.current.scale.setScalar(pulse)
      groupRef.current.position.y = CLOUD_CENTER[1] + Math.sin(pulseRef.current * 0.6) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={CLOUD_CENTER}>
      {CLOUD_SPHERES.map(([lx, ly, lz, r], i) => (
        <group key={i} position={[lx, ly, lz]}>
          {/* Core sphere */}
          <mesh>
            <sphereGeometry args={[r, 20, 20]} />
            <meshStandardMaterial
              color="#c8f0ff"
              emissive={CYAN}
              emissiveIntensity={0.35}
              roughness={0.3}
              metalness={0.0}
              transparent
              opacity={0.88}
            />
          </mesh>
          {/* Outer glow shell */}
          <mesh>
            <sphereGeometry args={[r * 1.18, 16, 16]} />
            <meshStandardMaterial
              color={CYAN}
              emissive={CYAN}
              emissiveIntensity={0.8}
              transparent
              opacity={0.05}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
      {/* Central cloud glow point */}
      <pointLight color={CYAN} intensity={3.5} distance={5} decay={2} />
    </group>
  )
}

// ─── Upload Beam (single beam from PCB to cloud) ──────────────────────────────
function UploadBeam({
  start,
  end,
  index,
}: {
  start: [number, number, number]
  end: [number, number, number]
  index: number
}) {
  const pointsRef = useRef<ThreePoints>(null!)
  const BEAM_PARTICLES = 8

  const { positions } = useMemo(() => {
    const pos = new Float32Array(BEAM_PARTICLES * 3)
    return { positions: pos }
  }, [])

  const phaseOffset = (index / 3) * 0.67

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.45 + phaseOffset

    for (let i = 0; i < BEAM_PARTICLES; i++) {
      const p = ((t + i / BEAM_PARTICLES) % 1)
      positions[i * 3]     = MathUtils.lerp(start[0], end[0], p)
      positions[i * 3 + 1] = MathUtils.lerp(start[1], end[1], p)
      positions[i * 3 + 2] = MathUtils.lerp(start[2], end[2], p)
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const lineObj = useMemo(() => {
    const pts = new Float32Array([
      start[0], start[1], start[2],
      end[0], end[1], end[2],
    ])
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(pts, 3))
    const mat = new LineBasicMaterial({
      color: index === 1 ? CYAN : PURPLE,
      transparent: true,
      opacity: 0.18,
    })
    return new ThreeLine(geo, mat)
  }, [start, end, index])

  return (
    <>
      <primitive object={lineObj} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color={index === 1 ? CYAN : PURPLE}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </>
  )
}

function UploadBeams() {
  return (
    <>
      {BEAM_STARTS.map((start, i) => (
        <UploadBeam key={i} start={start} end={CLOUD_CENTER} index={i} />
      ))}
    </>
  )
}

// ─── Ambient PCB Dust Particles ───────────────────────────────────────────────
function PCBDust() {
  const pointsRef = useRef<ThreePoints>(null!)
  const COUNT = 120
  const palette = useMemo(() => [new Color(CYAN), new Color(PURPLE), new Color('#60a5fa')], [])

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    const col = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [palette])

  useFrame((_, delta) => {
    const pos = pointsRef.current?.geometry.attributes.position.array as Float32Array
    if (!pos) return
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 1] += delta * 0.04
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

// ─── Secondary PCB Boards (floating in background) ───────────────────────────
function SecondaryPCB({ position, rotationSeed, rotSpeed }: {
  position: [number, number, number]
  rotationSeed: number
  rotSpeed: number
}) {
  const groupRef = useRef<Group>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotSpeed + rotationSeed
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={[-0.2, rotationSeed, 0.1]}>
      <PCBBoard scale={0.6} />
    </group>
  )
}

// ─── Camera Rig (mouse parallax) ─────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree()

  useFrame((state) => {
    camera.position.x = MathUtils.lerp(camera.position.x, state.pointer.x * 0.6, 0.04)
    camera.position.y = MathUtils.lerp(camera.position.y, 1.5 + state.pointer.y * 0.4, 0.04)
    camera.lookAt(0, 0.5, 0)
  })

  return null
}

// ─── Main Scene ───────────────────────────────────────────────────────────────
export default function PCBCloudScene() {
  const mainGroupRef = useRef<Group>(null!)

  return (
    <>
      {/* Lighting */}
      <fog attach="fog" args={['#030812', 10, 25]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 4]} intensity={0.6} color="#b0d8ff" />
      <pointLight position={[-6, 2, 2]} intensity={0.5} color={PURPLE} distance={12} />
      <pointLight position={[6, 1, 2]} intensity={0.4} color={CYAN} distance={10} />
      <pointLight position={[0, -3, 2]} intensity={0.25} color="#22ee88" distance={8} />

      {/* Background stars */}
      <StarField />

      {/* Ambient particle dust */}
      <PCBDust />

      {/* Main PCB - centered, slight forward tilt */}
      <group
        ref={mainGroupRef}
        position={[0, -0.6, 0]}
        rotation={[-0.18, 0.05, 0]}
      >
        <PCBBoard scale={1} />
      </group>

      {/* Secondary floating PCBs */}
      <SecondaryPCB position={[-5.2, -1.8, -4]} rotationSeed={0.4} rotSpeed={0.06} />
      <SecondaryPCB position={[4.8, -1.2, -5]} rotationSeed={-0.8} rotSpeed={-0.05} />

      {/* Cloud upload system */}
      <CloudSystem />
      <UploadBeams />

      {/* Mouse parallax camera rig */}
      <CameraRig />
    </>
  )
}

'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

// CPPN-inspired color generation
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec3 palette(float t) {
  // Vibrant orange theme: deep orange -> bright orange -> yellow-orange -> coral
  vec3 a = vec3(0.9, 0.6, 0.3);
  vec3 b = vec3(0.6, 0.4, 0.2);
  vec3 c = vec3(1.2, 1.0, 0.6);
  vec3 d = vec3(0.0, 0.15, 0.3);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.y *= -1.0;
  
  // CPPN-like pattern generation with new gradient design
  float time = iTime * 0.12;
  vec2 p = uv * 1.8;
  
  // Layer 1: Flowing circular waves
  float d1 = length(p + vec2(sin(time * 0.4), cos(time * 0.3)) * 0.3);
  float wave1 = sin(d1 * 3.5 - time * 1.8);
  
  // Layer 2: Spiral pattern
  float angle = atan(p.y, p.x) + time * 0.3;
  float spiral = sin(angle * 8.0 + length(p) * 4.0);
  float wave2 = spiral * 0.5 + 0.5;
  
  // Layer 3: Organic blob movement
  vec2 offset = vec2(sin(time * 0.7) * 0.5, cos(time * 0.5) * 0.5);
  float d2 = length(p - offset);
  float d3 = length(p + offset * 0.7);
  float wave3 = sin(d2 * 5.0) * cos(d3 * 4.0);
  
  // Layer 4: Interference pattern
  float wave4 = sin(p.x * 3.0 + time) * sin(p.y * 3.0 - time * 0.8);
  
  // Combine patterns with varying weights
  float pattern = wave1 * 0.35 + wave2 * 0.25 + wave3 * 0.25 + wave4 * 0.15;
  pattern = pattern * 0.5 + 0.5;
  
  // Add flowing noise for organic texture
  float n = noise(p * 8.0 + time * 0.2) * 0.12;
  float n2 = noise(p * 15.0 - time * 0.15) * 0.06;
  pattern += n + n2;
  
  // Generate color from pattern
  vec3 color = palette(pattern + time * 0.08);
  
  // Enhanced vignette for focus
  float vignette = 1.0 - length(uv * 0.6);
  vignette = pow(vignette, 1.3);
  color *= vignette * 0.75 + 0.25;
  
  // Boost saturation and warmth for vibrant orange
  color = pow(color, vec3(1.1));
  color = mix(vec3(0.15, 0.05, 0.02), color, 0.92);
  
  gl_FragColor = vec4(color, 1.0);
}
`

function InnerScene({ fiber, drei }: { fiber: any; drei: any }) {
  const { Canvas, useFrame, extend } = fiber
  const { shaderMaterial } = drei

  const CPPNShaderMaterial = useMemo(
    () =>
      shaderMaterial(
        { iTime: 0, iResolution: new THREE.Vector2(1, 1) },
        vertexShader,
        fragmentShader
      ),
    []
  )

  useMemo(() => {
    extend({ CPPNShaderMaterial })
  }, [extend, CPPNShaderMaterial])

  function ShaderPlane() {
    const materialRef = useRef<any>(null!)
    useFrame((state: any) => {
      if (!materialRef.current) return
      materialRef.current.iTime = state.clock.elapsedTime
      const { width, height } = state.size
      materialRef.current.iResolution.set(width, height)
    })
    return (
      <mesh position={[0, 0, -0.5]}>
        {/* Large plane to ensure full-viewport coverage */}
        <planeGeometry args={[12, 12]} />
        {/* TS typing provided via ambient declaration below */}
        <cPPNShaderMaterial ref={materialRef} side={THREE.DoubleSide} />
      </mesh>
    )
  }

  const camera = useMemo(
    () => ({
      position: [0, 0, 1] as [number, number, number],
      fov: 75,
      near: 0.1,
      far: 1000,
    }),
    []
  )

  return (
    <Canvas
      camera={camera}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <ShaderPlane />
    </Canvas>
  )
}

export default function ShaderScene() {
  const [mods, setMods] = useState<{ fiber: any; drei: any } | null>(null)

  useEffect(() => {
    let mounted = true
    Promise.all([import('@react-three/fiber'), import('@react-three/drei')]).then(
      ([fiber, drei]) => {
        if (mounted) setMods({ fiber, drei })
      }
    )
    return () => {
      mounted = false
    }
  }, [])

  if (!mods) return null
  return <InnerScene fiber={mods.fiber} drei={mods.drei} />
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    cPPNShaderMaterial: any
  }
}

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, PresentationControls } from '@react-three/drei';
import { Suspense, useMemo } from 'react';

const PROJECTS = [
  { title: 'A.R.I.A.', color: '#c8502b', text: 'Adaptive Response Interface Agent' },
  { title: 'Motion', color: '#0b0b0c', text: 'Brand systems that move' },
  { title: 'Studio', color: '#faf9f7', text: 'Design + engineering' },
  { title: 'Build', color: '#6b6b72', text: 'The page that ships' },
];

function Card({ title, text, color }: { title: string; text: string; color: string }) {
  const emissive = useMemo(() => color, [color]);
  return (
    <Float
      speed={1.2}
      rotationIntensity={0.6}
      floatIntensity={0.5}
      floatingRange={[0, 0.3]}
    >
      <mesh>
        <boxGeometry args={[2.4, 1.5, 0.08]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.18}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      <Text
        position={[0, 0.18, 0.09]}
        fontSize={0.32}
        color={color === '#faf9f7' ? '#0b0b0c' : '#faf9f7'}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {title}
      </Text>
      <Text
        position={[0, -0.28, 0.09]}
        fontSize={0.13}
        color={color === '#faf9f7' ? '#0b0b0c' : 'rgba(250,249,247,0.7)'}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {text}
      </Text>
    </Float>
  );
}

/**
 * 3D showcase — a rotating card carousel.
 * Pointer-driven orbit so the visitor is in control; the cards float so
 * they read as objects rather than flat panels.
 */
export default function ThreeShowcase() {
  return (
    <section
      id="labs"
      className="relative overflow-hidden"
      style={{ height: '80vh', background: '#0b0b0c' }}
    >
      <div className="absolute top-0 left-0 right-0 z-10 px-5 sm:px-8 md:px-10 pt-12">
        <p
          className="text-xs sm:text-sm uppercase tracking-[0.14em] mb-3"
          style={{ color: '#c8502b', fontFamily: 'var(--font-heading)' }}
        >
          Labs
        </p>
        <h2
          className="font-heading"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: 0.98,
            letterSpacing: '-0.03em',
            color: '#faf9f7',
          }}
        >
          What we're making.
        </h2>
      </div>

      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 45 }}
        gl={{ antialias: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={1.5} color="#c8502b" />
          <spotLight position={[-5, 4, -5]} angle={0.4} penumbra={1} intensity={0.6} color="#faf9f7" />

          <group position={[0, -0.4, 0]}>
            {PROJECTS.map((p, i) => {
              const angle = (i / PROJECTS.length) * Math.PI * 2;
              const radius = 3.2;
              return (
                <group key={p.title} position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius - 1.5]}>
                  <Card {...p} />
                </group>
              );
            })}
          </group>

          <PresentationControls
            global
            cursor
            snap
            rotation={[0, Math.PI / 6, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[0, Math.PI / 2]}
          >
            <group />
          </PresentationControls>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={3 * Math.PI / 4}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Suspense>
      </Canvas>

      <p
        className="absolute bottom-6 left-0 right-0 text-center text-xs sm:text-sm z-10"
        style={{ color: 'rgba(250,249,247,0.45)', fontFamily: 'var(--font-body)' }}
      >
        Drag to look around
      </p>
    </section>
  );
}
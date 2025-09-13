import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

// Globe component
const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  // Sample locations (you can replace with actual travel locations)
  const locations = [
    { name: "New York", lat: 40.7128, lng: -74.0060, color: "#8b5cf6" },
    { name: "London", lat: 51.5074, lng: -0.1278, color: "#06b6d4" },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503, color: "#f59e0b" },
    { name: "Sydney", lat: -33.8688, lng: 151.2093, color: "#ef4444" },
    { name: "Dubai", lat: 25.2048, lng: 55.2708, color: "#10b981" },
  ];

  // Convert lat/lng to 3D coordinates
  const latLngToVector3 = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  return (
    <group>
      {/* Main Globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          map={undefined}
          color="#1a1a2e"
          transparent
          opacity={0.8}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>

      {/* Location markers */}
      {locations.map((location, index) => {
        const position = latLngToVector3(location.lat, location.lng, 2.1);
        return (
          <group key={location.name}>
            {/* Marker dot */}
            <Sphere args={[0.02]} position={position}>
              <meshBasicMaterial color={location.color} />
            </Sphere>
            
            {/* Pulsing ring */}
            <mesh position={position} rotation={[0, 0, 0]}>
              <ringGeometry args={[0.03, 0.06, 16]} />
              <meshBasicMaterial
                color={location.color}
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Location label */}
            <Text
              position={[position.x * 1.2, position.y * 1.2, position.z * 1.2]}
              fontSize={0.08}
              color={location.color}
              anchorX="center"
              anchorY="middle"
            >
              {location.name}
            </Text>
          </group>
        );
      })}

      {/* Atmosphere glow */}
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

// Main InteractiveGlobe component
const InteractiveGlobe = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />

        {/* Globe */}
        <Globe />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />

        {/* Stars background */}
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
          <meshBasicMaterial
            color="#000011"
            side={THREE.BackSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-4 text-white/70 text-sm bg-black/30 backdrop-blur-sm rounded-lg p-3">
        <p>🌍 Drag to rotate • Scroll to zoom</p>
        <p className="text-xs mt-1 text-white/50">Places I've been to and worked from</p>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg p-4 text-white/70 text-sm">
        <h3 className="font-semibold mb-2 text-primary">Locations</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <span>Home Base</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span>Work Trips</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Conferences</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGlobe;
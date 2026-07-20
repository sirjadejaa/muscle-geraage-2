'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

// Register ScrollTrigger client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: 5000, suffix: '+', label: 'Members' },
  { value: 35000, suffix: ' sq ft', label: 'Luxury Facility' },
  { value: 95, suffix: '+', label: 'Google Reviews' },
  { value: 12, suffix: '+', label: 'Programs' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);

  // Refs for audio context and nodes so we can control/cleanup
  const audioCtxRef = useRef<AudioContext | null>(null);
  const breathingSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const breathingGainRef = useRef<GainNode | null>(null);
  const breathingFilterRef = useRef<BiquadFilterNode | null>(null);
  const breathingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMutedRef = useRef(false);

  // Mouse movement variables for parallax
  const mousePos = useRef({ x: 0, y: 0 });
  const targetMousePos = useRef({ x: 0, y: 0 });

  // Track scroll progress for rendering updates
  const scrollProgressRef = useRef(0);

  // WebGL references for clean resize/cleanup
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dumbbellRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);
  const isMobileRef = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  // Show "Enter" button after 0.8s (creative direction)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEnterButton(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse movement for 3D camera shift (max 10px)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMousePos.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Synthesize metallic gym sound (clang)
  const playMetallicClang = (ctx: AudioContext) => {
    const now = ctx.currentTime;
    
    // Core metallic strike frequencies (inharmonics)
    const freqs = [140, 222, 281, 385, 524, 895, 1205, 1600];
    const masterGain = ctx.createGain();
    
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.5, now + 0.005);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
    masterGain.connect(ctx.destination);

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);
      
      // High freqs decay faster to mimic real metal properties
      const decayTime = 1.8 / (idx * 0.5 + 1);
      
      gainNode.gain.setValueAtTime(0.25 / freqs.length, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);
      
      osc.connect(gainNode);
      gainNode.connect(masterGain);
      osc.start(now);
      osc.stop(now + 2.0);
    });

    // Sub-bass heavy thud (the rubber mat impact)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(55, now);
    subOsc.frequency.exponentialRampToValueAtTime(10, now + 0.15);
    
    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.2);

    // High frequency sparks (the impact click)
    const noise = ctx.createBufferSource();
    const bufferSize = ctx.sampleRate * 0.05; // 50ms click
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(2000, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noise.start(now);
    noise.stop(now + 0.05);
  };

  // Synthesize breathing sound loop using filtered white noise
  const startBreathingLoop = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2.0; // 2 seconds of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 1.8;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(0);

    // Save refs for modulation & clean-up
    breathingSourceRef.current = source;
    breathingFilterRef.current = filter;
    breathingGainRef.current = gainNode;

    let time = 0;
    const modulateBreathing = () => {
      if (!breathingFilterRef.current || !breathingGainRef.current || isMutedRef.current) return;
      const now = ctx.currentTime;
      const cycle = time % 4.5; // 4.5s breathe cycle (Inhale 1.8s, Hold 0.2s, Exhale 2.5s)

      if (cycle < 1.8) {
        // Inhale: filter frequency rises, volume increases
        const progress = cycle / 1.8;
        breathingFilterRef.current.frequency.setTargetAtTime(320 + progress * 220, now, 0.4);
        breathingGainRef.current.gain.setTargetAtTime(0.08, now, 0.3);
      } else if (cycle >= 1.8 && cycle < 2.0) {
        // Hold breath slightly
        breathingGainRef.current.gain.setTargetAtTime(0.04, now, 0.1);
      } else {
        // Exhale: filter frequency falls, volume fades
        const progress = (cycle - 2.0) / 2.5;
        breathingFilterRef.current.frequency.setTargetAtTime(540 - progress * 260, now, 0.5);
        breathingGainRef.current.gain.setTargetAtTime(0.06 * (1.0 - progress), now, 0.4);
      }

      time += 0.15;
      breathingTimerRef.current = setTimeout(modulateBreathing, 150);
    };

    modulateBreathing();
  };

  const handleEnter = () => {
    // 1. Initialize Audio Context
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      
      // Play opening clang slam
      playMetallicClang(ctx);
      
      // Start athletic deep breathing loop
      startBreathingLoop(ctx);
    }

    setHasEntered(true);

    // 2. Trigger title entrance after camera completes initial dumbbells sweep (approx 2s)
    setTimeout(() => {
      const wordInners = document.querySelectorAll('.title-word-inner');
      wordInners.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('revealed');
        }, index * 250); // Elegant word-by-word stagger
      });

      // Fade in subtitle & CTAs after title finishes
      gsap.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
      });

      gsap.to(ctaContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 1.1,
      });
    }, 1800);
  };

  const toggleMute = () => {
    const nextMuted = !audioMuted;
    setAudioMuted(nextMuted);
    isMutedRef.current = nextMuted;

    if (breathingGainRef.current) {
      if (nextMuted) {
        breathingGainRef.current.gain.setValueAtTime(0, audioCtxRef.current?.currentTime || 0);
      } else {
        breathingGainRef.current.gain.setValueAtTime(0.05, audioCtxRef.current?.currentTime || 0);
      }
    }
  };

  // WebGL Three.js Setup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Declare variables for animation references
    let benchBarbell: THREE.Group;
    let leftArmLine: THREE.Line;
    let rightArmLine: THREE.Line;
    let squatAthlete: THREE.Group;
    let ringsGroup: THREE.Group;
    let waterPlane: THREE.Mesh;
    let swimmer: THREE.Group;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x000000, 0.035);

    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(
      isMobileRef.current ? 60 : 45,
      aspect,
      0.1,
      100
    );
    cameraRef.current = camera;
    // Initial camera position extremely close to dumbbell
    camera.position.set(0, 0.15, isMobileRef.current ? 1.8 : 1.4);
    camera.lookAt(0, 0.05, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // 1. Procedural knurling texture for the dumbbell bar
    const createKnurlingTexture = () => {
      const canv = document.createElement('canvas');
      canv.width = 128;
      canv.height = 128;
      const ctx = canv.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 128, 128);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        for (let i = -128; i < 128; i += 8) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + 128, 128);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(i, 128);
          ctx.lineTo(i + 128, 0);
          ctx.stroke();
        }
      }
      const tex = new THREE.CanvasTexture(canv);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(5, 1);
      return tex;
    };

    // 2. Procedural scratch texture for plates
    const createScratchTexture = () => {
      const canv = document.createElement('canvas');
      canv.width = 256;
      canv.height = 256;
      const ctx = canv.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * 256;
          const y = Math.random() * 256;
          const length = Math.random() * 25 + 5;
          const angle = Math.random() * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
          ctx.stroke();
        }
      }
      const tex = new THREE.CanvasTexture(canv);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    const knurlingTexture = createKnurlingTexture();
    const scratchTexture = createScratchTexture();

    // 3. Assemble Matte-Black Olympic Dumbbell Group
    const dumbbell = new THREE.Group();
    dumbbellRef.current = dumbbell;

    // Dumbbell bar grip
    const barGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.45, 32);
    barGeo.rotateZ(Math.PI / 2);
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x6e6e6e,
      metalness: 0.95,
      roughness: 0.25,
      bumpMap: knurlingTexture,
      bumpScale: 0.02,
    });
    const barMesh = new THREE.Mesh(barGeo, barMat);
    dumbbell.add(barMesh);

    // Collars (holding plates)
    const collarGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.03, 32);
    collarGeo.rotateZ(Math.PI / 2);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.95,
      roughness: 0.15,
    });
    
    const leftCollar = new THREE.Mesh(collarGeo, chromeMat);
    leftCollar.position.x = -0.155;
    const rightCollar = leftCollar.clone();
    rightCollar.position.x = 0.155;
    dumbbell.add(leftCollar);
    dumbbell.add(rightCollar);

    // Weights plates (Matte Black Steel)
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x141414,
      metalness: 0.8,
      roughness: 0.65,
      bumpMap: scratchTexture,
      bumpScale: 0.015,
    });

    const createPlatesGroup = (startX: number, direction: number) => {
      const platesGroup = new THREE.Group();
      
      // Large inner plate
      const p1Geo = new THREE.CylinderGeometry(0.12, 0.12, 0.035, 48);
      p1Geo.rotateZ(Math.PI / 2);
      const p1 = new THREE.Mesh(p1Geo, plateMat);
      p1.position.x = startX + direction * 0.02;
      platesGroup.add(p1);

      // Mid plate
      const p2Geo = new THREE.CylinderGeometry(0.11, 0.11, 0.03, 48);
      p2Geo.rotateZ(Math.PI / 2);
      const p2 = new THREE.Mesh(p2Geo, plateMat);
      p2.position.x = startX + direction * 0.055;
      platesGroup.add(p2);

      // Small outer plate
      const p3Geo = new THREE.CylinderGeometry(0.095, 0.095, 0.025, 48);
      p3Geo.rotateZ(Math.PI / 2);
      const p3 = new THREE.Mesh(p3Geo, plateMat);
      p3.position.x = startX + direction * 0.085;
      platesGroup.add(p3);

      return platesGroup;
    };

    dumbbell.add(createPlatesGroup(-0.16, -1));
    dumbbell.add(createPlatesGroup(0.16, 1));
    dumbbell.position.set(0, 0.05, 0);
    scene.add(dumbbell);

    const wireframeGoldMat = new THREE.MeshBasicMaterial({
      color: 0xFFD100,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    // --- 1. BENCH PRESS STATION (Z = -8, X = 3) ---
    const benchGroup = new THREE.Group();
    benchGroup.position.set(3.0, -1.2, -8);
    
    // Bench flat pad
    const benchPad = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.08, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 })
    );
    benchPad.position.y = 0.45;
    benchGroup.add(benchPad);

    // Bench legs
    const legGeo = new THREE.BoxGeometry(0.06, 0.4, 0.06);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, metalness: 0.8 });
    const bLeg1 = new THREE.Mesh(legGeo, legMat);
    bLeg1.position.set(-0.2, 0.2, -0.5);
    const bLeg2 = bLeg1.clone();
    bLeg2.position.set(0.2, 0.2, -0.5);
    const bLeg3 = bLeg1.clone();
    bLeg3.position.set(-0.2, 0.2, 0.5);
    const bLeg4 = bLeg1.clone();
    bLeg4.position.set(0.2, 0.2, 0.5);
    benchGroup.add(bLeg1, bLeg2, bLeg3, bLeg4);

    // Rack uprights
    const uprightGeo = new THREE.BoxGeometry(0.06, 1.1, 0.06);
    const uprightMat = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, metalness: 0.9 });
    const bUprightL = new THREE.Mesh(uprightGeo, uprightMat);
    bUprightL.position.set(-0.3, 0.55, 0);
    const bUprightR = bUprightL.clone();
    bUprightR.position.set(0.3, 0.55, 0);
    benchGroup.add(bUprightL, bUprightR);

    // Golden wireframe athlete
    const bpTorso = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.2, 0.8), wireframeGoldMat);
    bpTorso.position.set(0, 0.55, 0);
    benchGroup.add(bpTorso);

    const bpHead = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), wireframeGoldMat);
    bpHead.position.set(0, 0.6, 0.5);
    benchGroup.add(bpHead);

    // Barbell
    benchBarbell = new THREE.Group();
    const benchBar = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5), chromeMat);
    benchBar.geometry.rotateZ(Math.PI / 2);
    benchBarbell.add(benchBar);

    const bpPl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 20), plateMat);
    bpPl1.geometry.rotateZ(Math.PI / 2);
    bpPl1.position.x = -0.7;
    const bpPl2 = bpPl1.clone();
    bpPl2.position.x = 0.7;
    benchBarbell.add(bpPl1, bpPl2);
    benchBarbell.position.set(0, 0.9, 0);
    benchGroup.add(benchBarbell);

    // Arm connection lines
    leftArmLine = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0xFFD100 })
    );
    rightArmLine = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0xFFD100 })
    );
    benchGroup.add(leftArmLine, rightArmLine);

    // --- 2. SQUAT / RACK STATION (Z = -16, X = -3) ---
    const squatGroup = new THREE.Group();
    squatGroup.position.set(-3.0, -1.2, -16);

    const squatPostMat = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, metalness: 0.85 });
    const sqPostL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.2, 0.06), squatPostMat);
    sqPostL.position.set(-0.5, 1.1, 0);
    const sqPostR = sqPostL.clone();
    sqPostR.position.set(0.5, 1.1, 0);
    squatGroup.add(sqPostL, sqPostR);

    // Squatting Athlete (Torso and Legs)
    squatAthlete = new THREE.Group();
    squatAthlete.position.set(0, 0.8, 0);

    const sqTorso = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.5, 0.18), wireframeGoldMat);
    sqTorso.position.y = 0.25;
    squatAthlete.add(sqTorso);

    const sqHead = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), wireframeGoldMat);
    sqHead.position.set(0, 0.6, 0);
    squatAthlete.add(sqHead);

    const sqBarbell = new THREE.Group();
    const sqBar = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.6), chromeMat);
    sqBar.geometry.rotateZ(Math.PI / 2);
    sqBarbell.add(sqBar);

    const sqPl1 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.05, 20), plateMat);
    sqPl1.geometry.rotateZ(Math.PI / 2);
    sqPl1.position.x = -0.75;
    const sqPl2 = sqPl1.clone();
    sqPl2.position.x = 0.75;
    sqBarbell.add(sqPl1, sqPl2);
    sqBarbell.position.set(0, 0.48, 0); // on shoulders
    squatAthlete.add(sqBarbell);

    const sqLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5), wireframeGoldMat);
    sqLegL.position.set(-0.1, -0.2, 0);
    const sqLegR = sqLegL.clone();
    sqLegR.position.set(0.1, -0.2, 0);
    squatAthlete.add(sqLegL, sqLegR);
    squatGroup.add(squatAthlete);

    // --- 3. CROSSFIT platform (Z = -22, X = 3.5) ---
    const crossFitGroup = new THREE.Group();
    crossFitGroup.position.set(3.5, -1.2, -22);

    const platBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.04, 3.5),
      new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 0.8 })
    );
    platBase.position.y = 0.02;
    crossFitGroup.add(platBase);

    // Large tire
    const tire = new THREE.Mesh(
      new THREE.TorusGeometry(0.45, 0.18, 12, 24),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.98 })
    );
    tire.rotation.x = Math.PI / 2;
    tire.position.set(-0.6, 0.18, 0.6);
    crossFitGroup.add(tire);

    // Kettlebell
    const kbBase = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), new THREE.MeshStandardMaterial({ color: 0x1f1f1f, metalness: 0.8 }));
    kbBase.position.set(0.5, 0.12, -0.6);
    const kbHandle = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.015, 6, 12), new THREE.MeshStandardMaterial({ color: 0x1f1f1f, metalness: 0.8 }));
    kbHandle.position.set(0.5, 0.22, -0.6);
    crossFitGroup.add(kbBase, kbHandle);

    // Rings sway setup
    ringsGroup = new THREE.Group();
    ringsGroup.position.set(0, 2.4, -0.5);

    const ringL = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 16), new THREE.MeshStandardMaterial({ color: 0x4f3f2f, roughness: 0.7 }));
    ringL.position.set(-0.25, -0.8, 0);
    const ringR = ringL.clone();
    ringR.position.set(0.25, -0.8, 0);

    const strapL = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.8), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    strapL.position.set(-0.25, -0.4, 0);
    const strapR = strapL.clone();
    strapR.position.set(0.25, -0.4, 0);
    ringsGroup.add(ringL, ringR, strapL, strapR);
    crossFitGroup.add(ringsGroup);

    // Athlete on rings
    const ringAthlete = new THREE.Group();
    ringAthlete.position.set(0, -1.2, 0);

    const raTorso = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.45, 0.12), wireframeGoldMat);
    raTorso.position.y = -0.22;
    ringAthlete.add(raTorso);

    const raHead = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 10), wireframeGoldMat);
    raHead.position.set(0, 0.08, 0);
    ringAthlete.add(raHead);

    const raLegL = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.45), wireframeGoldMat);
    raLegL.position.set(-0.06, -0.6, 0);
    const raLegR = raLegL.clone();
    raLegR.position.set(0.06, -0.6, 0);
    ringAthlete.add(raLegL, raLegR);
    ringsGroup.add(ringAthlete);

    // --- 4. LUXURY GLASS INFINITY SWIMMING POOL (Z = -29, X = -6.5) ---
    const poolGroup = new THREE.Group();
    poolGroup.position.set(-6.5, -1.2, -29);

    // Glass box walls
    const poolGlass = new THREE.Mesh(
      new THREE.BoxGeometry(4.6, 1.0, 7.6),
      new THREE.MeshStandardMaterial({
        color: 0x55ccff,
        transparent: true,
        opacity: 0.2,
        roughness: 0.05,
        metalness: 0.95,
        side: THREE.DoubleSide
      })
    );
    poolGlass.position.y = 0.5;
    poolGroup.add(poolGlass);

    // Water surface plane with vertices for ripple waves
    const waterPlaneGeo = new THREE.PlaneGeometry(4.5, 7.5, 12, 12);
    waterPlaneGeo.rotateX(-Math.PI / 2);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0066aa,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: 0.6,
      flatShading: true,
      side: THREE.DoubleSide
    });
    waterPlane = new THREE.Mesh(waterPlaneGeo, waterMat);
    waterPlane.position.y = 0.88;
    poolGroup.add(waterPlane);

    // Under-water cyan light
    const poolLight = new THREE.PointLight(0x00ffff, 12, 5);
    poolLight.position.set(0, 0.3, 0);
    poolGroup.add(poolLight);

    // Swimmer figure
    swimmer = new THREE.Group();
    swimmer.position.set(0, 0.75, 0);

    const swimmerBody = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.6), wireframeGoldMat);
    swimmer.add(swimmerBody);
    const swimmerHead = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 10), wireframeGoldMat);
    swimmerHead.position.set(0, 0.04, 0.38);
    swimmer.add(swimmerHead);
    poolGroup.add(swimmer);

    // 4. Procedural Gym environment background
    const gymGroup = new THREE.Group();
    gymGroup.add(benchGroup);
    gymGroup.add(squatGroup);
    gymGroup.add(crossFitGroup);
    gymGroup.add(poolGroup);

    // Dark concrete floor
    const floorGeo = new THREE.PlaneGeometry(60, 100);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.9,
      metalness: 0.15,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    floor.receiveShadow = true;
    gymGroup.add(floor);

    // Concrete Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(60, 100);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x030303,
      roughness: 0.95,
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 8.0;
    gymGroup.add(ceiling);

    // Columns (Pillars) lining the gym walkway
    const pillarGeo = new THREE.BoxGeometry(0.5, 9.2, 0.5);
    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0x0f0f0f,
      roughness: 0.8,
      metalness: 0.6,
    });

    const columnsX = 4.2;
    const columnsZ = [-4, -10, -16, -22, -28, -34];
    
    columnsZ.forEach((cz) => {
      // Left Pillar
      const pLeft = new THREE.Mesh(pillarGeo, pillarMat);
      pLeft.position.set(-columnsX, 3.4, cz);
      pLeft.castShadow = true;
      pLeft.receiveShadow = true;
      gymGroup.add(pLeft);

      // Right Pillar
      const pRight = new THREE.Mesh(pillarGeo, pillarMat);
      pRight.position.set(columnsX, 3.4, cz);
      pRight.castShadow = true;
      pRight.receiveShadow = true;
      gymGroup.add(pRight);

      // Gold vertical glowing lines on pillars for premium look
      const lineGeo = new THREE.CylinderGeometry(0.015, 0.015, 8.5, 8);
      const goldGlowMat = new THREE.MeshBasicMaterial({ color: 0xFFD100 });

      const lLine = new THREE.Mesh(lineGeo, goldGlowMat);
      lLine.position.set(-columnsX + 0.26, 3.4, cz + 0.26);
      gymGroup.add(lLine);

      const rLine = new THREE.Mesh(lineGeo, goldGlowMat);
      rLine.position.set(columnsX - 0.26, 3.4, cz - 0.26);
      gymGroup.add(rLine);
    });

    // Workout frames / Racks in the background
    const rackFrameGeo = new THREE.BoxGeometry(0.08, 3.2, 0.08);
    const rackTopGeo = new THREE.BoxGeometry(2.0, 0.08, 0.08);
    const rackMat = new THREE.MeshStandardMaterial({
      color: 0x1c1c1c,
      metalness: 0.85,
      roughness: 0.4,
    });

    const rackZPositions = [-8, -18, -28];
    rackZPositions.forEach((rz) => {
      const rack = new THREE.Group();
      
      const beamL = new THREE.Mesh(rackFrameGeo, rackMat);
      beamL.position.set(-1.0, 0.4, 0);
      const beamR = beamL.clone();
      beamR.position.set(1.0, 0.4, 0);
      
      const beamTop = new THREE.Mesh(rackTopGeo, rackMat);
      beamTop.position.set(0, 2.0, 0);

      rack.add(beamL);
      rack.add(beamR);
      rack.add(beamTop);

      // Add a barbell hanging on the rack
      const bBarGeo = new THREE.CylinderGeometry(0.018, 0.018, 2.4, 16);
      bBarGeo.rotateZ(Math.PI / 2);
      const bBar = new THREE.Mesh(bBarGeo, chromeMat);
      bBar.position.set(0, 1.2, 0);
      rack.add(bBar);

      // Barbells plates
      const bpGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 32);
      bpGeo.rotateZ(Math.PI / 2);
      const bpL1 = new THREE.Mesh(bpGeo, plateMat);
      bpL1.position.set(-1.0, 1.2, 0);
      const bpR1 = bpL1.clone();
      bpR1.position.set(1.0, 1.2, 0);
      rack.add(bpL1);
      rack.add(bpR1);

      rack.position.set(rz % 2 === 0 ? -3.0 : 3.0, -1.2, rz);
      gymGroup.add(rack);
    });

    // 5. Giant Illuminated "MUSCLE GARAAGE" Logo Wall at the back (z = -38)
    const createWallLogo = () => {
      const canv = document.createElement('canvas');
      canv.width = 1024;
      canv.height = 256;
      const ctx = canv.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 1024, 256);
        
        ctx.shadowColor = '#FFD100';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#FFD100';
        ctx.font = 'bold 96px var(--font-bebas-neue), Bebas Neue, Impact, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('MUSCLE GARAAGE', 512, 128);
      }
      return new THREE.CanvasTexture(canv);
    };

    const logoTexture = createWallLogo();
    const logoWallGeo = new THREE.PlaneGeometry(8, 2.0);
    const logoWallMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const logoWall = new THREE.Mesh(logoWallGeo, logoWallMat);
    logoWall.position.set(0, 1.2, -37.8);
    gymGroup.add(logoWall);

    // Wall backing behind the logo
    const wallGeo = new THREE.PlaneGeometry(60, 20);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.95,
    });
    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 4, -38.2);
    gymGroup.add(backWall);

    scene.add(gymGroup);

    // 6. Volumetric lights (cones representing spotlight shafts)
    const volumeConeGeo = new THREE.CylinderGeometry(0.01, 1.8, 12, 32, 1, true);
    volumeConeGeo.translate(0, -6, 0); // Origin at top
    volumeConeGeo.rotateX(Math.PI / 12); // Slightly tilted

    const volumeMat = new THREE.MeshBasicMaterial({
      color: 0xFFD100,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const lBeam = new THREE.Mesh(volumeConeGeo, volumeMat);
    lBeam.position.set(-2, 8, -2);
    scene.add(lBeam);

    const rBeam = lBeam.clone();
    rBeam.position.set(2, 8, -8);
    rBeam.rotation.z = -Math.PI / 10;
    scene.add(rBeam);

    // 7. Floating dust particles
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6 + 2;
      positions[i * 3 + 2] = Math.random() * -42 + 2; // from camera Z to logo Z
      speeds[i] = Math.random() * 0.1 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Circular particle texture
    const createParticleTexture = () => {
      const canv = document.createElement('canvas');
      canv.width = 16;
      canv.height = 16;
      const ctx = canv.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 209, 0, 1)');
        grad.addColorStop(1, 'rgba(255, 209, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canv);
    };

    const particleTexture = createParticleTexture();
    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particlesRef.current = particles;
    scene.add(particles);

    // 8. Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.02);
    scene.add(ambientLight);

    const goldSpotLight = new THREE.SpotLight(0xFFD100, 15, 8, Math.PI / 5, 0.5, 1);
    goldSpotLight.position.set(0, 2.5, 0.8);
    goldSpotLight.target = dumbbell;
    goldSpotLight.castShadow = true;
    goldSpotLight.shadow.bias = -0.001;
    scene.add(goldSpotLight);
    spotLightRef.current = goldSpotLight;

    // Subtle blue steel rim lights to give Porsche/John Wick luxury lighting
    const blueRimLight = new THREE.DirectionalLight(0x3a5d7c, 0.8);
    blueRimLight.position.set(4, 3, 2);
    scene.add(blueRimLight);

    const gymFillLight = new THREE.PointLight(0xffffff, 0.4, 25);
    gymFillLight.position.set(0, 4, -15);
    scene.add(gymFillLight);

    const logoSpotLight = new THREE.SpotLight(0xFFD100, 25, 12, Math.PI / 4, 0.6, 1);
    logoSpotLight.position.set(0, 5, -34);
    logoSpotLight.target = logoWall;
    scene.add(logoSpotLight);

    // 9. Resize Listener
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      isMobileRef.current = window.innerWidth < 768;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.fov = isMobileRef.current ? 60 : 45;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Render Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow idle dumbbell rotation
      if (dumbbellRef.current) {
        dumbbellRef.current.rotation.y = Math.sin(elapsedTime * 0.4) * 0.12;
        dumbbellRef.current.rotation.z = Math.cos(elapsedTime * 0.25) * 0.05;
      }

      // 1. Bench Press animation (Z = -8)
      if (benchBarbell) {
        const bpCycle = Math.sin(elapsedTime * 2.2) * 0.2 + 0.88;
        benchBarbell.position.y = bpCycle;

        // Connect arm lines
        const leftArmPoints = [
          new THREE.Vector3(-0.12, 0.55, 0.15),
          new THREE.Vector3(-0.35, bpCycle, 0)
        ];
        const rightArmPoints = [
          new THREE.Vector3(0.12, 0.55, 0.15),
          new THREE.Vector3(0.35, bpCycle, 0)
        ];
        leftArmLine.geometry.setFromPoints(leftArmPoints);
        rightArmLine.geometry.setFromPoints(rightArmPoints);
      }

      // 2. Squat Athlete animation (Z = -16)
      if (squatAthlete) {
        const squatCycle = Math.sin(elapsedTime * 1.5) * 0.25 + 0.55;
        squatAthlete.position.y = squatCycle;
      }

      // 3. CrossFit Rings sway (Z = -22)
      if (ringsGroup) {
        ringsGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.08;
        ringsGroup.rotation.x = Math.cos(elapsedTime * 0.9) * 0.04;
      }

      // 4. Swimming Pool waves & swimmer glide (Z = -29)
      if (waterPlane) {
        const pos = waterPlane.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const u = pos.getX(i);
          const v = pos.getY(i);
          const zVal = Math.sin(u * 2.2 + elapsedTime * 2.2) * 0.035 + Math.cos(v * 2.2 + elapsedTime * 1.8) * 0.035;
          pos.setZ(i, zVal);
        }
        waterPlane.geometry.attributes.position.needsUpdate = true;
        waterPlane.geometry.computeVertexNormals();
      }

      if (swimmer) {
        swimmer.position.z = Math.sin(elapsedTime * 0.8) * 1.6;
        swimmer.rotation.y = Math.cos(elapsedTime * 0.8) * 0.12;
      }

      // Floating dust movement
      if (particlesRef.current) {
        const pSpeedMultiplier = 1 + scrollProgressRef.current * 5.0; // move up to 6x faster when scrolling
        const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          // move Y up and down
          posArr[i * 3 + 1] += (Math.sin(elapsedTime * 0.2 + i) * 0.0012 + speeds[i] * 0.01) * pSpeedMultiplier;
          // drift X slightly
          posArr[i * 3] += Math.cos(elapsedTime * 0.1 + i) * 0.0005;

          // Reset if particle moves out of height boundaries
          if (posArr[i * 3 + 1] > 7) {
            posArr[i * 3 + 1] = -1;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Smooth mouse parallax interpolation (max 10px shift)
      if (cameraRef.current) {
        const ease = 0.08;
        mousePos.current.x += (targetMousePos.current.x - mousePos.current.x) * ease;
        mousePos.current.y += (targetMousePos.current.y - mousePos.current.y) * ease;

        // Apply shift relative to the scrolling camera coordinates
        cameraRef.current.position.x += (mousePos.current.x * 0.18 - cameraRef.current.position.x) * ease;
        cameraRef.current.position.y += (1.2 + mousePos.current.y * 0.12 - cameraRef.current.position.y) * ease;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // 11. Cleanup WebGL resource leaks
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose textures
      knurlingTexture.dispose();
      scratchTexture.dispose();
      logoTexture.dispose();
      particleTexture.dispose();

      // Dispose geometries & materials recursively
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  // GSAP ScrollTrigger Animations for entering, gliding, and transitioning
  useGSAP(() => {
    if (!containerRef.current || !hasEntered) return;

    // Fade in initially hidden navbar
    const header = document.querySelector('header');
    if (header) {
      gsap.to(header, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.8,
      });
    }

    // Scroll timeline to fly through the procedural gym
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        pin: true,
        pinSpacing: false,
        onUpdate: (self) => {
          if (!cameraRef.current || !dumbbellRef.current) return;
          const p = self.progress;
          scrollProgressRef.current = p;

          // DOM Updates for vertical progress indicator (high performance)
          const pFill = document.getElementById('scroll-progress-fill');
          const pTxt = document.getElementById('scroll-progress-text');
          const pInd = document.getElementById('scroll-progress-indicator');
          if (pFill) pFill.style.height = `${p * 100}%`;
          if (pTxt) pTxt.textContent = `${Math.round(p * 100)}%`;
          if (pInd) {
            pInd.style.opacity = p > 0.88 ? '0' : '1';
            pInd.style.visibility = p > 0.88 ? 'hidden' : 'visible';
          }

          // 1. First Phase (0 to 0.15): Close dumbbell rotation orbit
          if (p <= 0.15) {
            const ratio = p / 0.15;
            const baseZ = isMobileRef.current ? 1.8 : 1.4;
            cameraRef.current.position.z = baseZ + ratio * 0.4;
            cameraRef.current.position.y = 0.15 + ratio * 0.15;
            cameraRef.current.lookAt(0, 0.05, 0);
            
            // Dumbbell scales out of focus slightly
            dumbbellRef.current.position.y = 0.05;
            dumbbellRef.current.scale.set(1, 1, 1);
            
            if (spotLightRef.current) spotLightRef.current.intensity = 15;
          }
          // 2. Second Phase (0.15 to 0.75): Glide back through the gym path
          else if (p > 0.15 && p <= 0.75) {
            const ratio = (p - 0.15) / 0.60;
            const startZ = isMobileRef.current ? 2.2 : 1.8;
            // fly back from startZ to Z = -34
            cameraRef.current.position.z = startZ - ratio * (34 + startZ);
            cameraRef.current.position.y = 0.3 + ratio * 0.9;
            cameraRef.current.lookAt(0, 0.7 - ratio * 0.3, -37.8);

            // dumbbell recedes into dark foreground
            dumbbellRef.current.position.y = 0.05 - ratio * 4;
            dumbbellRef.current.scale.set(1 - ratio * 0.4, 1 - ratio * 0.4, 1 - ratio * 0.4);
            
            if (spotLightRef.current) spotLightRef.current.intensity = 15 * (1 - ratio);
          }
          // 3. Final Phase (0.75 to 1.0): Close in on "MUSCLE GARAAGE" Wall Logo
          else {
            const ratio = (p - 0.75) / 0.25;
            cameraRef.current.position.z = -34 - ratio * 3.4; // get extremely close to -37.8
            cameraRef.current.position.y = 1.2;
            cameraRef.current.position.x = 0;
            cameraRef.current.lookAt(0, 1.2, -37.8);
          }
        },
      },
    });

    // Animate HTML UI layout elements out of scroll viewport
    if (titleRef.current) {
      tl.to(titleRef.current, {
        opacity: 0,
        y: -150,
        scale: 0.92,
        duration: 0.5,
      }, 0);
    }

    if (subtitleRef.current) {
      tl.to(subtitleRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.5,
      }, 0);
    }

    if (ctaContainerRef.current) {
      tl.to(ctaContainerRef.current, {
        opacity: 0,
        y: -80,
        duration: 0.4,
      }, 0);
    }

    if (statsContainerRef.current) {
      tl.to(statsContainerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.4,
      }, 0);
    }

    if (scrollIndicatorRef.current) {
      tl.to(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 0.2,
      }, 0);
    }

    // Canvas container scales slightly on scroll to look organic
    tl.to(canvasRef.current, {
      scale: 1.05,
      opacity: 0.2, // dim WebGL background as we transition to About page concrete text
      duration: 1.0,
    }, 0);

    // Stats smooth counter animates exactly once when entry finishes
    const statElements = document.querySelectorAll('.stat-counter');
    statElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute('data-target') || '0', 10);
      const countObj = { val: 0 };
      
      gsap.to(countObj, {
        val: targetVal,
        duration: 2.2,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = Math.floor(countObj.val).toLocaleString();
        },
      });
    });

  }, { scope: containerRef, dependencies: [hasEntered] });

  // Handle magnetic primary button coordinates
  const handlePrimaryMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);

    // Magnetic pull (max 8px shift)
    const pullX = (x - rect.width / 2) * 0.2;
    const pullY = (y - rect.height / 2) * 0.2;
    gsap.to(btn, {
      x: pullX,
      y: pullY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handlePrimaryMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  // Cleanup breathing loop on unmount
  useEffect(() => {
    return () => {
      if (breathingTimerRef.current) clearTimeout(breathingTimerRef.current);
      if (breathingSourceRef.current) {
        try {
          breathingSourceRef.current.stop();
        } catch (e) {}
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between items-center py-10 z-30 select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 block bg-black transition-opacity duration-[2s]"
        style={{ opacity: hasEntered ? 1 : 0 }}
      />

      {/* Volumetric Fog & Spotlight vignette simulator overlay */}
      {hasEntered && <div className="volumetric-fog-overlay" />}

      {/* Floating Dust Particles Screen Layer (fallback and detail depth enhancement) */}
      {hasEntered && (
        <div className="floating-dust-overlay bg-[url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=1000')] opacity-5" />
      )}

      {/* Audio Mute Controller Toggle */}
      {hasEntered && (
        <button
          onClick={toggleMute}
          className="absolute top-24 right-6 z-40 p-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-white hover:text-accent hover:border-accent/40 transition-all duration-300"
          aria-label={audioMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {audioMuted ? <VolumeX className="w-5 h-5 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}

      {/* FIRST IMPRESSION BLACK SCREEN OVERLAY (Autoplay Policy / Clang intro slam) */}
      <div className={`enter-overlay ${hasEntered ? 'fade-out' : ''}`}>
        {showEnterButton && (
          <div className="flex flex-col items-center gap-6 text-center animate-fade-in px-6">
            <h2 className="font-heading text-white text-3xl sm:text-5xl tracking-[0.25em] uppercase mb-2">
              MUSCLE GARAAGE
            </h2>
            <p className="font-body text-gray-500 text-xs sm:text-sm tracking-widest max-w-sm uppercase mb-6">
              Ahmedabad&apos;s Elite Luxury Fitness Sanctuary
            </p>
            <button
              onClick={handleEnter}
              className="group relative px-10 py-5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm text-accent font-heading text-xl uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-accent hover:text-black hover:border-accent hover:shadow-[0_0_30px_rgba(255,209,0,0.4)]"
            >
              Enter The Garaage
            </button>
          </div>
        )}
      </div>

      {/* HTML Layout Content - Left Aligned */}
      <div className="w-full flex-grow flex flex-col justify-center items-start px-8 sm:px-16 md:px-24 text-left z-20 mt-20 md:mt-28 max-w-4xl mr-auto">
        {/* Title: Hidden initially, splits and animates on enter */}
        <h1
          ref={titleRef}
          className="font-heading text-6xl sm:text-8xl md:text-9xl tracking-tight text-white mb-6 uppercase leading-[0.85] text-left select-none"
        >
          <span className="title-word-mask mr-4">
            <span className="title-word-inner">TRAIN</span>
          </span>
          <span className="title-word-mask">
            <span className="title-word-inner">LIKE</span>
          </span>
          <br />
          <span className="title-word-mask mr-4">
            <span className="title-word-inner text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark cinematic-glow">
              A
            </span>
          </span>
          <span className="title-word-mask">
            <span className="title-word-inner text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark cinematic-glow">
              CHAMPION
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="max-w-[550px] opacity-0 translate-y-12 select-none mb-10 text-left">
          <p className="font-body text-xs sm:text-sm md:text-base text-gray-300 tracking-wide leading-relaxed">
            Ahmedabad&apos;s finest 35,000 sq ft luxury fitness club in Motera. 
            Step into an elite training experience engineered with world-class biomechanical equipment, 
            indoor pool, steam rooms, and expert transformational blueprints.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          ref={ctaContainerRef}
          className="flex flex-col sm:flex-row gap-6 justify-start items-center opacity-0 translate-y-12 z-30 w-full"
        >
          {/* Primary: JOIN NOW (Liquid & Magnetic Glow) */}
          <Link
            href="#contact"
            onMouseMove={handlePrimaryMouseMove}
            onMouseLeave={handlePrimaryMouseLeave}
            className="btn-liquid inline-flex items-center gap-3 font-heading text-lg uppercase tracking-[0.2em] px-10 py-4.5 rounded-full shadow-[0_0_15px_rgba(255,209,0,0.15)] hover:scale-105 active:scale-95"
          >
            Join Now 
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Secondary: WATCH CINEMATIC TOUR (Glass Conic Border) */}
          <Link
            href="#virtual-tour"
            className="border-animate-container group inline-flex items-center cursor-play"
          >
            <div className="border-animate-inner px-8 py-4.5 flex items-center gap-3 text-white group-hover:text-black group-hover:bg-accent transition-all duration-300 uppercase font-heading text-lg tracking-[0.2em]">
              <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/20 bg-white/5 group-hover:border-black group-hover:bg-black group-hover:text-accent transition-all">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              Watch Tour
            </div>
          </Link>
        </div>
      </div>

      {/* Counters Grid */}
      <div
        ref={statsContainerRef}
        className="w-full max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 z-20 text-center border-t border-white/10 pt-8 mt-auto"
      >
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="font-heading text-4xl sm:text-5xl text-accent tracking-wide leading-none flex items-baseline justify-center">
              <span className="stat-counter" data-target={stat.value}>
                0
              </span>
              {stat.suffix}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="mt-6 flex flex-col items-center gap-1.5 z-20 cursor-pointer text-gray-600 hover:text-accent transition-colors"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] uppercase tracking-[0.35em] font-semibold">Scroll to Enter</span>
        <div className="w-5 h-8 border border-gray-700 rounded-full flex justify-center p-1.5">
          <div className="w-1 h-1.5 bg-accent rounded-full animate-bounce" />
        </div>
      </div>

      {/* Mobile Sticky CTA Trigger & Redesign Adaptations */}
      {hasEntered && (
        <div className="sm:hidden fixed bottom-6 right-6 z-50">
          <Link
            href="#contact"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-black shadow-[0_0_20px_rgba(255,209,0,0.6)] pulse-glow hover:scale-105 active:scale-95"
            aria-label="Join Now Mobile sticky"
          >
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      )}

      {/* Scroll progress indicator */}
      {hasEntered && (
        <div
          id="scroll-progress-indicator"
          className="fixed right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-40 transition-opacity duration-300 pointer-events-none"
        >
          <span className="text-[9px] text-gray-500 uppercase tracking-widest select-none mb-2" style={{ writingMode: 'vertical-lr' }}>
            SCROLL
          </span>
          <div className="w-[2px] h-32 bg-white/10 rounded-full relative overflow-hidden">
            <div
              id="scroll-progress-fill"
              className="absolute top-0 left-0 w-full bg-accent shadow-[0_0_8px_#FFD100]"
              style={{ height: '0%' }}
            />
          </div>
          <span id="scroll-progress-text" className="text-[10px] text-accent font-mono">
            0%
          </span>
        </div>
      )}
    </section>
  );
}

'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles, Film } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VirtualTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from('.tour-player-wrap', {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => console.log('Playback:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((cur / dur) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newProg = parseFloat(e.target.value);
    const dur = videoRef.current.duration;
    if (dur > 0) {
      videoRef.current.currentTime = (newProg / 100) * dur;
      setProgress(newProg);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section
      ref={containerRef}
      id="virtual-tour"
      className="relative bg-neutral-950 py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/5 z-30 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/2 rounded-full filter blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4">
            <Film className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs text-accent font-bold tracking-[0.4em] uppercase">
              CINEMATIC WALKTHROUGH
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-6">
            VIRTUAL <br />
            <span className="gold-gradient-text">SANCTUARY TOUR</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Take a high-definition tour across our 35,000 sq ft facility in Motera. Explore the strength arena, Rogue CrossFit rig, heated lap pool, and recovery suite.
          </p>
        </div>

        {/* Video Player Wrap */}
        <div className="tour-player-wrap relative max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/15 bg-black shadow-[0_0_50px_rgba(0,0,0,0.9)] group">
          <video
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-dark-gym-43093-large.mp4"
            className="w-full h-full object-cover cursor-pointer"
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
          />

          {/* Large Center Play Icon when paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity duration-300"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,209,0,0.7)] hover:scale-110 active:scale-95 transition-all duration-300">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Player Overlay Bar */}
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
            {/* Range Timeline */}
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-white/20 accent-accent rounded-lg cursor-pointer hover:h-1.5 transition-all"
              aria-label="Video timeline scrubber"
            />

            {/* Controls Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-accent hover:bg-white/20 transition-all"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-accent hover:bg-white/20 transition-all"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-[11px] font-mono text-gray-300 hidden sm:inline">
                  Muscle Garaage Motera · 4K 60FPS Tour
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#contact"
                  className="hidden sm:inline-flex items-center gap-1.5 bg-accent text-black px-4 py-1.5 rounded-full font-heading text-xs uppercase tracking-wider font-bold hover:bg-white transition-all shadow"
                >
                  <Sparkles className="w-3 h-3" /> Book In-Person Tour
                </a>

                <button
                  onClick={handleFullscreen}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-accent hover:bg-white/20 transition-all"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

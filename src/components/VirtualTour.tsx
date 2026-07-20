'use client';

import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';
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

    gsap.from('.tour-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    gsap.from('.tour-player-container', {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 1,
      scrollTrigger: {
        trigger: '.tour-player-container',
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => console.log('Playback error:', err));
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
    const curTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    if (duration > 0) {
      setProgress((curTime / duration) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newProgress = parseFloat(e.target.value);
    const duration = videoRef.current.duration;
    if (duration > 0) {
      videoRef.current.currentTime = (newProgress / 100) * duration;
      setProgress(newProgress);
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
      className="relative bg-black py-24 md:py-32 px-6 z-30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="tour-header mb-16 text-center max-w-3xl mx-auto">
          <span className="text-accent text-xs font-semibold tracking-[0.5em] uppercase mb-4 block">
            CINEMATIC EXPERIENCE
          </span>
          <h2 className="font-heading text-5xl sm:text-7xl tracking-tight text-white uppercase leading-none mb-6">
            VIRTUAL <br />
            <span className="text-accent">GYM TOUR</span>
          </h2>
          <p className="font-body text-sm md:text-base text-gray-400 leading-relaxed">
            Take a high-definition tour of our gym floor, CrossFit arena, recovery suite, and swimming pool. Feel the premium quality of Muscle Garaage.
          </p>
        </div>

        {/* Custom Video Player Container */}
        <div className="tour-player-container relative max-w-5xl mx-auto aspect-video bg-neutral-dark border border-white/10 overflow-hidden group cursor-play">
          {/* Loop Video as Poster Background */}
          <video
            ref={videoRef}
            src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-dark-gym-43093-large.mp4"
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
          />

          {/* Large Center Play Overlay (Visible when paused) */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <button
                onClick={togglePlay}
                className="w-20 h-20 bg-accent text-black rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 shadow-2xl focus:outline-none pulse-glow cursor-none"
                aria-label="Play virtual tour video"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            </div>
          )}

          {/* Bottom Player Controls (Fades in on hover) */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Timeline Progress Bar */}
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-[3px] bg-white/20 accent-accent hover:h-[5px] transition-all cursor-none"
              />
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-accent transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-accent transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              {/* Fullscreen */}
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-accent transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

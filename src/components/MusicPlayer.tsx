import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

const MUSIC_URL = "https://cdn.pixabay.com/audio/2024/11/28/audio_3e90e6400e.mp3";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Auto-play on first non-button interaction
  useEffect(() => {
    const startMusic = (e: Event) => {
      if (hasInteracted.current) return;
      // Don't auto-start if clicking the music button itself
      const target = e.target as HTMLElement;
      if (target.closest('[data-music-toggle]')) return;

      hasInteracted.current = true;
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener("click", startMusic);
      document.removeEventListener("scroll", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("scroll", startMusic);
    document.addEventListener("touchstart", startMusic);

    return cleanup;
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    hasInteracted.current = true;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  return (
    <motion.button
      data-music-toggle
      onClick={toggle}
      className="fixed bottom-6 left-4 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90"
      aria-label={playing ? "Mute music" : "Play music"}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {playing ? (
        <Music className="w-4 h-4 animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
    </motion.button>
  );
};

export default MusicPlayer;

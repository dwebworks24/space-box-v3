import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

const MUSIC_URL = "https://cdn.pixabay.com/audio/2024/11/28/audio_3e90e6400e.mp3";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setReady(true));

    // Autoplay on first user interaction
    const startMusic = () => {
      audio.play().then(() => setPlaying(true)).catch(() => {});
      document.removeEventListener("click", startMusic);
      document.removeEventListener("scroll", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };

    document.addEventListener("click", startMusic);
    document.addEventListener("scroll", startMusic);
    document.addEventListener("touchstart", startMusic);

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", startMusic);
      document.removeEventListener("scroll", startMusic);
      document.removeEventListener("touchstart", startMusic);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
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

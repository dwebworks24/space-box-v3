import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const userStoppedRef = useRef(false);
  const autoStartedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const autoStart = () => {
      if (autoStartedRef.current || userStoppedRef.current) return;
      autoStartedRef.current = true;
      audio.play().then(() => setPlaying(true)).catch(() => {});
      removeListeners();
    };

    const removeListeners = () => {
      document.removeEventListener("click", autoStart, true);
      document.removeEventListener("scroll", autoStart);
      document.removeEventListener("touchstart", autoStart);
    };

    document.addEventListener("click", autoStart, true);
    document.addEventListener("scroll", autoStart);
    document.addEventListener("touchstart", autoStart);

    return () => {
      removeListeners();
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      userStoppedRef.current = true;
      autoStartedRef.current = true; // prevent auto-restart
    } else {
      userStoppedRef.current = false;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-[70px] sm:bottom-6 left-4 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90"
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

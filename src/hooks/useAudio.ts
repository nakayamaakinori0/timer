import { useRef, useState, useEffect } from "react";

export default function useaudio(path: string) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const load = () => {
    audio.current = new Audio(path);
    if (audio.current) {
      setLoaded(true);
    }
  };

  const play = () => {
    if (audio.current) {
      audio.current.loop = true;
      audio.current.autoplay = true;
      audio.current.play();
    }
  };

  const stop = () => {
    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return { load, play, stop, loaded };
}

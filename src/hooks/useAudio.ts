import { useRef } from "react";

export default function useaudio({ path }: { path: string }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const load = () => {
    audio.current = new Audio(path);
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
  return { load, play, stop };
}

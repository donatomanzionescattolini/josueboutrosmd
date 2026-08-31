import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Headphones, Loader2, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function ListenButton({ text, lang }) {
  const { t } = useLang();
  const [status, setStatus] = useState("idle");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const load = async () => {
    setStatus("loading");
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/tts`, { text, lang });
      const audio = new Audio(`${BACKEND_URL}${data.url}`);
      audioRef.current = audio;
      audio.addEventListener("timeupdate", () =>
        setProgress(audio.duration ? audio.currentTime / audio.duration : 0)
      );
      audio.addEventListener("ended", () => {
        setPlaying(false);
        setProgress(0);
      });
      setStatus("ready");
      await audio.play();
      setPlaying(true);
    } catch {
      setStatus("idle");
      toast.error(t.listen.error);
    }
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  if (status === "ready") {
    return (
      <div data-testid="essay-audio-player" className="inline-flex items-center gap-3 rounded-full border border-terra/40 bg-terra/10 px-4 py-2">
        <button
          onClick={toggle}
          data-testid="essay-audio-toggle"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-terra text-cream hover:bg-ink transition-colors duration-300"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
        </button>
        <div className="h-1 w-24 sm:w-32 rounded-full bg-terra/20 overflow-hidden">
          <div className="h-full bg-terra transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
        </div>
        <Headphones size={13} className="text-terra" />
      </div>
    );
  }

  return (
    <button
      onClick={load}
      disabled={status === "loading"}
      data-testid="essay-listen-button"
      className="inline-flex items-center gap-2 rounded-full border border-linew px-4 py-2 text-[12px] font-semibold text-mutedw hover:border-terra/50 hover:text-terra disabled:opacity-60 transition-colors duration-300"
    >
      {status === "loading" ? <Loader2 size={13} className="animate-spin" /> : <Headphones size={13} />}
      {status === "loading" ? t.listen.preparing : t.listen.button}
    </button>
  );
}

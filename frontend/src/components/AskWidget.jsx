import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function renderWithLinks(text) {
  return text.split("\n").map((line, li) => {
    const clean = line.replace(/^#{1,3}\s*/, "").replace(/^[-*]\s+/, "• ").replace(/^---+$/, "");
    if (!clean.trim()) return null;
    const parts = clean.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g).map((p, i) => {
      const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link && link[2].startsWith("/")) {
        return <Link key={i} to={link[2]} className="text-terra font-semibold underline underline-offset-2">{link[1]}</Link>;
      }
      const bold = p.match(/^\*\*([^*]+)\*\*$/);
      if (bold) return <strong key={i}>{bold[1]}</strong>;
      const italic = p.match(/^\*([^*]+)\*$/);
      if (italic) return <em key={i} className="text-subtlew">{italic[1]}</em>;
      return <span key={i}>{p}</span>;
    });
    return <span key={li} className="block mb-1.5 last:mb-0">{parts}</span>;
  });
}

export function AskWidget() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const sessionRef = useRef(localStorage.getItem("jb-ask-session") || (() => {
    const id = crypto.randomUUID();
    localStorage.setItem("jb-ask-session", id);
    return id;
  })());

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const ask = async (question) => {
    const q = (question ?? input).trim();
    if (!q || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text: q }, { role: "assistant", text: "" }]);
    try {
      const res = await fetch(`${BACKEND_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, lang, session_id: sessionRef.current }),
      });
      if (!res.ok) throw new Error("bad status");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6);
          if (payload === "[DONE]") break;
          const parsed = JSON.parse(payload);
          if (parsed.error) throw new Error("stream error");
          if (parsed.t) {
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { role: "assistant", text: copy[copy.length - 1].text + parsed.t };
              return copy;
            });
          }
        }
      }
    } catch {
      setMessages((m) => m.slice(0, -1));
      toast.error(t.ask.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={() => setOpen(true)}
        data-testid="ask-archive-button"
        className={`fixed bottom-6 left-6 z-[60] items-center gap-2.5 rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-cream shadow-[0_16px_40px_rgb(0,0,0,0.18)] hover:bg-terra transition-colors duration-300 ${open ? "hidden" : "flex"}`}
      >
        <MessageCircle size={16} />
        {t.ask.button}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-testid="ask-panel"
            className="fixed bottom-6 left-6 z-[60] flex h-[540px] w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-linew bg-surface shadow-[0_30px_80px_rgb(0,0,0,0.22)]"
          >
            <div className="flex items-start justify-between border-b border-linew bg-cardw px-5 py-4">
              <div>
                <p className="font-serif text-lg font-medium text-ink">{t.ask.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-subtlew">{t.ask.sub}</p>
              </div>
              <button onClick={() => setOpen(false)} data-testid="ask-close-button" className="rounded-full border border-linew p-1.5 text-mutedw hover:text-terra transition-colors" aria-label="Close">
                <X size={14} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4" data-testid="ask-messages">
              {messages.length === 0 && (
                <div className="pt-2">
                  <div className="flex flex-col gap-2">
                    {t.ask.suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => ask(s)}
                        data-testid={`ask-suggestion-${s.slice(0, 20).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="rounded-2xl border border-linew bg-cream px-4 py-3 text-left text-[13px] text-mutedw hover:border-terra/40 hover:text-terra transition-colors duration-300"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[13px] leading-relaxed text-cream"
                        : "max-w-[92%] rounded-2xl rounded-bl-md border border-linew bg-cream px-4 py-2.5 text-[13px] leading-relaxed text-ink"
                    }
                    data-testid={m.role === "user" ? `ask-user-message-${i}` : `ask-assistant-message-${i}`}
                  >
                    {m.text
                      ? m.role === "assistant"
                        ? renderWithLinks(m.text)
                        : m.text
                      : busy && i === messages.length - 1
                        ? <span className="inline-flex items-center gap-2 text-subtlew"><Loader2 size={12} className="animate-spin" />{t.ask.thinking}</span>
                        : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-linew px-4 py-3">
              <form onSubmit={(e) => { e.preventDefault(); ask(); }} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.ask.placeholder}
                  data-testid="ask-input"
                  className="flex-1 rounded-full border border-linew bg-cream px-4 py-2.5 text-[13px] text-ink placeholder:text-subtlew outline-none focus:border-terra/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  data-testid="ask-send-button"
                  className="rounded-full bg-terra p-2.5 text-cream hover:bg-ink disabled:opacity-50 transition-colors"
                  aria-label="Send"
                >
                  {busy ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </form>
              <p className="mt-2 px-1 text-[10px] leading-snug text-subtlew">{t.ask.disclaimer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState } from "react";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function NewsletterForm() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await axios.post(`${API}/newsletter`, { email, lang });
      toast.success(t.newsletter.success);
      setEmail("");
    } catch {
      toast.error(t.newsletter.error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full lg:w-auto">
      <form onSubmit={submit} data-testid="newsletter-form" className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.newsletter.placeholder}
          data-testid="newsletter-email-input"
          className="w-full sm:w-72 rounded-full border border-linew bg-surface px-5 py-3 text-sm text-ink placeholder:text-subtlew outline-none focus:border-terra/60 focus:ring-2 focus:ring-terra/15 transition-all duration-300"
        />
        <button
          type="submit"
          disabled={busy}
          data-testid="newsletter-submit-button"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-terra px-6 py-3 text-sm font-semibold text-cream hover:bg-ink disabled:opacity-60 transition-colors duration-300"
        >
          {busy ? t.newsletter.sending : t.newsletter.button}
          {busy ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
        </button>
      </form>
      <p className="mt-3 text-[11px] text-subtlew">{t.newsletter.note}</p>
    </div>
  );
}

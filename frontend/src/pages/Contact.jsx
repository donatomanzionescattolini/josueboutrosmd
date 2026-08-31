import { useState } from "react";
import axios from "axios";
import { Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";
import { Reveal, Eyebrow } from "../components/Reveal";
import { useSEO } from "../hooks/useSEO";
import { LINKS } from "../data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const { t, lang } = useLang();
  useSEO(t.seo.contact.title, t.seo.contact.desc);
  const [form, setForm] = useState({ name: "", email: "", inquiry_type: "patient", message: "" });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, { ...form, lang });
      toast.success(t.contact.success);
      setForm({ name: "", email: "", inquiry_type: "patient", message: "" });
    } catch {
      toast.error(t.contact.error);
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-linew bg-surface px-5 py-3.5 text-sm sm:text-base text-ink placeholder:text-subtlew outline-none focus:border-terra/60 focus:ring-2 focus:ring-terra/15 transition-all duration-300";

  return (
    <div className="pt-36 sm:pt-44" data-testid="contact-page">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-ink leading-[1.08]">
              {t.contact.title}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-mutedw">{t.contact.sub}</p>
            <div className="mt-10 space-y-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtlew mb-1.5">{t.contact.direct}</p>
                <a href={`mailto:${LINKS.email}`} data-testid="contact-email-link" className="inline-flex items-center gap-2 text-terra font-semibold hover:underline">
                  <Mail size={15} /> {LINKS.email}
                </a>
              </div>
              <p className="flex items-center gap-2 text-sm text-mutedw">
                <MapPin size={14} className="text-terra" /> {t.contact.location}
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.12}>
            <form
              onSubmit={submit}
              data-testid="contact-inquiry-form"
              className="rounded-3xl border border-linew bg-surface p-7 sm:p-10 shadow-[0_20px_60px_rgb(0,0,0,0.05)]"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="block">
                  <span className="mb-2 block text-[13px] font-semibold text-ink">{t.contact.name}</span>
                  <input required data-testid="contact-name-input" value={form.name} onChange={set("name")} placeholder={t.contact.namePh} className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-[13px] font-semibold text-ink">{t.contact.email}</span>
                  <input required type="email" data-testid="contact-email-input" value={form.email} onChange={set("email")} placeholder={t.contact.emailPh} className={inputCls} />
                </label>
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-[13px] font-semibold text-ink">{t.contact.type}</span>
                <select data-testid="contact-type-select" value={form.inquiry_type} onChange={set("inquiry_type")} className={inputCls}>
                  {Object.entries(t.contact.types).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="mt-5 block">
                <span className="mb-2 block text-[13px] font-semibold text-ink">{t.contact.message}</span>
                <textarea required rows={6} data-testid="contact-message-input" value={form.message} onChange={set("message")} placeholder={t.contact.messagePh} className={`${inputCls} resize-none`} />
              </label>
              <button
                type="submit"
                disabled={sending}
                data-testid="contact-submit-button"
                className="mt-7 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-terra px-8 py-4 text-sm font-semibold text-cream hover:bg-ink disabled:opacity-60 transition-colors duration-300"
              >
                {sending ? t.contact.sending : t.contact.send}
                <Send size={14} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

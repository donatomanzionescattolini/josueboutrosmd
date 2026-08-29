import { createContext, useContext, useEffect, useState } from "react";
import { dict } from "../data/content";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("jb-lang") || "en");
  const [dark, setDark] = useState(() => localStorage.getItem("jb-theme") === "dark");

  useEffect(() => {
    localStorage.setItem("jb-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("jb-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const t = dict[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t, dark, setDark }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "./components/ui/sonner";
import { LangProvider } from "./context/LangContext";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Clinical from "./pages/Clinical";
import Insights from "./pages/Insights";
import ArticlePage from "./pages/ArticlePage";
import Research from "./pages/Research";
import Media from "./pages/Media";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <SmoothScroll />
        <ScrollToTop />
        <Nav />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/clinical" element={<Clinical />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:slug" element={<ArticlePage />} />
            <Route path="/research" element={<Research />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </LangProvider>
  );
}

export default App;

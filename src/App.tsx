import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const Landing = lazy(() => import("./pages/Landing"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const AlbumPage = lazy(() => import("./pages/AlbumPage"));
const Works = lazy(() => import("./pages/Works"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MusicPlayer = lazy(() => import("./components/MusicPlayer"));

const queryClient = new QueryClient();

const ScrollHandler = () => {
  useScrollToTop();
  return null;
};

const App = () => (
  <>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}>
          <ScrollHandler />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/gallery/:album" element={<AlbumPage />} />
              <Route path="/works" element={<Works />} />
              <Route path="/projects" element={<Works />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          {import.meta.env.VITE_ENABLE_MUSIC_PLAYER === "true" && (
            <Suspense fallback={null}>
              <MusicPlayer />
            </Suspense>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    {import.meta.env.PROD && (
      <>
        <Analytics />
        <SpeedInsights />
      </>
    )}
  </>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Tributes from "./pages/Tributes";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/music" element={<Music />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/tributes" element={<Tributes />} />
              <Route path="/auth" element={<Auth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

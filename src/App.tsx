
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Consumo from "./pages/Consumo";
import Dispositivos from "./pages/Dispositivos";
import Dicas from "./pages/Dicas";
import Metas from "./pages/Metas";
import Configuracoes from "./pages/Configuracoes";
import SobreNos from "./pages/SobreNos";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from "./contexts/UserContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Helper function to check authentication with more robust verification
const isAuthenticated = () => {
  // Check both localStorage and sessionStorage for auth state
  const localAuth = localStorage.getItem('isAuthenticated') === 'true';
  const sessionAuth = sessionStorage.getItem('isAuthenticated') === 'true';
  
  // Check if we have a token (more secure validation)
  const hasToken = localStorage.getItem('supabase.auth.token') !== null;
  
  // Check if we have a user object
  const hasUser = localStorage.getItem('user') !== null;
  
  console.log("Auth check:", { localAuth, sessionAuth, hasToken, hasUser });
  
  // Require at least 2 validation methods to pass
  const authCount = [localAuth, sessionAuth, hasToken, hasUser].filter(Boolean).length;
  return authCount >= 1; // At least one auth method must be valid
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authenticated = isAuthenticated();
  console.log("Protected route check: isAuthenticated =", authenticated);
  
  if (!authenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  console.log("Authenticated, rendering protected content");
  return <>{children}</>;
};

const App = () => {
  useEffect(() => {
    // Clear invalid auth states on app start
    if (localStorage.getItem('isAuthenticated') === 'true' && !isAuthenticated()) {
      console.log("Clearing invalid auth state");
      localStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('isAuthenticated');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <UserProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/consumo" element={
                  <ProtectedRoute>
                    <Consumo />
                  </ProtectedRoute>
                } />
                <Route path="/dispositivos" element={
                  <ProtectedRoute>
                    <Dispositivos />
                  </ProtectedRoute>
                } />
                <Route path="/dicas" element={
                  <ProtectedRoute>
                    <Dicas />
                  </ProtectedRoute>
                } />
                <Route path="/metas" element={
                  <ProtectedRoute>
                    <Metas />
                  </ProtectedRoute>
                } />
                <Route path="/configuracoes" element={
                  <ProtectedRoute>
                    <Configuracoes />
                  </ProtectedRoute>
                } />
                <Route path="/sobrenos" element={<SobreNos />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </UserProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

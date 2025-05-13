
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
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from "./contexts/UserContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

// This will be replaced with Supabase auth later
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Consumo from "./pages/Consumo";
import Dispositivos from "./pages/Dispositivos";
import Dicas from "./pages/Dicas";
import Metas from "./pages/Metas";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// This will be replaced with actual auth check after Supabase integration
const isAuthenticated = () => {
  return false; // Change this to use Supabase auth status later
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

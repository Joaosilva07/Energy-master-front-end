
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleReturnHome = () => {
    navigate(isAuthenticated ? '/' : '/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Oops! Página não encontrada</h2>
          <p className="text-muted-foreground">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        
        <div className="pt-4">
          <Button
            onClick={handleReturnHome}
            className="gap-2"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para {isAuthenticated ? 'Dashboard' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

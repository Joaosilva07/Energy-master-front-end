import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useUser();

  // Check if we have saved credentials in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Handle "Remember Me" functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        // If remember me is not checked, clear any saved credentials
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Convert Supabase user to our User type
        const userData = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata.name || '',
          role: data.user.role || 'user'
        };
        
        setUser(userData);
        
        toast({
          title: 'Login bem-sucedido!',
          description: `Bem-vindo, ${userData.name || userData.email}!`,
        });

        // Set authentication state in localStorage and sessionStorage
        localStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log("Login successful, navigating to user-home...");
        
        // Use navigate with replace option to prevent going back to login
        navigate('/user-home', { replace: true });
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao tentar fazer login',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Back to Home Button */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-4 left-4 z-10 flex items-center gap-2 text-sm font-medium hover:text-energy-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para Home
      </button>

      {/* Left Side - Login Form */}
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Bem vindo, Mestre!!</h2>
            <p className="text-muted-foreground">Coloque suas informações para inciarmos!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Coloque seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                    disabled={isLoading}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Senha</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Coloque sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => {
                    if (typeof checked === 'boolean') {
                      setRememberMe(checked);
                    }
                  }}
                />
                <label htmlFor="remember" className="text-sm">
                  Lembrar de mim 
                </label>
              </div>
              <Button
                type="button"
                variant="link"
                className="text-sm text-energy-primary"
                onClick={() => navigate('/forgot-password')}
                disabled={isLoading}
              >
                Esqueceu a senha?
              </Button>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-energy-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Welcome Banner */}
      <div className="w-1/2 bg-energy-primary p-8 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Novo aqui?</h1>
        <p className="mb-8">Registre-se e conheça nossa plataforma.</p>
        <Button
          variant="outline"
          className="text-black border-white hover:bg-white hover:text-energy-primary"
          onClick={() => navigate('/signup')}
        >
          Registrar
        </Button>
      </div>
    </div>
  );
};

export default Login;


import { useState } from 'react';
import { Eye, EyeOff, Facebook, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Auth logic will be implemented here after Supabase integration
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">USERNAME</label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">PASSWORD</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
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
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm">
                  Remember Me
                </label>
              </div>
              <Button
                type="button"
                variant="link"
                className="text-sm text-energy-primary"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Button>
            </div>

            <Button type="submit" className="w-full bg-energy-primary">
              Sign In
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Welcome Banner */}
      <div className="w-1/2 bg-energy-primary p-8 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to login</h1>
        <p className="mb-8">Don't have an account?</p>
        <Button
          variant="outline"
          className="text-white border-white hover:bg-white hover:text-energy-primary"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;

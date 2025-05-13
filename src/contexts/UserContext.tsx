
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { useToast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  logout: () => Promise<void>;
  session: Session | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for active session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session) {
        // Convert Supabase user to our User type
        const userData: User = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata.name || '',
          role: session.user.role || 'user'
        };
        setUser(userData);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        localStorage.removeItem('isAuthenticated');
      }
      
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        
        if (newSession) {
          // Convert Supabase user to our User type
          const userData: User = {
            id: newSession.user.id,
            email: newSession.user.email || '',
            name: newSession.user.user_metadata.name || '',
            role: newSession.user.role || 'user'
          };
          setUser(userData);
          localStorage.setItem('isAuthenticated', 'true');
        } else {
          setUser(null);
          localStorage.removeItem('isAuthenticated');
        }
        
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
      
      toast({
        title: "Logout bem-sucedido",
        description: "Você foi desconectado com sucesso.",
      });
    } catch (error) {
      console.error('Error logging out:', error);
      
      toast({
        title: "Erro ao sair",
        description: "Ocorreu um erro ao tentar sair. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, logout, session }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

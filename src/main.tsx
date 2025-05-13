
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeDatabase } from './lib/supabase'

// Try to initialize the database
initializeDatabase()
  .then((result) => {
    console.log('Database initialization result:', result);
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
  });

createRoot(document.getElementById("root")!).render(<App />);

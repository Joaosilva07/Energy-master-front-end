
import React from 'react';
import { Cloud, CloudOff } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  return (
    <div className={`flex items-center justify-center p-4 
      ${isConnected ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-800'} 
      rounded-lg`}
    >
      {isConnected ? (
        <>
          <Cloud className="h-8 w-8 text-green-600 dark:text-green-400" />
          <span className="ml-2 font-medium text-green-600 dark:text-green-400">Conectado à nuvem</span>
        </>
      ) : (
        <>
          <CloudOff className="h-8 w-8 text-gray-600 dark:text-gray-400" />
          <span className="ml-2 font-medium text-gray-600 dark:text-gray-400">Desconectado da nuvem</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;


import { useState } from 'react';
import { executeAIMigration } from '../database/executeMigration';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook for managing AI feature database migrations
 * This would typically be used in an admin interface
 */
export const useDataMigration = () => {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const { toast } = useToast();

  const runAIMigration = async () => {
    setIsMigrating(true);
    
    try {
      const result = await executeAIMigration();
      
      setMigrationStatus(result);
      
      toast({
        title: result.success ? "Migration Successful" : "Migration Note",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
      
    } catch (error) {
      console.error('Migration error:', error);
      
      setMigrationStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
      
      toast({
        title: "Migration Failed",
        description: "Failed to execute database migration. See console for details.",
        variant: "destructive",
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return {
    runAIMigration,
    isMigrating,
    migrationStatus
  };
};

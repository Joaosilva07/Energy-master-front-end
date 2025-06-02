
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useDataMigration } from '@/ai-processing/hooks/useDataMigration';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, AlertCircle, CheckCircle2 } from 'lucide-react';

const AIFeatureMigrationPanel = () => {
  const { runAIMigration, isMigrating, migrationStatus } = useDataMigration();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          AI Features Database Migration
        </CardTitle>
        <CardDescription>
          Set up the database tables required for AI energy analysis features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Information</AlertTitle>
            <AlertDescription>
              This migration will create the following tables in your Supabase database:
              <ul className="list-disc pl-6 mt-2">
                <li>consumption_history - For storing device energy consumption data</li>
                <li>ai_insights - For AI-generated insights about consumption patterns</li>
                <li>optimization_plans - For energy usage optimization plans</li>
                <li>optimization_actions - For specific device actions within plans</li>
              </ul>
            </AlertDescription>
          </Alert>

          {migrationStatus.message && (
            <Alert variant={migrationStatus.success ? "default" : "destructive"}>
              {migrationStatus.success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {migrationStatus.success ? "Success" : "Migration Note"}
              </AlertTitle>
              <AlertDescription>{migrationStatus.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={runAIMigration}
          disabled={isMigrating}
        >
          {isMigrating ? "Running Migration..." : "Run AI Tables Migration"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIFeatureMigrationPanel;

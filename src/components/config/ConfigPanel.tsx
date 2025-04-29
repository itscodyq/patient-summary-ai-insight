
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { initializeDbConnection, isDatabaseConnected, DbConfig, getDbConfig } from '@/services/dbService';
import { initializeOllama, isOllamaAvailable, OllamaConfig, getOllamaConfig } from '@/services/ollamaService';
import { useToast } from '@/components/ui/use-toast';
import { Database, User } from 'lucide-react';

const ConfigPanel: React.FC = () => {
  const { toast } = useToast();
  const [dbConfig, setDbConfig] = useState<DbConfig>({
    server: 'localhost',
    database: 'EHR',
    port: 1433,
    username: '',
    password: '',
    trustedConnection: true,
  });

  const [ollamaConfig, setOllamaConfig] = useState<OllamaConfig>({
    endpoint: 'http://localhost:11434',
    model: 'llama2',
    temperature: 0.7,
  });

  const [dbConnected, setDbConnected] = useState(false);
  const [aiConnected, setAiConnected] = useState(false);

  useEffect(() => {
    // Check if connections are already initialized
    setDbConnected(isDatabaseConnected());
    
    const checkAiConnection = async () => {
      const available = await isOllamaAvailable();
      setAiConnected(available);
    };
    
    checkAiConnection();
    
    // Load saved config if available
    const savedDbConfig = getDbConfig();
    if (savedDbConfig) {
      setDbConfig(savedDbConfig);
    }
    
    const savedOllamaConfig = getOllamaConfig();
    if (savedOllamaConfig) {
      setOllamaConfig(savedOllamaConfig);
    }
  }, []);

  const handleDatabaseConnect = () => {
    try {
      const success = initializeDbConnection(dbConfig);
      setDbConnected(success);
      
      if (success) {
        toast({
          title: "Connection Successful",
          description: `Connected to database ${dbConfig.database} on ${dbConfig.server}`,
        });
        
        // Save config to localStorage
        localStorage.setItem('dbConfig', JSON.stringify(dbConfig));
      } else {
        toast({
          title: "Connection Failed",
          description: "Could not connect to database. Check your settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to the database.",
        variant: "destructive",
      });
    }
  };

  const handleOllamaConnect = async () => {
    try {
      const success = initializeOllama(ollamaConfig);
      
      if (success) {
        const available = await isOllamaAvailable();
        setAiConnected(available);
        
        if (available) {
          toast({
            title: "AI Connection Successful",
            description: `Connected to Ollama with model: ${ollamaConfig.model}`,
          });
          
          // Save config to localStorage
          localStorage.setItem('ollamaConfig', JSON.stringify(ollamaConfig));
        } else {
          toast({
            title: "AI Connection Failed",
            description: "Could not connect to Ollama. Check your endpoint.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "AI Connection Error",
        description: "An error occurred while connecting to Ollama.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Settings & Configuration</CardTitle>
        <CardDescription>
          Configure database and AI connections to use with patient data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="database">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="database">
              <Database className="h-4 w-4 mr-2" />
              Database
            </TabsTrigger>
            <TabsTrigger value="ai">
              <User className="h-4 w-4 mr-2" />
              AI Service
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="database" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="server">SQL Server</Label>
                  <Input
                    id="server"
                    placeholder="localhost"
                    value={dbConfig.server}
                    onChange={(e) => setDbConfig({...dbConfig, server: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="database">Database Name</Label>
                  <Input
                    id="database"
                    placeholder="EHR"
                    value={dbConfig.database}
                    onChange={(e) => setDbConfig({...dbConfig, database: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    placeholder="1433"
                    type="number"
                    value={dbConfig.port?.toString()}
                    onChange={(e) => setDbConfig({...dbConfig, port: parseInt(e.target.value) || 1433})}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch 
                    id="trusted-connection"
                    checked={dbConfig.trustedConnection}
                    onCheckedChange={(checked) => setDbConfig({...dbConfig, trustedConnection: checked})}
                  />
                  <Label htmlFor="trusted-connection">Use Windows Authentication</Label>
                </div>
              </div>
              
              {!dbConfig.trustedConnection && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Database Username"
                      value={dbConfig.username}
                      onChange={(e) => setDbConfig({...dbConfig, username: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Database Password"
                      value={dbConfig.password}
                      onChange={(e) => setDbConfig({...dbConfig, password: e.target.value})}
                    />
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleDatabaseConnect}
                className="w-full"
                variant={dbConnected ? "outline" : "default"}
              >
                {dbConnected ? 'Reconnect Database' : 'Connect to Database'}
              </Button>
              
              {dbConnected && (
                <div className="flex items-center p-2 bg-green-50 text-green-800 rounded-md border border-green-200">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Connected to {dbConfig.database} on {dbConfig.server}</span>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="endpoint">Ollama Endpoint</Label>
                <Input
                  id="endpoint"
                  placeholder="http://localhost:11434"
                  value={ollamaConfig.endpoint}
                  onChange={(e) => setOllamaConfig({...ollamaConfig, endpoint: e.target.value})}
                />
                <p className="text-xs text-gray-500">The URL where your Ollama instance is running</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    placeholder="llama2"
                    value={ollamaConfig.model}
                    onChange={(e) => setOllamaConfig({...ollamaConfig, model: e.target.value})}
                  />
                  <p className="text-xs text-gray-500">Model name (e.g., llama2, mistral, openhermes)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    placeholder="0.7"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={ollamaConfig.temperature?.toString()}
                    onChange={(e) => setOllamaConfig({...ollamaConfig, temperature: parseFloat(e.target.value) || 0.7})}
                  />
                  <p className="text-xs text-gray-500">Controls randomness (0-1)</p>
                </div>
              </div>
              
              <Button 
                onClick={handleOllamaConnect}
                className="w-full"
                variant={aiConnected ? "outline" : "default"}
              >
                {aiConnected ? 'Reconnect AI Service' : 'Connect to Ollama'}
              </Button>
              
              {aiConnected ? (
                <div className="flex items-center p-2 bg-green-50 text-green-800 rounded-md border border-green-200">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Connected to Ollama using {ollamaConfig.model} model</span>
                </div>
              ) : (
                <div className="text-sm text-gray-600 p-2">
                  <p>Make sure Ollama is running on your local machine or network.</p>
                  <p className="mt-1">You can install Ollama from <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ollama.ai</a></p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConfigPanel;

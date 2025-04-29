
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope, User } from 'lucide-react';
import { loginWithMicrosoftSSO, isAuthenticated } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const LoginPage: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleMicrosoftLogin = async () => {
    setIsLoggingIn(true);
    
    try {
      const user = await loginWithMicrosoftSSO();
      
      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.displayName}`,
        });
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Could not authenticate with Microsoft",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Authentication Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-full bg-medical-700 text-white mb-4">
            <Stethoscope className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Summary AI</h1>
          <p className="text-gray-600 mt-2">Log in to access patient records</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Provider Login</CardTitle>
            <CardDescription>
              Authenticate with your organization credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full py-6 flex justify-center items-center gap-2"
              onClick={handleMicrosoftLogin}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-medical-700"></div>
              ) : (
                <User className="h-5 w-5 text-blue-600" />
              )}
              <span>{isLoggingIn ? 'Authenticating...' : 'Sign in with Microsoft'}</span>
            </Button>

            <div className="text-center text-sm text-gray-500 pt-4">
              <p>This application requires authentication.</p>
              <p>SSO integration with Microsoft/Azure Active Directory.</p>
            </div>
          </CardContent>
          <CardFooter className="text-center text-xs text-gray-500">
            <p className="w-full">© 2025 Patient Summary AI - Secure Health Information</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;

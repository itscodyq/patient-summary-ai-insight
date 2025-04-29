
import React from 'react';
import { Stethoscope } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-medical-700 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Stethoscope className="h-6 w-6" />
            <h1 className="text-xl font-bold">Patient Summary AI</h1>
          </div>
          <div className="text-sm">
            Provider Portal
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6 px-4">
        {children}
      </main>
      <footer className="bg-gray-100 py-4 px-6 border-t">
        <div className="container mx-auto text-center text-sm text-gray-600">
          <p>© 2025 Patient Summary AI - Open Source EHR Assistant</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

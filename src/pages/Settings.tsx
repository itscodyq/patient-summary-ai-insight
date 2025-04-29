
import React from 'react';
import Layout from '@/components/layout/Layout';
import ConfigPanel from '@/components/config/ConfigPanel';

const Settings = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
        <p className="text-gray-600">
          Configure database connections and AI services
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ConfigPanel />
      </div>
    </Layout>
  );
};

export default Settings;

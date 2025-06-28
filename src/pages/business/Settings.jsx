import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

const Settings = () => {
  const user = getAuth().currentUser;

  const handleLogout = async () => {
    await signOut(getAuth());
    window.location.href = '/business/login';
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please log in to view your settings.</div>;
  }

  return (
    <div className="container mx-auto pt-32 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">Account settings and preferences will be available here soon.</p>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings; 
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BusinessNavbar from '../../components/Navbar/BusinessNavbar';
import { signIn } from '../../firebase/auth';

const BusinessLogin = () => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  React.useEffect(() => {
    if (location.state && location.state.signupSuccess) {
      setSuccessMessage('Account created! You can now log in.');
    }
  }, [location.state]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn && email && password) {
      try {
        setIsSigningIn(true);
        setErrorMessage('');
        await signIn(email, password);
        navigate('/business/dashboard', { replace: true });
      } catch (error) {
        setErrorMessage(error.message || 'An error occurred during login. Please try again.');
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      <BusinessNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Business Login</h1>
                <p className="text-gray-600 dark:text-gray-400">Access your business dashboard</p>
              </div>

              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your business email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <input
                    type="hidden"
                    value="brand"
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none dark:bg-gray-700 dark:text-white"
                    style={{ 
                      backgroundColor: '#f5f5f5',
                      cursor: 'not-allowed',
                      opacity: 0.7
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
                >
                  {isSigningIn ? 'Logging in...' : 'Login'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have a business account?{' '}
                  <Link to="/business/signup" className="text-purple-600 hover:text-purple-500 font-semibold">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessLogin;
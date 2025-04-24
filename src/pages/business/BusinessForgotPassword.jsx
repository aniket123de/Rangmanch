import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { doSendPasswordResetEmail } from '../../firebase/auth';
import BusinessNavbar from '../../components/Navbar/BusinessNavbar';

const BusinessForgotPassword = () => {
  const { isDark } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      setMessage({ type: '', text: '' });
      await doSendPasswordResetEmail(email);
      setMessage({
        type: 'success',
        text: 'Password reset link has been sent to your business email!'
      });
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message
      });
    } finally {
      setIsLoading(false);
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Password</h1>
                <p className="text-gray-600 dark:text-gray-400">Enter your business email to reset your password</p>
              </div>

              {message.text && (
                <div
                  className={`${
                    message.type === 'success'
                      ? 'bg-green-100 border-green-400 text-green-700'
                      : 'bg-red-100 border-red-400 text-red-700'
                  } px-4 py-3 rounded relative mb-6`}
                  role="alert"
                >
                  <span className="block sm:inline">{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Remember your password?{' '}
                  <Link to="/business/login" className="text-purple-600 hover:text-purple-500 font-semibold">
                    Sign in
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

export default BusinessForgotPassword; 
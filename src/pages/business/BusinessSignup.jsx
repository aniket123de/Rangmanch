import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useBusinessAuth } from './businessAuthContext';
import BusinessNavbar from '../../components/Navbar/BusinessNavbar';
import { supabase } from './supabaseClient';

const BusinessSignup = () => {
  const { isDark } = useContext(ThemeContext);
  const { signup, currentUser, loading: authLoading } = useBusinessAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    location: '',
    email: '',
    password: '',
    confirmPassword: '',
    website: '',
    linkedin: '',
    instagram: '',
    twitter: '',
    businessSize: '',
    yearsInBusiness: ''
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    hasLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const checkPasswordStrength = (password) => {
    const strength = {
      score: 0,
      hasLength: password.length >= 8 && password.length <= 16,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    if (strength.hasLength) strength.score++;
    if (strength.hasUppercase) strength.score++;
    if (strength.hasLowercase) strength.score++;
    if (strength.hasNumber) strength.score++;
    if (strength.hasSpecial) strength.score++;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    const { score } = passwordStrength;
    if (score <= 2) return '#ef4444';
    if (score <= 4) return '#eab308';
    return '#22c55e';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSigningUp || cooldown > 0) {
      return;
    }

    if (formData.email && formData.password) {
      if (!validateEmail(formData.email)) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      if (formData.password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }

      try {
        setIsSigningUp(true);
        setErrorMessage('');
        setSuccessMessage('');

        const businessInfo = {
          businessName: formData.businessName,
          industry: formData.industry,
          location: formData.location,
          website: formData.website,
          linkedin: formData.linkedin,
          instagram: formData.instagram,
          twitter: formData.twitter,
          businessSize: formData.businessSize,
          yearsInBusiness: formData.yearsInBusiness
        };

        // Create user in Supabase Auth
        const user = await signup(formData.email, formData.password, businessInfo);

        // Get the user ID (from returned user or from session)
        let userId = user?.id;
        if (!userId) {
          const { data: { session } } = await supabase.auth.getSession();
          userId = session?.user?.id;
        }

        // Insert business info into business_profiles table
        if (userId) {
          await supabase.from('business_profiles').upsert({
            user_id: userId,
            business_name: formData.businessName,
            industry: formData.industry,
            location: formData.location,
            website: formData.website,
            linkedin: formData.linkedin,
            instagram: formData.instagram,
            twitter: formData.twitter,
            business_size: formData.businessSize,
            years_in_business: formData.yearsInBusiness,
            email: formData.email
          });
        }

        if (!userId) {
          setSuccessMessage('Account created! Please check your email to confirm, then log in.');
        } else {
          setSuccessMessage('Account created! Please check your email to confirm, then log in.');
          setTimeout(() => {
            navigate('/business/login', { state: { signupSuccess: true } });
          }, 2000);
        }
      } catch (error) {
        if (error.message.includes('Email rate limit exceeded')) {
          setErrorMessage(`Too many signup attempts. Please try again in ${cooldown || 14} seconds.`);
          setCooldown(14);
        } else if (error.message.includes('User already registered')) {
          setErrorMessage('This email is already registered. Please log in instead.');
        } else if (error.message.includes('Password should be at least 6 characters')) {
          setErrorMessage('Password must be at least 6 characters long.');
        } else if (error.message.includes('invalid')) {
          setErrorMessage('Please enter a valid email address.');
        } else {
          setErrorMessage(error.message || 'An error occurred during signup. Please try again.');
        }
      } finally {
        setIsSigningUp(false);
      }
    }
  };

  if (!authLoading && currentUser) {
    return <Navigate to="/business/dashboard" replace={true} />;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <BusinessNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-300 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Business Sign Up</h1>
                <p className="text-gray-600 dark:text-gray-400">Create your business account</p>
              </div>

              {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                  <span className="block sm:inline">{successMessage}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your business name"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your industry"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your location"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your business email"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Create a password"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                    {formData.password && (
                      <div className="mt-2">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${(passwordStrength.score / 5) * 100}%`,
                              backgroundColor: getPasswordStrengthColor()
                            }}
                          />
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <ul className="list-disc list-inside">
                            <li className={passwordStrength.hasLength ? 'text-green-500' : ''}>8-16 characters</li>
                            <li className={passwordStrength.hasUppercase ? 'text-green-500' : ''}>One uppercase letter</li>
                            <li className={passwordStrength.hasLowercase ? 'text-green-500' : ''}>One lowercase letter</li>
                            <li className={passwordStrength.hasNumber ? 'text-green-500' : ''}>One number</li>
                            <li className={passwordStrength.hasSpecial ? 'text-green-500' : ''}>One special character</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Confirm your password"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your website URL"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">LinkedIn</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your LinkedIn profile"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Instagram</label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your Instagram handle"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Twitter</label>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your Twitter handle"
                      disabled={isSigningUp || cooldown > 0}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Size</label>
                    <select
                      name="businessSize"
                      value={formData.businessSize}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    >
                      <option value="">Select business size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Years in Business</label>
                    <select
                      name="yearsInBusiness"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                      required
                      disabled={isSigningUp || cooldown > 0}
                    >
                      <option value="">Select years in business</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSigningUp || cooldown > 0}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50"
                >
                  {isSigningUp ? 'Creating Account...' : cooldown > 0 ? `Retry in ${cooldown}s` : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Already have a business account?{' '}
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

export default BusinessSignup;
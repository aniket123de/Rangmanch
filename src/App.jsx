import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import BusinessNavbar from "./components/Navbar/BusinessNavbar";
import Hero from "./components/Hero/Hero";
import Brands from "./components/Brands/Brands";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import Banner2 from "./components/Banner/Banner2";
import Testimonial from "./components/Testimonial/Testimonial";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";
import ForBusiness from "./pages/ForBusiness";
import BusinessLogin from "./pages/business/BusinessLogin";
import BusinessSignup from "./pages/business/BusinessSignup";
import BusinessForgotPassword from "./pages/business/BusinessForgotPassword";
import BusinessDashboard from "./pages/business/BusinessDashboard";
import About from "./pages/About";
import ContentSuggestion from "./pages/ContentSuggestion";
import FAQ from "./pages/FAQ";
import TNC from "./pages/TNC";
import PP from "./pages/PP";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import Offers from "./pages/Offers";
import SentimentAnalysis from "./pages/SentimentAnalysis";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ScrollProgressBar from './components/common/ScrollProgressBar';

// Import providers
import { LoadingProvider } from './contexts/LoadingContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/authContext';
import { ChatbotProvider } from './context/ChatbotContext'; // Add this line

// Import common components
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import ChatbotButton from "./components/common/ChatbotButton";

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <div id="services">
        <Services />
      </div>
      <Banner />
      <Banner2 />
      <Testimonial />
      <div id="newsletter">
        <Newsletter />
      </div>
    </>
  );
};

// Component to conditionally render the appropriate navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const isBusinessRoute = location.pathname.startsWith('/business') || location.pathname === '/for-business';
  const isAdminRoute = location.pathname.startsWith('/admin');
   
  // Don't show navbar on admin routes
  if (isAdminRoute) {
    return null;
  }
  
  return isBusinessRoute ? <BusinessNavbar /> : <Navbar />;
};

// Component to conditionally render ScrollToTopButton
const ScrollToTopWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
   
  // Don't show ScrollToTop on admin routes
  if (isAdminRoute) {
    return null;
  }
  
  return <ScrollToTopButton />;
};

// Component to conditionally render ChatbotButton
const ChatbotWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
   
  // Don't show Chatbot on admin routes
  if (isAdminRoute) {
    return null;
  }
  
  return <ChatbotButton />;
};

// Component to conditionally render the footer
const FooterWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
   
  // Don't show footer on admin routes
  if (isAdminRoute) {
    return null;
  }
  
  return <Footer />;
};

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <LoadingProvider>
            <ChatbotProvider> {/* Add this wrapper */}
              
              <main className="overflow-x-hidden">
                <ScrollProgressBar 
                  color="#9d4edd" 
                  height={4}
                />
                <NavbarWrapper />
                <Routes>
                  {/* User Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/email-verification" element={<EmailVerification />} />
                  <Route path="/content-suggestion" element={<ContentSuggestion />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/tnc" element={<TNC />} />
                  <Route path="/PP" element={<PP />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/offers" element={<Offers />} />
                  <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
                   
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                   
                  {/* Business Routes */}
                  <Route path="/for-business" element={<ForBusiness />} />
                  <Route path="/business/login" element={<BusinessLogin />} />
                  <Route path="/business/signup" element={<BusinessSignup />} />
                  <Route path="/business/forgot-password" element={<BusinessForgotPassword />} />
                  <Route path="/business/dashboard" element={<BusinessDashboard />} />
                </Routes>
                <FooterWrapper />
                <ScrollToTopWrapper />
                <ChatbotWrapper />
              </main>
            </ChatbotProvider> {/* Close ChatbotProvider */}
          </LoadingProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
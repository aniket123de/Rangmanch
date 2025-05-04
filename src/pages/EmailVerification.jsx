import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMail, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const type = params.get("type"); // Get the type parameter to determine if it's a business verification
        
        if (!token) {
          setVerificationStatus("error");
          return;
        }

        // TODO: Make API call to verify email with token
        // const response = await verifyEmailToken(token);
        
        // Temporary simulation of verification
        setTimeout(() => {
          setVerificationStatus("success");
          // If it's a business verification, redirect to business login
          if (type === "business") {
            window.location.href = "https://rangmanch-test.vercel.app/business/login";
          }
        }, 2000);
      } catch (error) {
        console.error("Email verification failed:", error);
        setVerificationStatus("error");
      }
    };

    verifyEmail();
  }, [location]);

  const getContent = () => {
    switch (verificationStatus) {
      case "verifying":
        return {
          icon: <FiMail className="w-16 h-16 text-blue-500 animate-bounce" />,
          title: "Verifying Your Email",
          message: "Please wait while we verify your email address...",
          buttonText: null
        };
      case "success":
        return {
          icon: <FiCheckCircle className="w-16 h-16 text-green-500" />,
          title: "Email Verified!",
          message: "Your email has been successfully verified. You can now log in to your account.",
          buttonText: "Go to Login"
        };
      case "error":
        return {
          icon: <FiAlertCircle className="w-16 h-16 text-red-500" />,
          title: "Verification Failed",
          message: "We couldn't verify your email. The link may be invalid or expired.",
          buttonText: "Back to Sign Up"
        };
      default:
        return null;
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-6">
          {content.icon}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {content.title}
          </h2>
          <p className="text-center text-gray-600">{content.message}</p>
          {content.buttonText && (
            <button
              onClick={() => {
                const params = new URLSearchParams(location.search);
                const type = params.get("type");
                if (type === "business") {
                  window.location.href = "https://rangmanch-test.vercel.app/business/login";
                } else {
                  navigate(verificationStatus === "success" ? "/login" : "/signup");
                }
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {content.buttonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification; 
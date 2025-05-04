import React, { useState } from 'react';
import { FaRegClock, FaRegCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

  const pricingPlans = [
    {
      name: 'Starter',
      monthlyPrice: '₹999',
      annualPrice: '₹9,599',
      description: 'Perfect for small businesses entering the creator space',
      features: [
        'Access to 100+ creators',
        '1 campaign per month',
        'Basic analytics dashboard',
        'Email support',
        'Content usage rights (30 days)'
      ],
      cta: 'Upgrade Now',
      popular: false,
      color: 'border-[#9d4edd]'
    },
    {
      name: 'Growth',
      monthlyPrice: '₹3,999',
      annualPrice: '₹38,399',
      description: 'Ideal for growing brands looking to scale creator marketing',
      features: [
        'Access to 500+ creators',
        '3 campaigns per month',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Content usage rights (90 days)',
        'Campaign strategy consultation'
      ],
      cta: 'Upgrade Now',
      popular: true,
      color: 'border-[#c77dff]'
    },
    {
      name: 'Enterprise',
      monthlyPrice: '₹5,999',
      annualPrice: '₹57,599',
      description: 'Comprehensive solution for established brands',
      features: [
        'Unlimited access to creators',
        'Unlimited campaigns',
        'White-label reporting dashboard',
        'Priority support 24/7',
        'Perpetual content usage rights',
        'Custom contract negotiation',
        'Exclusive creator partnerships'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'border-[#ff9e00]'
    }
  ];

  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Choose Your Plan</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select the perfect plan for your brand's creator collaboration needs
        </p>
        
        <div className="flex justify-center mt-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md shadow-sm font-medium ${
                billingCycle === 'monthly' 
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-md shadow-sm font-medium ${
                billingCycle === 'annual' 
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index} 
            className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-xl ${
              plan.popular ? 'ring-2 ring-[#c77dff] transform scale-105 z-10' : 'hover:-translate-y-2'
            }`}
          >
            {plan.popular && (
              <div className="bg-gradient-to-r from-[#9d4edd] to-[#c77dff] text-white text-center py-2 text-sm font-medium">
                Most Popular
              </div>
            )}
            <div className="p-8">
              <div className={`w-12 h-12 rounded-xl ${plan.color} bg-opacity-20 dark:bg-opacity-10 flex items-center justify-center mb-4`}>
                {index === 0 ? (
                  <FaRegClock className="text-[#9d4edd] dark:text-[#c77dff]" />
                ) : index === 1 ? (
                  <FaRegCreditCard className="text-[#c77dff] dark:text-[#9d4edd]" />
                ) : (
                  <FaLock className="text-[#ff9e00] dark:text-[#ddff00]" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {billingCycle === 'monthly' ? 'per month' : 'per year (20% savings)'}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <FaCheckCircle className={`mt-1 flex-shrink-0 ${
                      index === 0 ? 'text-[#9d4edd]' : 
                      index === 1 ? 'text-[#c77dff]' : 
                      'text-[#ff9e00]'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                plan.popular 
                  ? 'bg-gradient-to-r from-[#9d4edd] to-[#c77dff] text-white hover:shadow-lg hover:shadow-[#9d4edd]/30'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}>
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pricing;
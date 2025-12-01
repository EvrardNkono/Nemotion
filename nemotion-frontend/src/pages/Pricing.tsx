import React from 'react';
import './Pricing.css';

const plans = [
  {
    name: "Demo",
    priceMonthly: 0,
    priceYearly: 0,
    features: [
      "Access to demo bot",
      "Limited trading pairs",
      "Basic support"
    ],
    highlight: false
  },
  {
    name: "Starter",
    priceMonthly: 29,
    priceYearly: 290,
    features: [
      "Full bot access",
      "Up to 10 trading pairs",
      "Email support",
      "Auto & Manual modes"
    ],
    highlight: true
  },
  {
    name: "Pro",
    priceMonthly: 59,
    priceYearly: 590,
    features: [
      "Unlimited trading pairs",
      "Priority support",
      "Advanced analytics & backtests",
      "Auto & Manual modes"
    ],
    highlight: false
  },
];

const Pricing: React.FC = () => {
  return (
    <div className="pricing-container">
      <header className="pricing-hero">
        <h1>NEmotion Pricing</h1>
        <p>Choose a plan that fits your trading style. Demo is free forever!</p>
      </header>

      <section className="plans-section">
        {plans.map((plan, idx) => (
          <div key={idx} className={`plan-card ${plan.highlight ? 'highlight' : ''}`}>
            {plan.highlight && <span className="badge">Most Popular</span>}
            <h3>{plan.name}</h3>
            <div className="prices">
              <span className="monthly">${plan.priceMonthly}/mo</span>
              <span className="yearly">${plan.priceYearly}/yr</span>
            </div>
            <ul className="features">
              {plan.features.map((f, i) => (
                <li key={i}>✅ {f}</li>
              ))}
            </ul>
            <button className="btn primary large">
              {plan.priceMonthly === 0 ? "Try for Free" : "Get Started"}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pricing;

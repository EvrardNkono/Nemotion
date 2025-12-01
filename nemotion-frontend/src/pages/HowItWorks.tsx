import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    title: "Connect Your Account",
    description: "Link your exchange account securely and get your API keys ready to start trading automatically.",
    icon: "🔗",
    mode: "Auto",
  },
  {
    title: "Choose a Strategy",
    description: "Select from pre-built strategies or create your own. Adjust risk and investment parameters.",
    icon: "⚙️",
    mode: "Auto / Manual",
  },
  {
    title: "Backtest Your Strategy",
    description: "Run your strategy on historical data to optimize performance before going live.",
    icon: "📊",
    mode: "Manual",
  },
  {
    title: "Deploy Bot",
    description: "Activate your bot with real-time trading. Monitor results directly from your dashboard.",
    icon: "🚀",
    mode: "Auto",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div className="how-container">
      <header className="how-hero">
        <h1>How NEmotion Works</h1>
        <p>Automate or manually control your trading in a few simple steps. Safe, fast, and transparent.</p>
      </header>

      <section className="steps-section">
        {steps.map((step, idx) => (
          <div key={idx} className="step-card fade-in" style={{ animationDelay: `${idx * 0.2}s` }}>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <span className={`step-badge ${step.mode === "Auto" ? "auto" : step.mode === "Manual" ? "manual" : "both"}`}>
              {step.mode}
            </span>
            <p>{step.description}</p>
          </div>
        ))}
      </section>

      <section className="cta-section">
        <h2>Ready to start trading smartly?</h2>
        <button className="btn primary large">Start Your Bot</button>
      </section>
    </div>
  );
};

export default HowItWorks;

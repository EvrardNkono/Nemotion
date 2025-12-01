import React, { useState } from 'react';
import './Home.css';
import ClassicCandleChart from '../components/ClassicCandleChart';
import { useNavigate } from 'react-router-dom';

const MarketTicker: React.FC = () => {
  const pairs = [
    { symbol: 'BTC/USD', price: '46,212', change: '+1.2%' },
    { symbol: 'ETH/USD', price: '3,212', change: '-0.4%' },
    { symbol: 'SOL/USD', price: '128', change: '+3.8%' },
  ];

  return (
    <div className="ticker">
      {pairs.map((p, idx) => (
        <div key={idx} className="ticker-item">
          <strong>{p.symbol}</strong>
          <span className="price">{p.price}</span>
          <span className={`change ${p.change.startsWith('+') ? 'up' : 'down'}`}>{p.change}</span>
        </div>
      ))}
    </div>
  );
};

const RecentTrades: React.FC = () => {
  const trades = [
    { id: 1, pair: 'BTC/USD', side: 'BUY', qty: '0.02', price: '46100' },
    { id: 2, pair: 'ETH/USD', side: 'SELL', qty: '0.5', price: '3200' },
    { id: 3, pair: 'SOL/USD', side: 'BUY', qty: '10', price: '125' },
  ];

  return (
    <div className="card trades-card">
      <h3>Recent Trades</h3>
      <ul>
        {trades.map((t) => (
          <li key={t.id}>
            <span className="trade-pair">{t.pair}</span>
            <span className={`trade-side ${t.side === 'BUY' ? 'buy' : 'sell'}`}>{t.side}</span>
            <span className="trade-meta">{t.qty} — {t.price}$</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BotPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const pnl = '+3.8%';
  const balance = '12,420$';

  return (
    <div className="card bot-panel">
      <div className="bot-header">
        <h3>NEmotion Bot</h3>
        <span className={`status ${isRunning ? 'running' : 'stopped'}`}>
          {isRunning ? 'Running' : 'Stopped'}
        </span>
      </div>

      <div className="bot-body">
        <div className="stat">
          <div className="label">Balance</div>
          <div className="value">{balance}</div>
        </div>
        <div className="stat">
          <div className="label">P&L</div>
          <div className={`value ${pnl.startsWith('+') ? 'gain' : 'loss'}`}>{pnl}</div>
        </div>
        <div className="bot-actions">
          <button className="btn primary" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button className="btn outline">Settings</button>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate(); // <-- useNavigate ici

  return (
    <div className="home container">
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>NEmotion — Smart Trading Bot</h1>
          <p className="lead">
            Rigorous backtests. Millisecond execution. Simple interface to stay in control.
          </p>
          <div className="hero-ctas">
            <button
              className="btn primary large"
              onClick={() => navigate('/trade')} // Redirige vers la page Trade
            >
              Start Bot
            </button>

            <button className="btn ghost">View Demo</button>
          </div>
        </div>

        <div className="hero-right">
          <div className="mock-chart">
            <div className="chart-header">GOLD/USD</div>
            <div className="chart-body">
              <div className="chart-wrapper">
                <ClassicCandleChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <MarketTicker />

      {/* GRID 3 */}
      <section className="grid-3">
        <BotPanel />
        <RecentTrades />
        <div className="card info-card">
          <h3>Why NEmotion?</h3>
          <ul>
            <li>Tested and transparent algorithms</li>
            <li>Configurable risk management</li>
            <li>Fast execution & real-time monitoring</li>
          </ul>
          <p className="small">Integrate a strategy, backtest, and deploy with confidence.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer card">
        <div>© {new Date().getFullYear()} NEmotion</div>
        <div className="footer-links">
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

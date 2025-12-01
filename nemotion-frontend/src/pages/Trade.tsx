import React, { useState } from 'react';
import ClassicCandleChart from '../components/ClassicCandleChart';
import './Trade.css';

const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'AUD/USD'];
const strategies = [
  'Scalping', 'Swing', 'Trend Following', 'Mean Reversion',
  'Breakout', 'Momentum', 'Grid', 'Arbitrage'
];

const intervals = ['1min', '5min', '15min', '30min', '1h', '4h', '1day'];

const Trade: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState(pairs[0]);
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[0]);
  const [interval, setInterval] = useState('1min');
  const [mode, setMode] = useState<'manual' | 'auto'>('manual');
  const [positionSize, setPositionSize] = useState(1);
  const [stopLoss, setStopLoss] = useState(0);
  const [takeProfit, setTakeProfit] = useState(0);
  const [openPositions, setOpenPositions] = useState<any[]>([]);
  const [showStrategyModal, setShowStrategyModal] = useState(false);

  const handleTrade = () => {
    const newPosition = {
      id: Date.now(),
      pair: selectedPair,
      strategy: selectedStrategy,
      size: positionSize,
      stopLoss,
      takeProfit,
      mode,
      pnl: 0,
    };
    setOpenPositions([...openPositions, newPosition]);
  };

  const openStrategyModal = () => setShowStrategyModal(true);
  const closeStrategyModal = () => setShowStrategyModal(false);
  const selectStrategy = (strategy: string) => {
    setSelectedStrategy(strategy);
    closeStrategyModal();
  };

  return (
    <div className="trade-container">
      <header className="trade-hero">
        <h1>Nemotion Trading</h1>
        <p>Trade smartly with automated or manual strategies</p>
      </header>

      <div className="trade-main">
        <div className="trade-left">
          
          {/* PAIRS BUTTONS */}
          <div className="pair-buttons">
            {pairs.map(p => (
              <button
                key={p}
                className={`pair-btn ${p === selectedPair ? 'active' : ''}`}
                onClick={() => setSelectedPair(p)}
              >
                {p}
              </button>
            ))}
          </div>

          {/* TIMEFRAME BUTTONS */}
          <div className="interval-buttons">
            {intervals.map(int => (
              <button
                key={int}
                className={`interval-btn ${int === interval ? 'active' : ''}`}
                onClick={() => setInterval(int)}
              >
                {int}
              </button>
            ))}
          </div>

          {/* CANDLE CHART */}
          <div className="chart-wrapper">
            <ClassicCandleChart pair={selectedPair} interval={interval} />
          </div>
        </div>

        {/* TRADING PANEL RIGHT SIDE */}
        <div className="trade-right">
          <div className="panel">
            <h3>Trade Panel</h3>

            <div className="form-group">
              <label>Mode</label>
              <select value={mode} onChange={(e) => setMode(e.target.value as 'manual' | 'auto')}>
                <option value="manual">Manual</option>
                <option value="auto">Automatic</option>
              </select>
            </div>

            {mode === 'manual' && (
              <div className="form-group">
                <label>Strategy</label>
                <button className="btn secondary" onClick={openStrategyModal}>
                  {selectedStrategy}
                </button>
              </div>
            )}

            <div className="form-group">
              <label>Position Size</label>
              <input
                type="number"
                value={positionSize}
                min={0.01}
                step={0.01}
                onChange={(e) => setPositionSize(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Stop Loss</label>
              <input
                type="number"
                value={stopLoss}
                min={0}
                step={1}
                onChange={(e) => setStopLoss(Number(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Take Profit</label>
              <input
                type="number"
                value={takeProfit}
                min={0}
                step={1}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
              />
            </div>

            <button className="btn primary" onClick={handleTrade}>Place Trade</button>
          </div>

          <div className="open-positions">
            <h3>Open Positions</h3>
            {openPositions.length === 0 ? <p>No positions yet</p> : (
              <ul>
                {openPositions.map(pos => (
                  <li key={pos.id}>
                    {pos.pair} | {pos.strategy} | {pos.size} | {pos.mode} | PnL: {pos.pnl}$
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {showStrategyModal && (
        <div className="strategy-modal">
          <div className="modal-content">
            <h3>Select a Trading Strategy</h3>
            <button className="close-btn" onClick={closeStrategyModal}>×</button>
            <ul>
              {strategies.map(s => (
                <li key={s}>
                  <button className="strategy-btn" onClick={() => selectStrategy(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trade;

import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import type { IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';

interface RealTimeChartProps {
  pair: string;
  indicators?: string[];
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ pair, indicators = [] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  const [selectedCandle, setSelectedCandle] = useState<CandlestickData | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: { background: { color: '#111' }, textColor: '#fff' },
      grid: { vertLines: { color: '#222' }, horzLines: { color: '#222' } },
    });

    candleSeriesRef.current = chartRef.current.addCandlestickSeries();

    // Exemple de données
    const data: CandlestickData[] = [
      { time: '2025-12-01', open: 100, high: 105, low: 95, close: 102 },
      { time: '2025-12-02', open: 102, high: 110, low: 101, close: 108 },
      { time: '2025-12-03', open: 108, high: 112, low: 105, close: 110 },
    ];

    candleSeriesRef.current.setData(data);

    // Sur clic sur bougie
    chartRef.current.subscribeClick((param) => {
      if (param.seriesData.size) {
        const [candle] = Array.from(param.seriesData.values());
        setSelectedCandle(candle as CandlestickData);
      }
    });

    return () => chartRef.current?.remove();
  }, [pair]);

  return (
    <div>
      <div ref={chartContainerRef} style={{ width: '100%', height: '500px' }} />
      {selectedCandle && (
        <div className="candle-info">
          <p>Open: {selectedCandle.open}</p>
          <p>High: {selectedCandle.high}</p>
          <p>Low: {selectedCandle.low}</p>
          <p>Close: {selectedCandle.close}</p>
          <p>
            Signification: {selectedCandle.close > selectedCandle.open ? 'Bougie haussière' : 'Bougie baissière'}
          </p>
        </div>
      )}
    </div>
  );
};

export default RealTimeChart;

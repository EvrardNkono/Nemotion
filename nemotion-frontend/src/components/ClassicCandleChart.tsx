// src/components/ClassicCandleChart.tsx
import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryAxis, VictoryCandlestick } from 'victory';

type Candle = {
  x: Date;
  open: number;
  high: number;
  low: number;
  close: number;
};

interface ClassicCandleChartProps {
  symbol?: string; // exemple: 'BTCUSDT'
}

const ClassicCandleChart: React.FC<ClassicCandleChartProps> = ({ symbol = 'BTCUSDT' }) => {
  const [data, setData] = useState<Candle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`
        );
        const json: any[][] = await res.json();

        // Binance retourne [openTime, open, high, low, close, ...] 
        const candles: Candle[] = json.map(([openTime, open, high, low, close]) => ({
          x: new Date(openTime),
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close),
        }));

        setData(candles);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5 * 60 * 1000); // mise à jour toutes les 5 min
    return () => clearInterval(interval);
  }, [symbol]);

  if (data.length === 0) return <div style={{ color: '#fff' }}>Loading chart...</div>;

  return (
    <VictoryChart domainPadding={{ x: 5 }} style={{ parent: { backgroundColor: '#000' } }}>
      <VictoryAxis
        style={{
          axis: { stroke: '#FFD700' },
          tickLabels: { fill: '#fff', fontSize: 10, angle: -45 },
        }}
        tickFormat={(t: Date | number) => {
          const date = t instanceof Date ? t : new Date(t);
          return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          axis: { stroke: '#FFD700' },
          tickLabels: { fill: '#fff', fontSize: 10 },
        }}
      />
      <VictoryCandlestick
        data={data}
        candleColors={{ positive: '#FFD700', negative: '#fff' }}
        style={{
          data: { stroke: '#FFD700', strokeWidth: 1 },
        }}
      />
    </VictoryChart>
  );
};

export default ClassicCandleChart;

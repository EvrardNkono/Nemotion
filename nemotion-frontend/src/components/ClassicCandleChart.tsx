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

// 👇 On change "symbol" → "pair"
export interface ClassicCandleChartProps {
  pair?: string; // ex: 'BTCUSDT'
}

const ClassicCandleChart: React.FC<ClassicCandleChartProps> = ({ pair = 'BTCUSDT' }) => {
  const [data, setData] = useState<Candle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${pair}&interval=1h&limit=24`
        );
        const json: any[][] = await res.json();

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
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [pair]);

  if (data.length === 0) {
    return <div style={{ color: '#fff' }}>Loading chart...</div>;
  }

  return (
    <VictoryChart
      domainPadding={{ x: 5 }}
      style={{ parent: { backgroundColor: '#000' } }}
    >
      <VictoryAxis
        style={{
          axis: { stroke: '#FFD700' },
          tickLabels: { fill: '#fff', fontSize: 10, angle: -45 },
        }}
        tickFormat={(t: Date | number) => {
          const date = t instanceof Date ? t : new Date(t);
          return `${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
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

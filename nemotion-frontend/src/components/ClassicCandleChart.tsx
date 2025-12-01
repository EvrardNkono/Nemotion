import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import type { IChartApi, ISeriesApi, CandlestickSeriesPartialOptions, Time } from "lightweight-charts";

type Props = {
  initialPair?: string;
  initialInterval?: string;
};

type Candle = {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
};

const API_KEY = "e70c73d16e5c4be48c2b29c84cb3002c";

const TwelveDataCandleChart: React.FC<Props> = ({ initialPair = "AAPL", initialInterval = "1min" }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstanceRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [pair, setPair] = useState(initialPair);
  const [interval, setInterval] = useState(initialInterval);

  // Création du chart
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: { textColor: "#ddd", backgroundColor: "#0f0f0f" },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
      rightPriceScale: { borderColor: "#555" },
      timeScale: { borderColor: "#555", timeVisible: true, secondsVisible: true },
    });

    chart.timeScale().applyOptions({ rightOffset: 2, barSpacing: 6 });

    const series = chart.addCandlestickSeries({
      upColor: "#00ff99",
      downColor: "#ff0066",
      borderUpColor: "#00ff99",
      borderDownColor: "#ff0066",
      wickUpColor: "#00ff99",
      wickDownColor: "#ff0066",
    } as CandlestickSeriesPartialOptions);

    chartInstanceRef.current = chart;
    candleSeriesRef.current = series;

    const handleResize = () => chart.applyOptions({ width: chartRef.current?.clientWidth || 400 });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // Fetch historique Twelve Data
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const url = `https://api.twelvedata.com/time_series?symbol=${pair}&interval=${interval}&outputsize=100&apikey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.values) {
          const candles: Candle[] = data.values
            .map((v: any) => ({
              time: new Date(v.datetime).getTime() / 1000 as Time,
              open: parseFloat(v.open),
              high: parseFloat(v.high),
              low: parseFloat(v.low),
              close: parseFloat(v.close),
            }))
            .reverse();

          candleSeriesRef.current?.setData(candles);
        }
      } catch (err) {
        console.error("Erreur récupération historique:", err);
      }
    };

    fetchHistory();
  }, [pair, interval]);

  // WebSocket temps réel Twelve Data
  useEffect(() => {
    if (!pair || !interval) return;

    wsRef.current?.close();

    const wsUrl = `wss://ws.twelvedata.com/v1/quotes/price?symbol=${pair}&interval=${interval}&apikey=${API_KEY}`;
    const socket = new WebSocket(wsUrl);
    wsRef.current = socket;

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.price) {
        const now = Math.floor(Date.now() / 1000) as Time;
        const candle: Candle = {
          time: now,
          open: msg.price,
          high: msg.price,
          low: msg.price,
          close: msg.price,
        };
        candleSeriesRef.current?.update(candle);
      }
    };

    socket.onerror = (err) => console.error("WS error:", err);

    return () => socket.close();
  }, [pair, interval]);

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          value={pair}
          onChange={(e) => setPair(e.target.value.toUpperCase())}
          placeholder="Pair ex: AAPL"
          style={{ marginRight: 10 }}
        />
        <select value={interval} onChange={(e) => setInterval(e.target.value)}>
          <option value="1min">1 minute</option>
          <option value="5min">5 minutes</option>
          <option value="15min">15 minutes</option>
          <option value="1h">1 heure</option>
          <option value="4h">4 heures</option>
          <option value="1d">1 jour</option>
        </select>
      </div>
      <div ref={chartRef} style={{ width: "100%", height: 400 }} />
    </div>
  );
};

export default TwelveDataCandleChart;

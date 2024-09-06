"use client";

// components/LiveStreamingChart.tsx
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  ChartOptions,
  ChartData,
} from "chart.js";
import ZoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-moment";
import streamingPlugin from "chartjs-plugin-streaming";

// Register necessary chart components and plugins
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  streamingPlugin,
  ZoomPlugin
);

const LineStreamingChart = () => {
  const chartRef = useRef(null);

  // Configure chart options
  const chartOptions = {
    scales: {
      x: {
        type: "realtime", // x-axis will auto-scroll using the streaming plugin
        realtime: {
          duration: 20000, // 20 seconds window
          refresh: 1000, // Refresh the chart every second
          delay: 3000, // Delay of 1 second
          onRefresh: (chart) => {
            const now = Date.now();
            chart.data.datasets.forEach((dataset) => {
              // Push new data to the chart at regular intervals
              dataset.data.push({
                x: now,
                y: Math.random() * 10, // Simulating real-time data
              });
            });
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
  };

  // Define initial chart data with type
  const chartData: ChartData<"line"> = {
    datasets: [
      {
        label: "Real-time Data",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        fill: false,
        data: [], // Empty initially; data will be added in real-time
      },
    ],
  };

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineStreamingChart;

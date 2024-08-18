// components/LineChart.tsx
"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HomepageCashFlowChart = () => {
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tues", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Views",
        data: [0, 120, 60, 90, 220, 200, 235],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Overall Views in a Week",
      },
    },
  };

  return <Line data={data} options={options} color="#91E91F" />;
};

export default HomepageCashFlowChart;

// components/LineChart.tsx
"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sat", views: 0 },
  { day: "Sun", views: 120 },
  { day: "Mon", views: 60 },
  { day: "Tues", views: 90 },
  { day: "Wed", views: 220 },
  { day: "Thu", views: 200 },
  { day: "Fri", views: 235 },
];

const ViewsPerDayChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Line
          type="monotone"
          dataKey="views"
          stroke="rgb(75, 192, 192)"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ViewsPerDayChart;

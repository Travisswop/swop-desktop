"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2022-09-19", value: 31 },
  { date: "2022-09-20", value: 40 },
  { date: "2022-09-21", value: 28 },
  { date: "2022-09-22", value: 51 },
  { date: "2022-09-23", value: 42 },
  { date: "2022-09-24", value: 109 },
  { date: "2022-09-25", value: 100 },
];

const RechartAreaChart = () => {
  return (
    <div className="bg-white p-3 rounded-lg mt-4">
      <div className="translate-x-4 mb-2">
        <p className="text-lg font-semibold">Cashflow</p>
        <p className="font-bold">$20,200</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E72533" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00E72533" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00e72758"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartAreaChart;

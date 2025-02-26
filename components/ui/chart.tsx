"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface ChartProps {
  data: DataPoint[];
  width?: number | string;
  height?: number;
}

export default function Chart({ data, width = '100%', height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#333',
            border: '1px solid #555',
            borderRadius: '4px'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#22D3EE" 
          strokeWidth={2}
          dot={{ fill: '#22D3EE' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
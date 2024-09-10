"use client";

import { TChartPoint } from "@/types";
import React, { FC } from "react";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  CartesianGrid,
  LineChart as RechartLineChart,
} from "recharts";

type TLineChartProps = {
  chartData: TChartPoint[];
};

const LineChart: FC<TLineChartProps> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartLineChart
        data={chartData}
        margin={{
          top: 0,
          right: 5,
          left: -25,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          fontSize="12px"
          tickFormatter={(tick) => tick.toFixed(3)}
        />
        <YAxis
          dataKey="y"
          fontSize="12px"
          ticks={[0, 300, 600, 900, 1200, 1300]}
        />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="y"
          stroke="#C7253E"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </RechartLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;

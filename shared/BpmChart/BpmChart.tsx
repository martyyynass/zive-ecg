import React, { FC, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { bpmData } from "@/data/bpm";

type TBpmChartProps = {
  isTracking: boolean;
  randomStartIndex: number;
};

const BpmChart: FC<TBpmChartProps> = ({ isTracking, randomStartIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(randomStartIndex);
  const [data, setData] = useState<{ time: string; bpm: number }[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateBpmData = () => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < bpmData.length) {
          const nextDataPoint = bpmData[prevIndex];
          const timestamp = new Date().toLocaleTimeString();

          setData((currentData) => {
            const newData = [
              ...currentData,
              { time: timestamp, bpm: nextDataPoint.bpm },
            ];

            // If data exceeds 40 records, remove the first one
            if (newData.length > 30) {
              newData.shift(); // Remove the oldest record
            }

            return newData;
          });

          return prevIndex + 1; // Update index for the next data point
        } else {
          clearInterval(interval); // Stop the interval if we reach the end of bpmData
          return prevIndex;
        }
      });
    };

    if (isTracking) {
      interval = setInterval(updateBpmData, 1000);
    }

    return () => clearInterval(interval);
  }, [isTracking]);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 5,
          left: -25,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" fontSize="12px" />
        <YAxis domain={[50, 190]} fontSize="12px" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="bpm"
          stroke="#8884d8"
          strokeWidth={2}
          isAnimationActive={false}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BpmChart;

"use client";

import { Flex, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import LineChart from "../LineChart";
import { ecgDataSet } from "@/data/ecg";

type TEcgChartProps = {
  isTracking: boolean;
};

const EcgChart: FC<TEcgChartProps> = ({ isTracking }) => {
  const [chartData, setChartData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(() => Math.floor(0));

  const sliceSize = 500;
  const increment = 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateData = () => {
      let newStartIndex = startIndex + increment;
      if (newStartIndex + sliceSize > ecgDataSet.length) {
        newStartIndex = 0;
      }

      setChartData(ecgDataSet.slice(newStartIndex, newStartIndex + sliceSize));
      setStartIndex(newStartIndex);

      setLabels(
        ecgDataSet
          .slice(newStartIndex, newStartIndex + sliceSize)
          .map((ecg) => ecg.toString())
      );
    };

    if (isTracking) {
      interval = setInterval(updateData, 1000);
    }

    return () => clearInterval(interval);
  }, [isTracking, startIndex]);

  const options = {
    animation: {
      duration: 0,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    fill: false,
    scales: {
      y: {
        min: -2000,
        max: 10000,
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: chartData,
        fill: false,
        borderColor: "#FC2947",
        tension: 0.1,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  return (
    <Flex direction="column">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight={600} fontSize="sm">
          ECG / 500Hz
        </Text>
      </Flex>
      <LineChart data={data} options={options} />
    </Flex>
  );
};

export default EcgChart;

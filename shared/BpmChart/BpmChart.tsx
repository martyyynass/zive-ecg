"use client";

import React, { FC, useEffect, useState } from "react";
import { bpmDataSet } from "@/data/bpm";
import LineChart from "../LineChart";
import { Flex, Text } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";

type TBpmChartProps = {
  isTracking: boolean;
};

const BpmChart: FC<TBpmChartProps> = ({ isTracking }) => {
  const [bpmData, setBpmData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [counter, setCounter] = useState(Math.floor(Math.random() * 200));
  const [seconds, setSeconds] = useState(0);

  const currentBpmValue = bpmDataSet[counter];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateData = () => {
      setBpmData((prevData) => [...prevData, bpmDataSet[counter]]);
      setLabels((prevLabels) => [...prevLabels, seconds.toString()]);
      setCounter((prevCounter) => prevCounter + 1);
      setSeconds((prevSeconds) => prevSeconds + 1);
    };

    if (isTracking) {
      interval = setInterval(updateData, 1000);
    }

    return () => clearInterval(interval);
  }, [isTracking, counter, seconds]);

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
        min: 40,
        max: 200,
      },
      x: {
        display: true, // Show the x-axis for seconds
        title: {
          display: true,
          text: "Seconds",
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: bpmData,
        fill: true,
        borderColor: "#FC2947",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This is called before the chart is ready
            return null;
          }

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(252, 41, 71, 0.05)");
          gradient.addColorStop(1, "rgba(252, 41, 71, 0.6)");

          return gradient;
        },
        tension: 0.3,
        capBezierPoints: false,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  return (
    <Flex direction="column">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight={600} fontSize="sm">
          BPM
        </Text>

        <Flex
          width={isTracking ? "65px" : "40px"}
          h="40px"
          borderRadius="lg"
          align="center"
          justify="center"
          backgroundColor="rgba(252, 41, 71, 0.1)"
          gap={1}
        >
          <LuHeart color="#FC2947" fontSize="20px" fill="#FC2947" />
          {bpmData.length > 0 && isTracking && (
            <Flex fontWeight={700} fontSize="sm">
              {currentBpmValue}
            </Flex>
          )}
        </Flex>
      </Flex>
      <LineChart data={data} options={options} />
    </Flex>
  );
};

export default BpmChart;

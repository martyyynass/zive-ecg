import React, { FC } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TLineChartProps = {
  data: ChartData<"line", number[], string>;
  options?: ChartOptions<"line">;
};

const LineChart: FC<TLineChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default LineChart;

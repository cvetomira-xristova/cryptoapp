import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, currenctPrice, coinName }) => {
  const coinPrice =
    coinHistory?.data?.history?.map((point) => point.price) || [];

  const coinTimestamp =
    coinHistory?.data?.history?.map((point) =>
      new Date(point.timestamp * 1000).toLocaleDateString()
    ) || [];

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${coinName} Price History`,
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: false,
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">
          {coinName} Price Chart
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Current Price:</span>
          <span className="text-xl font-semibold text-primary">
            ${currenctPrice}
          </span>
        </div>
      </div>

      <div className="h-[400px] bg-dark-card rounded-xl p-4 border border-white/5">
        <Line
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default LineChart;

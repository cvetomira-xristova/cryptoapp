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
        backgroundColor: '#14b8a6',
        borderColor: '#14b8a6',
      },
    ],
  };

  // TODO: Configure more options
  const options = {
    responsive: true,
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
    <div>
      <div className="text-2xl font-bold text-teal-900 uppercase antiliased">
        {coinName} Price Chart
      </div>
      <div className="text-md text-teal-900 font-bold mt-2">
        {coinName} Current Price {currenctPrice}
      </div>
      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

export default LineChart;

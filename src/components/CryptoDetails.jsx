import { Select, Skeleton } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import millify from 'millify';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import LineChart from './LineChart';
import SkeletonGrid from './SkeletonGrid';

const { Option } = Select;

const CryptoDetails = () => {
  const [timePeriod, setTimePeriod] = useState('7d');
  const { coinId } = useParams();
  const { data, isFetching: isFetchingDetails } =
    useGetCryptoDetailsQuery(coinId);

  const { data: coinHistory, isFetching: isFetchingHistory } =
    useGetCryptoHistoryQuery({
      coinId,
      timePeriod,
    });

  const cryptoDetails = data?.data?.coin;
  const time = ['3h', '24h', '7d', '30d', '1y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${
        cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {isFetchingDetails ? (
          <>
            {/* TODO: Fix the skeleton to better match the grid */}
            <SkeletonGrid />
          </>
        ) : (
          <>
            {/* Hero Section */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl" />
              <div className="relative bg-dark-card/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={cryptoDetails?.iconUrl}
                        alt={cryptoDetails?.name}
                        className="w-12 h-12"
                      />
                      <div>
                        <h1 className="text-3xl font-bold text-white">
                          {cryptoDetails?.name}
                        </h1>
                        <span className="text-gray-400">
                          {cryptoDetails?.symbol}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline space-x-4">
                      <span className="text-4xl font-bold text-white">
                        ${millify(cryptoDetails?.price)}
                      </span>
                      <span
                        className={`text-lg ${
                          cryptoDetails?.change > 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}>
                        {cryptoDetails?.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Chart Section */}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Value Stats */}
              <div className="bg-dark-card rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Market Statistics
                </h2>
                <div className="space-y-4">
                  {stats.map(({ icon, title, value }) => (
                    <div
                      key={title}
                      className="flex items-center justify-between p-4 bg-dark-lighter/50 
                               rounded-xl hover:bg-dark-lighter transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="p-2 rounded-lg bg-primary/10 text-primary">
                          {icon}
                        </span>
                        <span className="text-gray-300">{title}</span>
                      </div>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supply Stats */}
              <div className="bg-dark-card rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Supply Information
                </h2>
                <div className="space-y-4">
                  {genericStats.map(({ icon, title, value }) => (
                    <div
                      key={title}
                      className="flex items-center justify-between p-4 bg-dark-lighter/50 
                               rounded-xl hover:bg-dark-lighter transition-colors">
                      <div className="flex items-center space-x-3">
                        <span className="p-2 rounded-lg bg-primary/10 text-primary">
                          {icon}
                        </span>
                        <span className="text-gray-300">{title}</span>
                      </div>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="bg-dark-lighter rounded-xl p-6 border border-white/5">
          {isFetchingHistory ? (
            <Skeleton paragraph={{ rows: 17 }} />
          ) : (
            <>
              <Select
                defaultValue="7d"
                className="w-44 mb-2 bg-dark-card"
                onChange={(value) => setTimePeriod(value)}>
                {time.map((date) => (
                  <Option key={date}>{date}</Option>
                ))}
              </Select>
              <LineChart
                coinHistory={coinHistory}
                currenctPrice={millify(cryptoDetails?.price)}
                coinName={cryptoDetails?.name}
              />
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  Data provided by CoinRanking API. Timestamps might not be
                  accurate.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;

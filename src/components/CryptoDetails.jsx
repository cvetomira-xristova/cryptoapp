import { Select } from 'antd';
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
    <>
      {isFetchingDetails && <SkeletonGrid />}

      {!isFetchingDetails && (
        <>
          <div className="col-span-1 w-full h-full space-y-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="text-2xl font-bold text-teal-900 uppercase antiliased">
                {cryptoDetails?.name} Statistics
              </div>
              <div className="text-gray-600">
                {/* {cryptoDetails?.name} live price in US dollars. */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="md:col-span-1">
                <div className="mb-6">
                  <p className="text-xl font-semibold text-teal-800 uppercase">
                    {cryptoDetails?.name} Value
                  </p>
                  <p className="text-gray-600">
                    Overview showing the stats of {cryptoDetails?.name}
                  </p>
                </div>

                {stats.map(({ icon, title, value }) => (
                  <div
                    key={title}
                    className="flex justify-between items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow mb-4 text-lg">
                    <div className="flex items-center gap-2">
                      <div className="text-teal-500">{icon}</div>
                      <div className="text-gray-700">{title}</div>
                    </div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>

              <div className="md:col-span-1">
                <div className="mb-6">
                  <p className="text-xl font-semibold text-teal-800 uppercase">
                    Other Statistics
                  </p>
                  <p className="text-gray-600">
                    Overview showing the stats of all cryptocurrencies
                  </p>
                </div>

                {genericStats.map(({ icon, title, value }) => (
                  <div
                    key={title}
                    className="flex justify-between items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow mb-4 text-lg">
                    <div className="flex items-center gap-2">
                      <div className="text-teal-500">{icon}</div>
                      <div className="text-gray-700">{title}</div>
                    </div>
                    <div className="font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* // TODO: Improve the skeleton load */}
      <>
        <Select
          defaultValue="7d"
          className="w-1/4 my-6"
          placeholder="Select time period"
          onChange={(value) => setTimePeriod(value)}>
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        {isFetchingHistory && <SkeletonGrid />}

        {!isFetchingHistory && (
          <>
            <LineChart
              coinHistory={coinHistory}
              currenctPrice={millify(cryptoDetails?.price)}
              coinName={cryptoDetails?.name}
            />
            <p className="text-red-700 mt-10">
              *Note: timestamps coming from the API might not be entirely
              accurate.
            </p>
          </>
        )}
      </>
    </>
  );
};

export default CryptoDetails;

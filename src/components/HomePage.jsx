import React from 'react';
import millify from 'millify';
import { Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import SkeletonGrid from './SkeletonGrid';

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  const stats = [
    { title: 'Total Cryptocurrencies', value: globalStats?.total },
    { title: 'Total Exchanges', value: globalStats?.totalExchanges },
    { title: 'Total Market Cap', value: globalStats?.totalMarketCap },
    { title: 'Total 24h Volume', value: globalStats?.total24hVolume },
    { title: 'Total Markets', value: globalStats?.totalMarkets },
  ];

  return (
    <>
      {isFetching && <SkeletonGrid />}

      {!isFetching && (
        <div className="grid space-y-12">
          <div>
            <p className="text-2xl font-bold text-teal-900 uppercase antiliased">
              Global Crypto Stats
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-5">
              {stats.map((stat, index) => (
                <div
                  className="p-4"
                  key={index}>
                  <Statistic
                    title={stat.title}
                    value={millify(stat.value)}
                    className="h-full text-gray-700 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-teal-900 uppercase antiliased">
              Top 10 Cryptos in the World
            </p>
            <Link
              to="/cryptocurrencies"
              className="text-teal-600 hover:text-teal-900 text-md font-bold uppercase">
              Show More
            </Link>
          </div>
          <Cryptocurrencies simplified />

          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-teal-900 uppercase antiliased">
              Latest Crypto News
            </p>
            <Link
              to="/news"
              className="text-teal-600 hover:text-teal-900 text-md font-bold uppercase">
              Show More
            </Link>
          </div>
          <News simplified />
        </div>
      )}
    </>
  );
};

export default HomePage;

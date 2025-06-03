import millify from 'millify';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';

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
    <div className="min-h-screen bg-dark">
      {/* TODO: Fix the skeleton to better match the grid */}
      {/* {isFetching && <SkeletonGrid />} */}

      {!isFetching && (
        <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-2xl bg-dark-lighter p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-glow opacity-10" />
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">
                Master Your Crypto Portfolio
                <span className="block mt-2 text-xl md:text-2xl text-gray-400">
                  Real-time tracking and market analytics
                </span>
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-dark-card p-6 rounded-xl border border-white/5 hover:border-primary/20 
                             transition-all duration-300 hover:shadow-glow">
                    <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">
                      {millify(stat.value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cryptocurrencies Section */}
          <section className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Top Cryptocurrencies
              </h2>
              <Link
                to="/cryptocurrencies"
                className="px-6 py-2.5 bg-dark-card text-white rounded-lg border border-white/5 
                         hover:border-primary/20 hover:shadow-glow transition-all duration-300">
                View All
              </Link>
            </div>
            <Cryptocurrencies simplified />
          </section>

          {/* News Section */}
          <section className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Latest Updates
              </h2>
              <Link
                to="/news"
                className="px-6 py-2.5 bg-dark-card text-white rounded-lg border border-white/5 
                         hover:border-primary/20 hover:shadow-glow transition-all duration-300">
                More News
              </Link>
            </div>
            <News simplified />
          </section>
        </main>
      )}
    </div>
  );
};

export default HomePage;

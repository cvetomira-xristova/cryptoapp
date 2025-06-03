import { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { SearchOutlined } from '@ant-design/icons';
import SkeletonGrid from './SkeletonGrid';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const PAGE_SIZE = 20;

const Cryptocurrencies = ({ simplified = false }) => {
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [allCoins, setAllCoins] = useState([]);

  const { data, isFetching } = useGetCryptosQuery({
    offset,
    limit: simplified ? 10 : PAGE_SIZE,
    refetchOnMountOrArgChange: true,
  });

  // Fetch more coins when scrolling down
  useInfiniteScroll({
    isFetching,
    hasMore,
    onLoadMore: () => {
      if (searchTerm === '' && !simplified) {
        setOffset((prev) => prev + (simplified ? 10 : PAGE_SIZE));
      }
    },
  });

  // Update allCoins state when new data is fetched
  useEffect(() => {
    const coins = data?.data?.coins;
    const total = data?.data?.stats?.total;

    if (!coins) return;

    setAllCoins((prev) => {
      let updatedCoins;

      if (offset === 0) {
        updatedCoins = coins;
      } else {
        const existingIds = new Set(prev.map((coin) => coin.uuid));
        const newCoins = coins.filter((coin) => !existingIds.has(coin.uuid));
        updatedCoins = [...prev, ...newCoins];
      }

      if (total != null) {
        setHasMore(updatedCoins.length < total);
      }

      return updatedCoins;
    });
  }, [data, offset]);

  // Filter coins based on search term
  const filteredCryptos = allCoins.filter((coin) =>
    coin?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {!simplified && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl" />
            <div className="relative bg-dark-card/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <Input
                prefix={<SearchOutlined className="text-gray-400 text-xl" />}
                placeholder="Search cryptocurrencies..."
                className="w-full md:w-64"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}

        {isFetching && <SkeletonGrid />}

        <Row gutter={[24, 24]}>
          {filteredCryptos.map((currency) => (
            <Col
              key={currency.uuid}
              xs={24}
              sm={12}
              lg={8}
              xl={6}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  className="h-full bg-dark-card border-white/5 rounded-2xl
                           hover:bg-dark-lighter hover:border-primary/20 
                           transition-all duration-300 hover:shadow-lg
                           transform hover:-translate-y-1"
                  bodyStyle={{ padding: '24px' }}
                  title={
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <img
                          className="h-8 w-8"
                          src={currency.iconUrl}
                          alt={`${currency.name} icon`}
                        />
                        <div>
                          <span className="text-lg font-medium text-white">
                            {currency.name}
                          </span>
                          <span className="block text-sm text-gray-400">
                            Rank #{currency.rank}
                          </span>
                        </div>
                      </div>
                    </div>
                  }
                  hoverable>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Price</span>
                      <span className="text-lg font-medium text-white">
                        ${millify(currency.price)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Market Cap</span>
                      <span className="text-lg font-medium text-white">
                        ${millify(currency.marketCap)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">24h Change</span>
                      <span
                        className={`text-lg font-medium ${
                          Number(currency.change) > 0
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}>
                        {currency.change}%
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {isFetching && !simplified && (
          <div className="flex justify-center py-6">
            <div className="text-gray-400 text-lg">
              Loading more cryptocurrencies...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cryptocurrencies;

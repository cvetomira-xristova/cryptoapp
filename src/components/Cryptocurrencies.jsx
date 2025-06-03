import { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { SearchOutlined } from '@ant-design/icons';
import SkeletonGrid from './SkeletonGrid';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

const PAGE_SIZE = 20;

const Cryptocurrencies = ({ simplified }) => {
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
      if (searchTerm === '') {
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
    <>
      {isFetching && <SkeletonGrid />}
      {!simplified && (
        <div>
          <Input
            prefix={<SearchOutlined />}
            placeholder={'Search cryptos...'}
            className="max-w-xl mb-10"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]}>
        {filteredCryptos.map((currency) => (
          <Col
            key={currency.uuid}
            xs={24}
            sm={12}
            lg={6}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                className="rounded-xl shadow-xl p-2"
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="h-[30px]"
                    src={currency.iconUrl}
                    alt={`${currency.name} icon`}
                  />
                }
                hoverable>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {isFetching && !simplified && <div>Loading more...</div>}
    </>
  );
};

export default Cryptocurrencies;

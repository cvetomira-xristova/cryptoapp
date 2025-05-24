import { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { SearchOutlined } from '@ant-design/icons';
import SkeletonGrid from './SkeletonGrid';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(data?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [searchTerm, data]);

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
        {cryptos?.map((currency) => (
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
    </>
  );
};

export default Cryptocurrencies;

import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import noThumbnailSVG from '../images/noThumbnail.svg';
import moment from 'moment';
import { useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import SkeletonGrid from './SkeletonGrid';

const { Text } = Typography;
const { Option } = Select;

const News = ({ simplified = false }) => {
  const count = simplified ? 6 : 20;
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoList } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    searchTerm: newsCategory,
    count,
  });

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {!simplified && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl" />
            <div className="relative bg-dark-card/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <Select
                showSearch
                className="w-full md:w-64"
                placeholder="Select a cryptocurrency"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}>
                <Option value="Cryptocurrency">All Cryptocurrencies</Option>
                {cryptoList?.data?.coins.map((coin) => (
                  <Option
                    key={coin.uuid}
                    value={coin.name}>
                    {coin.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        )}

        {isFetching && <SkeletonGrid />}

        <Row gutter={[24, 24]}>
          {cryptoNews?.data?.map((newsItem, i) => (
            <Col
              xs={24}
              sm={12}
              lg={8}
              key={i}>
              <Card
                hoverable
                className="h-full bg-dark-card border-white/5 rounded-2xl
                         hover:bg-dark-lighter hover:border-primary/20 
                         transition-all duration-300 hover:shadow-lg"
                bodyStyle={{ padding: '24px' }}>
                <a
                  href={newsItem?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col h-full space-y-6">
                  <h3 className="text-xl font-semibold text-white line-clamp-3">
                    {newsItem?.title}
                  </h3>

                  <img
                    src={newsItem?.thumbnail ?? noThumbnailSVG}
                    className="w-full h-48 object-cover rounded-xl"
                    alt="news"
                  />

                  <p className="text-gray-400 line-clamp-3">
                    {newsItem.excerpt}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center space-x-2">
                      <Avatar
                        src={newsItem?.publisher.favicon}
                        className="bg-dark-lighter"
                      />
                      <span className="text-sm text-gray-300">
                        {newsItem?.publisher.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {moment(newsItem?.date).fromNow()}
                    </span>
                  </div>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default News;

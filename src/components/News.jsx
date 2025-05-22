import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import noThumbnailSVG from '../images/noThumbnail.svg';
import moment from 'moment';
import { useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import SkeletonGrid from './SkeletonGrid';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const count = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState('Crypto currency');
  const { data: cryptoList } = useGetCryptosQuery(100);

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    searchTerm: newsCategory,
    count,
  });

  // TODO: Refactor the grid
  return (
    <>
      {isFetching && <SkeletonGrid />}
      {!isFetching && (
        <Row gutter={[24, 24]}>
          {!simplified && (
            <Col span={24}>
              <Select
                showSearch
                className=""
                placeholder="Select a Crypto"
                optionFilterProp="children"
                onChange={(value) => setNewsCategory(value)}>
                <Option value="Cryptocurrency"> Cryptocurrency </Option>
                {cryptoList?.data.coins.map((coin) => (
                  <Option value={coin.name}>{coin.name}</Option>
                ))}
              </Select>
            </Col>
          )}
          {cryptoNews?.data?.map((newsItem, i) => (
            <Col
              xs={24}
              sm={12}
              lg={8}
              key={i}>
              <Card
                hoverable
                className="h-full">
                <a
                  href={newsItem?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col justify-between">
                  <Title
                    className="h-[120px]"
                    level={4}>
                    {newsItem?.title}
                  </Title>

                  <img
                    src={newsItem?.thumbnail ?? noThumbnailSVG}
                    className="h-[200px] object-cover rounded-md"
                    alt="news article thumbnail"
                  />
                  <p className=" text-gray-700 mt-4 mb-8">
                    {newsItem.excerpt?.length > 100
                      ? `${newsItem.excerpt.substring(0, 100)}...`
                      : newsItem.excerpt}
                  </p>

                  <div className="flex justify-between items-center ">
                    <div>
                      <Avatar src={newsItem?.publisher.favicon} />
                      <Text> {newsItem?.publisher.name}</Text>
                    </div>
                    <Text>
                      {moment(newsItem?.date).startOf('ss').fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default News;

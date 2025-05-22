import { Col, Row, Card, Skeleton } from 'antd';

const SkeletonGrid = () => {
  return (
    <Row gutter={[24, 24]}>
      {Array.from({ length: 8 }, (_, index) => (
        <Col
          xs={24}
          sm={12}
          lg={8}
          key={index}>
          <Card>
            <Skeleton
              active
              paragraph={{ rows: 6 }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonGrid;

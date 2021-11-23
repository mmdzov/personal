import styled from 'styled-components';
import { Timeline as TL } from 'antd';
import Context from '../../context/Context';
import { useContext } from 'react';

const Timeline = () => {
  const { about } = useContext(Context);

  return (
    <Container className="sec">
      <div className="sec-title">Timeline</div>
      <TL mode="alternate">
        {about.map((item) => (
          <TL.Item label={item.date}>
            <div className="title">{item.title}</div>
            <div className="subtitle">{item.subtitle}</div>
          </TL.Item>
        ))}
      </TL>
    </Container>
  );
};

const Container = styled.div`
  /* background: black; */
  /* padding-top: 35px; */
  /* border-radius: 6px; */
  padding: 0 10px;
  > .sec-title {
    margin-bottom: 40px !important;
  }

  .subtitle {
    padding: 0 10px;
    font-size: 0.8rem;
    color: #c3c3c3;
  }
  .title {
    font-weight: bold;
    color: #dfdfdf;
  }
  .ant-timeline-item-label {
    font-size: 0.8rem;
    color: #cfcfcf;
  }
  li {
    color: white;
  }
`;

export default Timeline;

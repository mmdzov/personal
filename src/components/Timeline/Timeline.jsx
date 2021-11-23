import styled from 'styled-components';
import { Timeline as TL, Input, Button } from 'antd';
import Context from '../../context/Context';
import { useContext, useState } from 'react';

const { TextArea } = Input;

const defaultAddline = {
  date: '',
  title: '',
  subtitle: '',
};

const Timeline = () => {
  const { about, user, data, setData } = useContext(Context);
  const [addline, setAddline] = useState(defaultAddline);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setAddline((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTimeline = () => {
    data.about.push(addline);
    setData((prev) => ({ ...prev, about: data.about }));
    setAddline(defaultAddline);
  };

  return (
    <Container className="sec">
      <div className="sec-title">Timeline</div>
      <TL mode="alternate">
        {about.map((item, index) => (
          <TL.Item label={item.date} key={index}>
            <div className="title">{item.title}</div>
            <div className="subtitle">{item.subtitle}</div>
          </TL.Item>
        ))}
      </TL>
      {user?.isAdmin ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="title">Add Timeline</div>
          <Input
            type="text"
            placeholder="date"
            value={addline.date}
            name="date"
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="title"
            value={addline.title}
            name="title"
            onChange={handleChange}
          />
          <TextArea
            value={addline.subtitle}
            onChange={handleChange}
            placeholder="subtitle..."
            id="subtitle"
            name="subtitle"
            className="scroll"
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
          <Button type="primary" onClick={handleAddTimeline}>
            Add
          </Button>
        </form>
      ) : null}
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
  > .title {
    font-weight: bold;
    color: #dfdfdf;
  }

  form {
    text-align: left;
    .title {
      font-size: 1.1rem;
      margin-bottom: 15px;
    }
    > input,
    textarea {
      margin-bottom: 10px;
    }
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

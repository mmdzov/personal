import styled from 'styled-components';
import { Timeline as TL, Input, Button } from 'antd';
import { useState } from 'react';
import EditPen from '../utils/EditPen';
import { useDispatch, useSelector } from 'react-redux';
import { addTimeline, changeTimeline } from '../../store/actions/mainAction';
import useTokenDecode from '../../hooks/useTokenDecode';
import useLanguage from '../../hooks/useLanguage';

const { TextArea } = Input;

const defaultAddline = {
  date: '',
  title: '',
  subtitle: '',
};

const Timeline = () => {
  const { data } = useSelector(({ main }) => main);
  const dispatch = useDispatch();
  const [addline, setAddline] = useState(defaultAddline);
  const decoded = useTokenDecode();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setAddline((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTimeline = () => {
    if (addline?.index >= 0) {
      dispatch(changeTimeline({ timeline_id: data.timeline[addline?.index].id, ...addline }));
    } else {
      dispatch(addTimeline(addline));
    }
    setAddline(defaultAddline);
  };

  const handleEditTimeline = (item, index) => {
    setAddline({ ...item, index });
  };

  const lang = useLanguage();

  return (
    <Container className="sec">
      <div className="sec-title">{lang.resume.labels.timeline}</div>
      <TL mode="alternate">
        {data?.timeline?.map((item, index) => (
          <TL.Item label={item.date} key={index}>
            <div className="timeline-header">
              <EditPen onClick={() => handleEditTimeline(item, index)} />
              <div className="title">{item.title}</div>
            </div>
            <div className="subtitle">{item.subtitle}</div>
          </TL.Item>
        ))}
      </TL>
      {decoded?.isAdmin ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="title">{lang.resume.timeline.addtimeline}</div>
          <Input
            type="text"
            placeholder={lang.resume.timeline.inputs.date}
            value={addline.date}
            name="date"
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder={lang.resume.timeline.inputs.title}
            value={addline.title}
            name="title"
            onChange={handleChange}
          />
          <TextArea
            value={addline.subtitle}
            onChange={handleChange}
            placeholder={lang.resume.timeline.inputs.subtitle}
            id="subtitle"
            name="subtitle"
            className="scroll"
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
          <Button type="primary" onClick={handleAddTimeline}>
            {lang.resume.timeline.buttons.add}
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
  .timeline-header {
    /* display: flex; */
    /* justify-content: space-between; */
    /* align-items: center; */
    .editpen {
      position: unset !important;
    }
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

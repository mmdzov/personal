import styled from 'styled-components';
import ProgressLine from '../progress/ProgressLine';
import { useState } from 'react';
import EditPen from '../utils/EditPen';
import NewSkill from './newSkill';
import { useSelector } from 'react-redux';
import useLanguage from '../../hooks/useLanguage';

const Skills = () => {
  const { data } = useSelector(({ main }) => main);
  const [filledSkill, setFilledSkill] = useState({});
  const handleEditSkill = (skill, index) => {
    setFilledSkill({ ...skill, index });
  };
  const lang = useLanguage();

  return (
    <Container className="sec">
      <div className="sec-title">{lang.resume.labels.skills}</div>
      <div className="sec-list" style={{ marginTop: 20 }}>
        {data?.skills?.map((item, index) => (
          <div className="skill" style={{ position: 'relative' }} key={index}>
            <ProgressLine
              key={~~Math.floor(Math.random() * 99999)}
              label={item?.name}
              backgroundColor="#ccc"
              visualParts={[
                {
                  percentage: `${item?.knowledge}%`,
                  color: item.color,
                },
              ]}
            />
            <EditPen onClick={() => handleEditSkill(item, index)} setFilledSkill={setFilledSkill} />
          </div>
        ))}
      </div>
      <NewSkill filledSkill={filledSkill} />
      <div className="note" style={{ textAlign: lang?.language === 'persian' ? 'right' : 'left' }}>
        {lang.resume.skills.note1}
        <p style={{ marginBottom: '0px' }}>
          <b>{lang.resume.skills.note2}</b>
        </p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .progressVisualFull {
    margin: 20px 0px;
  }
  .skill {
    .editpen {
      right: 0px !important;
      left: unset !important;
      top: -5px !important;
    }
  }

  .note {
    text-align: left;
    background: #00000040;
    color: #ccc;
    padding: 6px 15px;
    border-radius: 5px;
    font-size: 0.8rem;
    line-height: 20px;
    margin-bottom: 10px;
  }
`;

export default Skills;

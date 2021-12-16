import styled from 'styled-components';
import ProgressLine from '../progress/ProgressLine';
import { useState } from 'react';
import EditPen from '../utils/EditPen';
import DeleteIcon from '../utils/DeleteIcon';
import NewSkill from './newSkill';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSkill } from '../../store/actions/mainAction';

const Skills = () => {
  const { data } = useSelector(({ main }) => main);
  const [filledSkill, setFilledSkill] = useState({});
  const dispatch = useDispatch();
  const handleEditSkill = (skill, index) => {
    setFilledSkill({ ...skill, index });
  };

  const handleDeleteSkill = (skill) => {
    dispatch(deleteSkill(skill?.id));
  };

  return (
    <Container className="sec">
      <div className="sec-title">Skills</div>
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
            <div className="tools">
              <DeleteIcon
                title={`Delete Skill ${item?.name}`}
                onClick={() => handleDeleteSkill(item)}
              />
              <EditPen
                onClick={() => handleEditSkill(item, index)}
                setFilledSkill={setFilledSkill}
              />
            </div>
          </div>
        ))}
      </div>
      <NewSkill filledSkill={filledSkill} />
      <div className="note">
        These placed percentages are lower than my level of knowledge because I always see myself as
        less than what I am.
        <p style={{ marginBottom: '0px' }}>
          <b>I can interact with and use any tool, library and framework related to javascript</b>
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
      position: unset;
      /* right: 0px !important;
      left: unset !important;
      top: -5px !important; */
    }

    .tools {
      position: absolute;
      top: -5px;
      right: 0px;
      display: flex;
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

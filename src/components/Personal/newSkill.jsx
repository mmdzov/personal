import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { ChromePicker } from 'react-color';
import ProgressLine from '../progress/ProgressLine';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, changeSkill } from '../../store/actions/mainAction';
import useTokenDecode from '../../hooks/useTokenDecode';
import useLanguage from '../../hooks/useLanguage';

const { Group } = Input;

const defaultSkill = {
  color: '',
  name: '',
  knowledge: '',
};

const NewSkill = ({ filledSkill, setFilledSkill = () => {} }) => {
  const { data } = useSelector(({ main }) => main);
  const [skill, setSkill] = useState(defaultSkill);
  const dispatch = useDispatch();

  useEffect(() => {
    setSkill(filledSkill);
  }, [filledSkill]);

  const [pick, setPick] = useState(false);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (skill?.index >= 0) {
      dispatch(changeSkill({ skill_id: data.skills[skill?.index].id, ...skill }));
      setFilledSkill({});
    } else {
      dispatch(addSkill(skill));
    }
    setSkill(defaultSkill);
  };

  const handleChangeColor = useCallback((e) => {
    setSkill((prev) => ({ ...prev, color: e?.hex }));
  }, []);
  const decoded = useTokenDecode();

  const lang = useLanguage();

  if (!decoded?.isAdmin) return null;
  return (
    <Container className="newskill" onSubmit={handleSubmit} id="newSkill">
      <div className="title" style={{ textAlign: lang.language === 'english' ? 'left' : 'right' }}>
        {lang.resume.skills.addskill}
      </div>
      <Group style={{ direction: lang.language === 'english' ? 'rtl' : 'ltr' }}>
        <Input
          placeholder={lang.resume.skills.inputs.placeholder}
          name="name"
          value={skill.name}
          onChange={handleChange}
        />
        <Input
          type="tel"
          placeholder={lang.resume.skills.inputs.knowledge}
          name="knowledge"
          value={skill.knowledge}
          onChange={handleChange}
        />
      </Group>
      <div className="color-picker">
        <div
          className="color-picker-title"
          onClick={() => setPick((prev) => !prev)}
          style={{ textAlign: lang.language === 'english' ? 'left' : 'right' }}
        >
          {lang.resume.skills.inputs.pickcolor}
        </div>
        {pick ? (
          <ChromePicker
            color={skill.color}
            onChangeComplete={handleChangeColor}
            onChange={handleChangeColor}
          />
        ) : null}
      </div>

      <div className="live-demo">
        <ProgressLine
          labelStyle={{ textAlign: lang.language === 'english' ? 'left' : 'right' }}
          key={~~Math.floor(Math.random() * 99999)}
          label={skill?.name || lang.resume.skills.inputs.example}
          backgroundColor="#ccc"
          visualParts={[
            {
              percentage: `${skill?.knowledge || '10'}%`,
              color: skill?.color || 'red',
            },
          ]}
        />
      </div>
      <div className="" style={{ textAlign: 'right', padding: '0 10px', marginBottom: '10px' }}>
        <Button type="primary" onClick={handleSubmit}>
          {lang.resume.skills.buttons.add}
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.form`
  padding: 10px 0px;
  // background: #08090d;
  margin-bottom: 20px;
  border-radius: 6px;
  /* box-shadow: 0 5px 10px 1px black; */

  .title {
    font-size: .8rem;
    color: #959595;
    font-weight: 200;
}
  }
  .ant-input-group {
    display: grid;
    grid-template-columns: 2fr 1fr;
    margin: 10px 0px;
    text-align: left;
    padding: 0 10px;
  }

  .live-demo {
    padding: 0 12px;
    
    .progressLabel {
      font-size: .9rem;
      margin-bottom: 15px;
      color: #8b8b8b;
      font-weight: 200;
    }
  }

  .color-picker {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    .color-picker-title {
      width: 100%;
      text-align: left;
      padding: 10px 9px;
      margin-bottom: 10px;
      font-weight: bold;
      color: #d1d1d1;
      cursor: pointer;
    }
    .chrome-picker {
      position: absolute;
      bottom: 45px;
    }
  }
`;

export default NewSkill;

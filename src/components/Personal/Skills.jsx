import styled from "styled-components";
import Context from "../../context/Context";
import ProgressLine from "../progress/ProgressLine";
import { useContext } from "react";
const Skills = () => {
  const { data } = useContext(Context);

  return (
    <Container className="sec">
      <div className="sec-title">Skills</div>
      <div className="sec-list" style={{ marginTop: 20 }}>
        {data?.skills?.map((item) => (
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
        ))}
      </div>
      <div className="note">
        These placed percentages are lower than my level of knowledge because I
        always see myself as less than what I am.
        <p style={{ marginBottom: "0px" }}>
          <b>
            I can interact with and use any tool, library and framework related
            to javascript
          </b>
        </p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .progressVisualFull {
    margin: 20px 0px;
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

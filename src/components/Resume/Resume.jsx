import styled from 'styled-components';
import Repos from '../github/Repos';
import ContactUs from '../Personal/ContactUs';
import Header from '../Personal/Header';
import Skills from '../Personal/Skills';

const Resume = () => {
  return (
    <Container>
      <Header />
      <Body>
        <Skills />
        <div className="">
          <Repos />
          <ContactUs />
        </div>
      </Body>
      <div className="sec">
        <div className="sec-title">Location</div>
        <div className="sec-list">Iran / Khuzestan / Abadan</div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 15px;
`;

const Body = styled.div`
  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 760px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    & > .sec {
      border-bottom: 0px !important;
    }
  }
`;
export default Resume;

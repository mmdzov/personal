/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import useLanguage from '../../hooks/useLanguage';
import RelatedBlogs from '../Blog/RelatedBlogs';
import Repos from '../github/Repos';
import ContactUs from '../Personal/ContactUs';
import Header from '../Personal/Header';
import Skills from '../Personal/Skills';
import Timeline from '../Timeline/Timeline';

const Resume = () => {
  const lang = useLanguage();

  return (
    <Container>
      <Header />
      <RelatedBlogs />
      <Body>
        <Skills />
        <div className="">
          {/* {about.map((item, index) => (
            <div className="about" key={index}>
              <div className="label">
                <div className="date">{item.date}</div>
                <div className="title"> - {item.title}</div>
              </div>
              <div className="subtitle">{item.subtitle}</div>
            </div>
          ))} */}
          <Timeline />
          {/* <Repos /> */}
          <ContactUs />
        </div>
      </Body>
      <div className="sec">
        <div className="sec-title">{lang.location?.title}</div>
        <div className="sec-list">
          {lang.location?.country} / {lang.location?.state} / {lang.location?.city}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* padding: 10px 15px; */

  .about {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: start;
    padding: 0px 20px;
    background: black;
    margin: 0px 15px;
    box-shadow: 0 5px 10px 0px black;
    /* border-radius: 10px; */
    color: #d7d7d7;

    @media (min-width: 480px) {
      max-width: 400px;
      margin: 0 auto;
    }

    .date {
      font-size: 0.7rem;
      font-weight: bold;
      color: #607d8b;
    }

    .label {
      display: flex;
      align-items: center;
      margin-top: 5px;
      margin-bottom: 5px;
      padding: 0 5px;
      flex-wrap: wrap;
    }
    .title {
      font-size: 0.8rem;
      padding: 0 5px;
      /* background: #3f51b5; */
      color: white;
      /* margin: 0 5px; */
      border-radius: 2px;
    }

    .subtitle {
      font-size: 0.8rem;
      margin-bottom: 10px;
      color: #9e9e9e;
      text-align: left;
    }
    &::before {
      content: '';
      position: absolute;
      height: 100%;
      width: 2px;
      left: 10px;
      background: #383838;
    }
    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 9px;
      background: #607d8b;
      left: 8px;
      top: 9px;
      border-radius: 100px;
    }
  }
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

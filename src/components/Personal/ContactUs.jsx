import { useContext, Fragment } from 'react';
import styled from 'styled-components';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaTelegramPlane, FaGithub } from 'react-icons/fa';
import Context from '../../context/Context';
import useLanguage from '../../hooks/useLanguage';

const ContactUs = () => {
  const { data } = useContext(Context);
  const lang = useLanguage();
  return (
    <Fragment>
      <Container className="sec">
        <div className="sec-title">{lang.contact.title}</div>
        <div className="sec-list" style={{ padding: '0 15px', marginTop: '20px' }}>
          <div className="contact">
            <div className="title">{lang.contact.socialmedia}</div>
            <div className="description">
              <a href="https://instagram.com/mmdzov" target="__blank">
                <IoLogoInstagram />
              </a>
              <a href="https://t.me/mmdzov" target="__blank">
                <FaTelegramPlane />
              </a>
              <a href="https://github.com/mmdzov" target="__blank">
                <FaGithub />
              </a>
            </div>
          </div>
          {data?.contact_us?.map((item) => (
            <div className="contact" key={~~Math.floor(Math.random() * 99999)}>
              <div className="title">{item?.title}</div>
              <div className="description">{item.value}</div>
            </div>
          ))}
        </div>
      </Container>
    </Fragment>
  );
};

const Container = styled.div`
  @media (min-width: 640px) {
    border-bottom: 0px !important;
  }import useLanguage from './../../hooks/useLanguage';


  .contact {
    display: flex;
    justify-content: space-between;
    height: 40px;
    .description {
      a {
        font-size: 1rem;
        align-items: center;
        padding: 0 5px;
        color: whitesmoke;
      }
    }
  }
`;

export default ContactUs;

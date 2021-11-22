/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import SignModal from '../Sign/SignModal';
import { AiFillNotification } from 'react-icons/ai';
import Context from '../../context/Context';

const Navigation = () => {
  const [sign, setSign] = useState(false);
  const [signed] = useState(true);
  const { notifications } = useContext(Context);
  return (
    <Container>
      <div className="">
        <Link to="/chat" className="l">
          Chat
        </Link>
        <Link to="/blog" className="l">
          Blog
        </Link>
      </div>
      {!signed ? (
        <div className="link" onClick={() => setSign(true)}>
          Sign
        </div>
      ) : null}
      {/* <Link to="/notification" className="notification">
          {notifications.some((item) => item.unread) ? <span className="unreadNotifIcon" /> : null}
          <AiFillNotification />
        </Link> */}
      <SignModal showModal={sign} setShowModal={setSign} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0 15px;
  height: 30px;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  > div {
    display: flex;
  }

  .notification {
    font-size: 1.2rem;
    padding-top: 8px;
    color: #e5e5e5;
    position: relative;
    cursor: pointer;

    .unreadNotifIcon {
      width: 7px;
      height: 7px;
      display: flex;
      background: #f44336;
      border-radius: 100px;
      position: absolute;
      top: 10px;
      right: 0px;
    }
  }

  .link {
    color: #03a9f4;
    font-size: 1rem;
    cursor: pointer;
  }
  .l {
    padding: 0 15px;
    margin: 0 5px;
    height: 100%;
    padding-top: 5px;
    display: flex;
    align-items: center;
    background: black;
    color: white;
    border-radius: 6px;
    box-shadow: 0 5px 6px 1px black;
  }
`;

export default Navigation;

/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import SignModal from '../Sign/SignModal';
import { AiFillNotification } from 'react-icons/ai';
import { IoReturnUpForward } from 'react-icons/io5';
import Context from '../../context/Context';
import { PageHeader } from 'antd';

const Navigation = () => {
  const [sign, setSign] = useState(false);
  const [signed] = useState(false);
  const { notifications, user } = useContext(Context);
  const { pathname } = useLocation();
  const isActive = (page) => {
    let pg = page;
    if (page === 'home') {
      pg = pathname.split('/').every((item) => !item);
    }
    return pg === true ? true : pathname.includes(pg);
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      {isActive('home') === true ? (
        <div className="signicon">
          {!signed ? (
            <div className="link" onClick={() => setSign(true)}>
              Sign
            </div>
          ) : null}
        </div>
      ) : (
        <PageHeader
          className="site-page-header"
          onBack={handleGoBack}
          title={pathname?.split('/')[1]}
          extra={[
            !signed ? (
              <div className="link" onClick={() => setSign(true)}>
                Sign
              </div>
            ) : null,
          ]}
        />
      )}

      <div className="navs" style={{ marginTop: isActive('home') === true ? 20 : 0 }}>
        <Link to="/" className={`l ${isActive('home') ? 'active' : ''} `}>
          Home
        </Link>
        <Link
          to={user?.isAdmin ? '/chatlist' : '/chat'}
          className={`l ${isActive('chat') ? 'active' : ''} `}
        >
          Chat
        </Link>
        <Link to="/blog" className={`l ${isActive('blog') ? 'active' : ''} `}>
          Blog
        </Link>
      </div>
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
  /* padding: 0 10px; */
  /* height: 30px; */
  align-items: center;
  /* justify-content: space-between; */
  flex-direction: column;

  .signicon {
    width: 100%;
    justify-content: end;
    height: 40px;
    align-items: center;
    padding: 0 15px;
  }

  .ant-page-header.site-page-header.ant-page-header-ghost.ant-page-header-compact {
    width: 100% !important;
    background: #000000 !important;
    margin-bottom: 15px !important;
  }

  .ant-page-header-back {
    color: white !important;
  }

  .ant-page-header-back-button {
    color: white !important;
  }

  .ant-page-header-heading {
    width: 100% !important;
    align-items: center;
  }

  .ant-page-header-heading-title {
    color: white !important;
  }

  .header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: row-reverse;
    align-items: center;
    margin-top: 10px;
  }

  .backward {
    font-size: 2.2rem;
    line-height: 26px;
    cursor: pointer;
  }

  .navs {
    align-items: center;
    display: flex;
    overflow-x: auto;
    margin-bottom: 10px;
    width: 100%;
    padding-bottom: 15px;
  }

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
    height: 35px;
    padding-top: 1px;
    display: flex;
    align-items: center;
    background: black;
    color: white;
    border-radius: 6px;
    box-shadow: 0 5px 6px 1px black;
  }

  .active {
    background: #607d8b !important;
    box-shadow: 0 5px 6px -1px #607d8b !important;
  }
`;

export default Navigation;

/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import SignModal from '../Sign/SignModal';
import { AiFillNotification } from 'react-icons/ai';
import { IoReturnUpForward, IoLanguage } from 'react-icons/io5';
import { PageHeader } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useTokenDecode from '../../hooks/useTokenDecode';
import { setLang } from '../../store/actions/mainAction';
import useLanguage from '../../hooks/useLanguage';

const Navigation = ({ navigation }) => {
  const { verified } = useSelector(({ main }) => main);
  const [sign, setSign] = useState(false);
  const { data } = useSelector(({ main }) => main);
  const { pathname } = useLocation();
  const decoded = useTokenDecode();
  const dispatch = useDispatch();

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

  const [openLangMenu, setOpenLangMenu] = useState(false);

  const [langs] = useState([
    { type: 'english', name: 'English' },
    { type: 'persian', name: 'فارسی' },
  ]);

  const handleSetLang = async (lang) => {
    await setOpenLangMenu(false);
    await dispatch(setLang(lang));
  };

  const handleLangMenu = () => {
    setOpenLangMenu((prev) => !prev);
  };

  const handleCloseLang = () => {
    setOpenLangMenu(false);
  };

  const lang = useLanguage();

  useEffect(() => {
    if (openLangMenu) {
      const lang = document.getElementsByClassName('langs')?.[0];
      lang?.focus();
    }
  }, [openLangMenu]);

  return (
    <Container>
      {isActive('home') === true ? (
        <div className="toolbar" style={{ direction: 'ltr' }}>
          <div className="lang">
            <IoLanguage onClick={handleLangMenu} />
            {openLangMenu ? (
              <div className="langs" onBlur={handleCloseLang} tabIndex={'-1'}>
                {langs.map((item) => (
                  <div
                    className=""
                    onClick={() => handleSetLang(item.type)}
                    style={{
                      textAlign: /^[a-zA-Z]/.test(item?.name) ? 'left' : 'right',
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="signicon">
            {!verified ? (
              <div className="link" onClick={() => setSign(true)}>
                {lang?.toolbar?.sign}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <PageHeader
          className="site-page-header"
          onBack={handleGoBack}
          title={pathname
            ?.split('/')[1]
            .split('')
            .map((item, i) => (i === 0 ? item.toUpperCase() : item.toLowerCase()))
            .join('')}
          style={{ direction: 'ltr' }}
          extra={[
            !verified ? (
              <div className="link" onClick={() => setSign(true)}>
                {lang?.toolbar?.sign}
              </div>
            ) : null,
          ]}
        />
      )}

      {navigation ? (
        <div className="navs" style={{ marginTop: isActive('home') === true ? 10 : 0 }}>
          <Link to="/" className={`l ${isActive('home') ? 'active' : ''} `}>
            {lang?.navbar?.home}
          </Link>
          <Link
            to={decoded?.isAdmin ? '/chats' : '/chat'}
            className={`l ${isActive('chat') ? 'active' : ''} `}
          >
            {lang?.navbar?.chat}
          </Link>
          <Link to="/blog" className={`l ${isActive('blog') ? 'active' : ''} `}>
            {lang?.navbar?.blog}
          </Link>
          <Link to="/tags" className={`l ${isActive('tags') ? 'active' : ''} `}>
            {lang?.navbar?.tags}
          </Link>
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
  /* padding: 0 10px; */
  /* height: 30px; */
  align-items: center;
  /* justify-content: space-between; */
  flex-direction: column;

  .toolbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }

  .langs {
    font-size: 0.8rem;
    position: absolute;
    left: 10px;
    top: 40px;
    width: 130px;
    display: flex;
    flex-direction: column;
    background: #181818;
    border-radius: 5px;
    > div {
      padding: 7px 10px;

      &:active,
      &:hover {
        background: #101010;
        transition: 0.2s ease-in-out;
      }
    }
    overflow: hidden;
  }

  .lang {
    font-size: 1.3rem;
    margin-top: 5px;
    margin-left: 10px;
    padding: 5px;
    color: #bdbdbd;
    cursor: pointer;
    align-items: center;
    display: flex;
  }

  .signicon {
    justify-content: end;
    max-height: 40px;
    align-items: center;
    padding: 0 15px;
    > .link {
      margin-top: 10px;
    }
  }

  .ant-page-header.site-page-header.ant-page-header-ghost {
    direction: ltr;
    padding: 0px !important;
    background: unset !important;
    box-shadow: unset !important;
    width: 100% !important;
    margin-bottom: 10px !important;
  }

  .ant-page-header-heading-left {
    padding: 0px 0px;
    width: 100%;
    margin-top: 5px;
  }

  .ant-page-header-heading-title {
    color: #c1c1c1 !important;
    font-weight: 400;
    font-size: 1.1rem !important;
  }

  .ant-page-header-back {
    margin: 0;
    font-size: 1rem;
    padding: 14px 15px;
    color: #c1c1c1 !important;
  }

  .ant-page-header-back-button {
    color: white !important;
  }

  .ant-page-header-heading {
    width: 100% !important;
    align-items: center;
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
    padding: 10px 7px;
    // padding-bottom: 15px;
    // justify-content: space-around;
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
    padding: 8px 20px;
    // margin: 0 4px;
    // height: 30px;
    /* padding-top: 1px; */
    display: flex;
    align-items: center;
    // background: black;
    white-space: pre;
    color: #c7c7c7;
    border-radius: 4px;
    // box-shadow: 0 5px 6px -2px black;
  }

  .active {
    background: #3f51b5 !important;
    box-shadow: 0 5px 6px -3px #3f51b5 !important;
  }
`;

export default Navigation;

/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Context from './context/Context';
import axios from 'axios';
import Routes from './Routes';
import PostImage from './assets/img/post.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { getMain, setAuthUser, setAutoLang } from './store/actions/mainAction';
import appWrapper from './hoc/appWrapper';
import useLanguage from './hooks/useLanguage';
import Loading from './components/Loading/Loading';
import { persistStore } from 'redux-persist';
import { store } from './store/store';

function App() {
  const { language } = useSelector(({ main }) => main);
  const dispatch = useDispatch();
  const lang = useLanguage();

  const [data, setData] = useState({
    contact_us: [
      { title: lang.contact.call, value: '+989356597910' },
      { title: lang.contact.email, value: 'Mzov939@gmail.com' },
    ],
  });

  useEffect(() => {
    dispatch(setAutoLang());
    dispatch(getMain());
    dispatch(setAuthUser());
  }, []);

  useEffect(() => {
    let localStLang = localStorage.getItem('lang');
    if (localStLang !== language) localStorage.setItem('lang', language);
    if (!localStLang) {
      localStorage.setItem('lang', 'english');
      dispatch(setAutoLang());
    }

    setData({
      contact_us: [
        { title: lang.contact.call, value: '+989356597910' },
        { title: lang.contact.email, value: 'Mzov939@gmail.com' },
      ],
    });
  }, [lang]);

  const [notifications] = useState([
    {
      unread: true,
      type: 'post',
      data: {
        id: '40923420tfsdjj0023',
        title: 'Hello world from blog',
        description:
          // eslint-disable-next-line max-len
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, libero voluptatibus! Odio, illum? Ad placeat vel doloribus neque. Consequuntur delectus aliquam dolorum doloribus sint alias impedit placeat reprehenderit voluptate blanditiis.',
        date: Date.now(),
        image: PostImage,
      },
    },
  ]);

  // const getUser = async () => {
  //   try {
  //     const { data } = await axios.get('https://api.github.com/users/mmdzov');
  //     setData((prev) => ({
  //       ...prev,
  //       person: { ...prev.person, avatar: data.avatar_url },
  //     }));
  //     return data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);


  return (
    <Context.Provider value={{ data, notifications }}>
      <Container className="App">
        <Routes />
      </Container>
    </Context.Provider>
  );
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #0b0c12;
  color: whitesmoke;
  overflow-y: auto;
  overflow-x: hidden;
  .sec {
    @media (min-width: 799px) {
      max-width: 800px;
      margin: 0 auto !important;
    }import useLanguage from './hooks/useLanguage';

    padding: 10px 10px;
    margin: 12px 0px;
    width: 100%;
    /* border-bottom: 2px solid #858585; */
    box-sizing: border-box;
    .sec-title {
      text-align: left;
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 5px;
      // padding: 0 10px;
      height: 30px;
      align-items: center;
      display: flex;
      color: #c9c9c9;
    }
    .sec-list {
      font-size: 0.8rem;
      display: flex;
      flex-direction: column;
      text-align: left;
      padding: 0 10px;
      color: #b5b5b5;
      > span {
        padding: 5px 0px;
      }
    }
  }
`;

export default appWrapper(App);

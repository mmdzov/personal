import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Context from './context/Context';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Resume from './components/Resume/Resume';
import Chat from './components/Chat/Chat';
import Avatar from './assets/img/avatar.jpg';
import PrivateRoute from './components/PrivateRoute';
import ChatList from './components/Chat/ChatList';
import Home from './components/Home/Home';

function App() {
  const [user] = useState({
    avatar: Avatar,
    username: 'Reza',
  });
  const [data, setData] = useState({
    person: {
      fullName: 'Mohammad-Ali Zoveydat',
      avatar: '',
      bio: ['Looking To implement New IDEAS'],
    },
    skills: [
      { name: 'Javascript', knowledge: '99', color: '#d1ac17' },
      { name: 'React.Js', knowledge: '95', color: '#2656bd' },
      { name: 'Typescript', knowledge: '65', color: '#391182' },
      { name: 'Node.Js', knowledge: '60', color: '#0ad195' },
      { name: 'Express.Js', knowledge: '80', color: '#d1350a' },
      { name: 'TDD', knowledge: '19', color: '#d11b1b' },
      { name: 'MongoDB - Mongoose', knowledge: '50', color: '#0ad135' },
      { name: 'Postman', knowledge: '98', color: '#d1670a' },
      { name: 'TelegramBot Api', knowledge: '100', color: '#0a88d1' },
      { name: 'TelegramBot Client', knowledge: '30', color: '#45b3d1' },
    ],
    contact_us: [
      { title: 'Call', value: '+989356597910' },
      { title: 'Email', value: 'Mzov939@gmail.com' },
    ],
    about: [
      {
        date: '1397/4',
        title: 'Basic PHP',
        subtitle: 'Here I started php from zero',
      },
      {
        date: '1397/4',
        title: 'Basic PHP',
        subtitle: 'Here I started php from zero',
      },
      {
        date: '1397/4',
        title: 'Basic PHP',
        subtitle: 'Here I started php from zero',
      },
      {
        date: '1397/4',
        title: 'Basic PHP',
        subtitle: 'Here I started php from zero',
      },
    ],
  });
  const getUser = async () => {
    try {
      const { data } = await axios.get('https://api.github.com/users/mmdzov');
      setData((prev) => ({
        ...prev,
        person: { ...prev.person, avatar: data.avatar_url },
      }));
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Router>
      <Context.Provider value={{ data, user, about: data.about }}>
        <Container className="App">
          <Routes>
            <Route path="personal" exact element={<Resume />} />
            <Route path="/" exact element={<Home />} />
            <Route
              path="chat"
              exact
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
          </Routes>

          {/* //!need admin access */}
          <Routes>
            <Route
              path="chatlist"
              exact
              element={
                <PrivateRoute>
                  <ChatList />
                </PrivateRoute>
              }
            />
            <Route
              path="chat/:uid"
              exact
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </Context.Provider>
    </Router>
  );
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #19203e;
  color: whitesmoke;
  overflow-y: auto;
  overflow-x: hidden;
  .sec {
    @media (min-width: 799px) {
      max-width: 800px;
      margin: 0 auto !important;
    }

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
      padding: 0 10px;
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

export default App;

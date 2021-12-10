import { Container } from './ChatList.styled';
import { useState, useEffect } from 'react';
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { AiFillClockCircle } from 'react-icons/ai';
import LineEllipsis from 'react-lines-ellipsis';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../config/socket';
import useTokenDecode from '../../hooks/useTokenDecode';
import errorImg from '../utils/errorImg';
import { Image } from 'antd';

const io = socket;

const ChatList = () => {
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();

  let decoded = useTokenDecode((decoded) => {
    if (!decoded?.isAdmin) {
      navigate('/', { replace: true });
    } else {
      io.emit('admin-access', {});
      io.on('admin-access-result', (data) => {
        if (data?.access === false) {
          navigate('/', { replace: true });
        }
      });
    }
  });

  useEffect(() => {
    io.on('send-chatlist', (data) => {
      setChats(data);
    });
  }, [chats]);

  useEffect(() => {
    io.emit('get-chatlist', {});
    io.on('send-chatlist', (data) => {
      setChats(data);
    });
  }, []);

  return (
    <Container>
      <div className="title" onClick={() => navigate('/', { replace: true })}>
        Chatlist
      </div>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="chat"
          onClick={() => navigate(`/chat/${chat.user?._id}`, { replace: true })}
        >
          <Image className="avatar" src={chat?.user?.avatar} fallback={errorImg} />

          <div className="centered-content">
            <div className="username">{chat?.user?.username}</div>
            <div className="message">
              <LineEllipsis
                className="description"
                text={chat.chat.last_message?.message.text ?? 'No Messages'}
                maxLine="1"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </div>
          </div>
          <div className="right-content">
            {chat.chat.last_message?.from === decoded?._id ? (
              <div className="">
                {chat.chat.last_message?.sending ? (
                  <AiFillClockCircle />
                ) : chat.chat.last_message?.seen ? (
                  <IoCheckmarkDoneOutline />
                ) : (
                  <IoCheckmarkOutline />
                )}
              </div>
            ) : chat.chat.unreads?.length > 0 ? (
              <div className="unreadMessageCount">{chat.chat?.unreads?.length}</div>
            ) : (
              <span />
            )}
            <div className="" style={{ fontSize: '.7rem' }}>
              {new Date(chat.chat.last_message.date)
                .toLocaleTimeString('fa-IR')
                .split(':')
                .filter((_, index) => index !== 2)
                .join(':')}
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default ChatList;

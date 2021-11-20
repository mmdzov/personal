import { Container } from './ChatList.styled';
import { useContext, useState } from 'react';
import Context from '../../context/Context';
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from 'react-icons/io5';
import { AiFillClockCircle } from 'react-icons/ai';
import LineEllipsis from 'react-lines-ellipsis';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const { user } = useContext(Context);
  const [user_id] = useState(243524325);
  const [chats] = useState([
    {
      user: {
        ...user,
        user_id: user_id,
      },
      messages: [
        {
          from: {
            ...user,
            user_id: 342394238,
          },
          message: 'Hi ',
          date: Date.now(),
          seen: true,
        },
        {
          from: {
            ...user,
            user_id: user_id,
          },
          message: 'Hi',
          date: Date.now(),
          seen: false,
          sending: false,
        },
      ],
    },
    {
      user: {
        ...user,
        user_id: 342342432,
      },
      messages: [
        {
          from: {
            ...user,
            user_id: 342394238,
          },
          message: 'Hi ',
          date: Date.now(),
          seen: true,
        },
        {
          from: {
            ...user,
            user_id: 32342342,
          },
          message: 'Hi',
          date: Date.now(),
          seen: true,
          sending: false,
        },
      ],
    },
    {
      user: {
        ...user,
        user_id: user_id,
      },
      messages: [],
    },
  ]);

  const getLastMsg = (chat) => {
    return chat?.messages[chat?.messages?.length > 0 ? chat?.messages?.length - 1 : 0];
  };

  const getUnreadMessageCount = (messages) => {
    const getUnreadMsgs = messages.filter((item) => !item.seen && item.from.user_id !== user_id);
    return getUnreadMsgs.length;
  };

  const navigate = useNavigate();

  return (
    <Container>
      <div className="title" onClick={() => navigate('/', { replace: true })}>
        Chatlist
      </div>
      {chats.map((chat) => (
        <div
          className="chat"
          onClick={() => navigate(`/chat/${chat.user.user_id}`, { replace: true })}
        >
          <img src={chat.user.avatar} alt="" className="avatar" />
          <div className="centered-content">
            <div className="username">{chat.user.username}</div>
            <div className="message">
              <LineEllipsis
                className="description"
                text={getLastMsg(chat)?.message ?? 'No Messages'}
                maxLine="1"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </div>
          </div>
          <div className="right-content">
            {getLastMsg(chat)?.from?.user_id === user_id ? (
              <div className="">
                {getLastMsg(chat)?.sending ? (
                  <AiFillClockCircle />
                ) : getLastMsg(chat)?.seen ? (
                  <IoCheckmarkDoneOutline />
                ) : (
                  <IoCheckmarkOutline />
                )}
              </div>
            ) : getUnreadMessageCount(chat.messages)?.length > 0 ? (
              <div className="">{getUnreadMessageCount(chat.messages)}</div>
            ) : (
              <span />
            )}
            <div className="">4:30</div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default ChatList;

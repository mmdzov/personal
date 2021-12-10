/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, Fragment, useRef } from 'react';
import Context from '../../context/Context';
import { Container } from './Chat.styled';
import { Input, Button } from 'antd';
import {
  IoReturnUpForward,
  IoSend,
  IoCheckmarkDoneOutline,
  IoCheckmarkOutline,
  IoChatbubbles,
} from 'react-icons/io5';
import { AiFillClockCircle } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketNamespaces, socket } from '../../config/socket';
import useTokenDecode from '../../hooks/useTokenDecode';
import { customAlphabet } from 'nanoid';
import { useSelector } from 'react-redux';

const io = socket;

const { TextArea } = Input;

const Chat = () => {
  const { data } = useSelector(({ main }) => main);
  const { user } = useContext(Context);
  const decoded = useTokenDecode();
  const { uid } = useParams();

  const messageDataStructure = (data, mode = 'INIT') => {
    const result = data
      .sort((a, b) => b.date - a.date)
      .reduce((prev, curr) => {
        const localeDate = new Date(curr.date).toLocaleDateString('fa-IR');
        if (prev[localeDate]) prev[localeDate].push(curr);
        else prev[localeDate] = [curr];
        return prev;
      }, {});

    let msgs = [];
    if (mode === 'INIT') {
      for (let i in result) {
        msgs.push({ date: i, messages: [...result[i]].reverse() });
      }
    }
    msgs = msgs.reverse();
    return msgs;
  };

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    io.emit('last-messages', {
      param: uid ?? data?._id,
    });
    io.on('last-message-send', (data) => {
      if (data?.no_messages) return;
      let d = data?.map((item) => {
        item.message = typeof item?.message === 'string' ? JSON.parse(item.message) : item.message;
        return item;
      });
      let msgs = messageDataStructure(d);
      setMessages(msgs);
    });
    io.removeAllListeners('get-last-messages');
    return () => {
      setMessages([]);
    };
  }, []);

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
  };

  const msgRef = useRef();
  const msgInputRef = useRef();
  useEffect(() => {
    if (messages?.length > 0) {
      if (msgRef?.current) {
        msgRef.current.scrollTo(0, msgRef.current.scrollHeight);
      }
    }
  }, [messages]);

  useEffect(() => {
    const msgs = messages;
    io.on('callback_message', async (data) => {
      let currentDate = new Date().toLocaleDateString('fa-IR');
      let result = msgs.map((item) => {
        if (item?.date === currentDate) {
          const msgIndex = item.messages.findIndex((msg) => msg.message_id === data.callback_id);
          if (msgIndex >= 0) {
            item.messages[msgIndex] = data;
          } else {
            item.messages.push(data);
          }
        }
        return item;
      });
      setMessages(result);
      io.removeAllListeners('callback_message');
    });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const msgs = messages;
    const messageId = customAlphabet('1234567890', 10)();
    let currentDate = new Date().toLocaleDateString('fa-IR');
    let today = msgs.findIndex((item) => item.date === currentDate);
    let sendingSchema = {
      message: { text: value },
      date: Date.now(),
      sending: true,
      from: decoded?._id,
      message_id: messageId,
    };
    if (today >= 0) {
      msgs[today].messages.push(sendingSchema);
    } else
      msgs.push({
        date: currentDate,
        messages: [sendingSchema],
      });
    await setMessages(msgs);
    io.emit(
      'message',
      JSON.stringify({
        text: value,
        to: decoded?.isAdmin ? uid : '',
        message_id: messageId,
      }),
    );

    await setValue('');
    await msgInputRef?.current?.focus();
  };

  const handleScrollMessage = async (e) => {
    const st = e.target?.scrollTop;
    if (st === 0) {
      //! get last messages
      // await setChat((prev) => [...newChatData, ...prev]);
      // e.target.scrollTo(0, 300);
    }
  };

  const getChatDate = (microseconds) => {
    let date = new Date(microseconds).toLocaleTimeString('fa-IR').split(':');
    date.pop();
    date = date.join(':');
    return date;
  };

  const navigate = useNavigate();

  return (
    <Container>
      <div className="header">
        <div className="">
          {/* <img src={user.avatar} alt="" /> */}
          <div className="username">{user?.username}</div>
        </div>

        <div
          className="chatlistIcon"
          onClick={() => navigate(decoded?.isAdmin ? '/chatlist' : '/', { replace: true })}
        >
          <IoReturnUpForward />
        </div>
      </div>
      <div className="content scroll" onScroll={handleScrollMessage} ref={msgRef}>
        {messages.length === 0 ? (
          <div className="startChat">
            <IoChatbubbles />
            <span>گفتگو را آغاز کنید</span>
          </div>
        ) : (
          messages.map((item) => (
            <Fragment key={Math.round(Math.random() * 9999999999)}>
              <div className="chatdate">
                <span>{item.date}</span>
                <div className="line" />
              </div>
              {item.messages.map((message) => (
                <div
                  className={`chatitem ${message.from === decoded?._id ? 'you' : 'it'}`}
                  key={message?._id}
                >
                  <div className="chatitem-message">
                    <div className="message">{message.message.text}</div>
                    <div className="chatitem-btm-msg">
                      <div className="chatitem-date">{getChatDate(message.date)}</div>
                      <div className="chatitem-seen">
                        {message.from === decoded?._id ? (
                          <Fragment>
                            {message?.sending ? (
                              <AiFillClockCircle />
                            ) : message.seen ? (
                              <IoCheckmarkDoneOutline />
                            ) : (
                              <IoCheckmarkOutline />
                            )}
                          </Fragment>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Fragment>
          ))
        )}
      </div>
      <form className="chat">
        <TextArea
          value={value}
          onChange={handleChange}
          placeholder="please type..."
          id="textarea"
          ref={msgInputRef}
          className="scroll"
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
        <Button type="primary" onClick={handleSendMessage}>
          <IoSend />
        </Button>
      </form>
    </Container>
  );
};

export default Chat;

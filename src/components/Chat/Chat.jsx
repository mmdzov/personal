/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, Fragment, useRef } from 'react';
import Context from '../../context/Context';
import { Container } from './Chat.styled';
import { Input, Button, Image } from 'antd';
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
import errorImg from '../utils/errorImg';
import { Helmet } from 'react-helmet';

const io = socket;

const { TextArea } = Input;

const createScrollStopListener = (element, callback) => {
  let removed = false;
  let handle = null;
  const onScroll = () => {
    if (handle) clearTimeout(handle);
    handle = setTimeout(callback, 200);
  };
  element.addEventListener('scroll', onScroll);
  return () => {
    if (removed) return;
    removed = true;
    if (handle) clearTimeout(handle);
    element.removeEventListener('scroll', onScroll);
  };
};

const Chat = () => {
  const { data } = useSelector(({ main }) => main);
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
  const [user, setUser] = useState();
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
    io.emit('get-user-chat', { param: uid });
    io.on('user-chat', (data) => {
      setUser(data);
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
        msgRef.current.scroll({
          top: msgRef.current.scrollHeight,
          left: 0,
          behavior: 'auto',
        });
      }
    }
  }, [messages]);

  useEffect(() => {
    io.removeAllListeners('callback_message');
    io.on('callback_message', async (data) => {
      let currentDate = new Date().toLocaleDateString('fa-IR');
      let result = messages.map((item) => {
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
    });
  }, [messages]);

  useEffect(() => {
    io.on('read-unread-messages', (unreads) => {
      // console.log(unreads);
      if (unreads?.length === 0) return;
      let res = messages.map((item) => {
        // ! not accepted unreads
        const messageIndex = item.messages.findIndex((msg) => unreads?.includes(msg?._id));
        // console.log(messageIndex);
        if (messageIndex >= 0) {
          item.messages[messageIndex].seen = true;
        }
        return item;
      });
      setMessages(res);
      io.removeAllListeners('read-unread-messages');
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
    if (today >= 0) msgs[today].messages.push(sendingSchema);
    else
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

  const [unreadMessages, setUnreadMessages] = useState([]);

  useEffect(() => {
    let destroyListener = createScrollStopListener(msgRef?.current, () => {
      if (unreadMessages.length > 0 && messages?.length > 0) {
        io.emit('read-messages', { unreads: unreadMessages, param: uid });
      }
    });
    return () => destroyListener();
  }, [messages]);

  const handleScrollMessage = async (e) => {
    const callback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const classNameChunks = entry.target.className.split(' ');
          if (
            !unreadMessages?.some((item) => item === entry.target.id) &&
            eval(classNameChunks?.[1].split(':')?.[1]) === false &&
            classNameChunks?.[2] !== 'you'
          ) {
            let msgs = unreadMessages;
            msgs.push(entry.target.id);
            setUnreadMessages(msgs);
          }
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      threshold: 1,
    });
    document.querySelectorAll('.chatitem').forEach((shape) => observer.observe(shape));

    const st = e.target?.scrollTop;
    if (st === 0) {
      //! get last messages
      // await setChat((prev) => [...newChatData, ...prev]);
      // e.target.scrollTo(0, 300);
    }
  };

  const getChatDate = (ms) => {
    let date = new Date(ms).toLocaleTimeString('fa-IR').split(':');
    date.pop();
    date = date.join(':');
    return date;
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Helmet>
        <title>چت با مدیر | Personal</title>
        {/* <meta name="description" content='' /> */}
      </Helmet>
      <div className="header">
        <div className="">
          {decoded?.isAdmin ? (
            <Fragment>
              <Image fallback={errorImg} preview={false} src={user?.avatar ?? errorImg} />
              <div className="username">{user?.username}</div>
            </Fragment>
          ) : (
            <Fragment>
              <Image fallback={errorImg} preview={false} src={data?.avatar ?? errorImg} />
              <div className="username">{data?.username}</div>
            </Fragment>
          )}
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
          messages.map((item, i) => (
            <Fragment key={i}>
              <div className="chatdate">
                <span>{item.date}</span>
                <div className="line" />
              </div>
              {item.messages.map((message) => (
                <div
                  id={message?._id}
                  className={`chatitem seen:${message?.seen} ${
                    message.from === decoded?._id ? 'you' : 'it'
                  }`}
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

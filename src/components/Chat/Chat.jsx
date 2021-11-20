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
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const Chat = () => {
  const { user } = useContext(Context);
  const [value, setValue] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
  };
  const [user_id] = useState(243524325);
  const [chat, setChat] = useState([
    {
      type: 'date',
      date: Date.now(),
    },
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'Hie [er l[weprl[werroewr 0wer0 e9wir00w9e riw0er9 iwe ',
      date: Date.now(),
      seen: true,
    },
    {
      from: {
        ...user,
        user_id: 342394238,
      },
      message:
        'Hi [elr[ pfks sdofk poekw sdpofk pweo kwefpoksdpfok epwo fkw peflsdf[pelf[wps[dflerw ',
      date: Date.now(),
      seen: true,
    },
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
    },
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
    },
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
      type: 'date',
      date: Date.now(),
    },
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'Hi',
      date: Date.now(),
      seen: false,
    },
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
    },
  ]);

  const msgRef = useRef();
  const msgInputRef = useRef();
  useEffect(() => {
    if (msgRef?.current) {
      msgRef.current.scrollTo(0, msgRef.current.scrollHeight);
    }
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    await setChat((prev) => [
      ...prev,
      {
        from: {
          ...user,
          user_id: user_id,
        },
        message: value,
        date: Date.now(),
        seen: false,
        sending: true,
      },
    ]);
    await setValue('');
    await msgRef.current.scrollTo(0, msgRef.current.scrollHeight);
    await msgInputRef?.current?.focus();
  };
  // useEffect(() => {}, [chat]);

  const [newChatData] = useState([
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'value',
      date: Date.now(),
      seen: true,
      sending: false,
    },
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'value',
      date: Date.now(),
      seen: true,
      sending: false,
    },
    {
      type: 'date',
      date: Date.now(),
    },
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'value',
      date: Date.now(),
      seen: true,
      sending: false,
    },
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'value',
      date: Date.now(),
      seen: true,
      sending: false,
    },
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'value',
      date: Date.now(),
      seen: true,
      sending: false,
    },
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'value',
      date: Date.now(),
      seen: true,
      sending: false,
    },
    {
      from: {
        ...user,
        user_id: user_id,
      },
      message: 'value',
      date: Date.now(),
      seen: true,
      sending: false,
    },
  ]);

  const handleScrollMessage = async (e) => {
    const st = e.target?.scrollTop;
    if (st === 0) {
      await setChat((prev) => [...newChatData, ...prev]);
      console.log();
      e.target.scrollTo(0, 300);
      // console.log();
    }
  };
  const navigate = useNavigate();
  return (
    <Container>
      <div className="header">
        <div className="">
          <img src={user.avatar} alt="" />
          <div className="username">{user.username}</div>
        </div>

        {/* //! need admin access to show blow button */}
        <div className="chatlistIcon" onClick={() => navigate('/chatlist', { replace: true })}>
          <IoReturnUpForward />
        </div>
      </div>
      <div className="content scroll" onScroll={handleScrollMessage} ref={msgRef}>
        {chat.length === 0 ? (
          <div className="startChat">
            <IoChatbubbles />
            <span>گفتگو را آغاز کنید</span>
          </div>
        ) : (
          chat.map((item) => (
            <Fragment>
              {item?.type === 'date' ? (
                <div className="chatdate">
                  <span>13/3/2021</span>
                  <div className="line" />
                </div>
              ) : (
                <div className={`chatitem ${item.from.user_id === user_id ? 'you' : 'it'}`}>
                  <div className="chatitem-message">
                    <div className="message">{item.message}</div>
                    <div className="chatitem-btm-msg">
                      <div className="chatitem-date">3:29</div>
                      <div className="chatitem-seen">
                        {item?.sending ? (
                          <AiFillClockCircle />
                        ) : item.seen ? (
                          <IoCheckmarkDoneOutline />
                        ) : (
                          <IoCheckmarkOutline />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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

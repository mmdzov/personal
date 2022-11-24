import { Input } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';

const ChatNotFound = () => {
  const [username, setUsername] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;

    setUsername(value);
  };

  const handleStartChat = () => {
    console.log(username);
  };

  return (
    <Container className="">
      <div className="">
        <p onClick={handleStartChat}>آغاز</p>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="username"
        />
      </div>

      <p>لیست گفتگو خالی است :(</p>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 10px;

  > p {
    direction: rtl;
    font-size: 0.9rem;
    color: #a1a1a1;
    font-weight: 300;
    margin-top: 145px;
  }

  > div {
    border-radius: 5px;
    display: grid;
    height: 38px;
    grid-template-columns: auto 1fr;
    direction: rtl;
    grid-gap: 7px;
    overflow: hidden;

    > p {
      margin: 0;
      height: 100%;
      padding: 7px;
      font-size: 0.8rem;
      line-height: 24px;
      width: 45px;
      color: #e1e1e1;
      border-radius: 2px;
      background: brown;
      cursor: pointer;
    }

    > input {
      height: 100%;
      border-radius: 5px 0 0 5px;
    }
  }
`;

export default ChatNotFound;

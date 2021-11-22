import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SignModal from '../Sign/SignModal';

const Navigation = () => {
  const [sign, setSign] = useState(false);

  return (
    <Container>
      <div className="">
        <Link to="/chat">Chat</Link>
        <Link to="/blog">Blog</Link>
      </div>
      <div className="link" onClick={() => setSign(true)}>
        Sign
      </div>
      <SignModal showModal={sign} setShowModal={setSign} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0 15px;
  height: 30px;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  > div {
    display: flex;
  }
  .link {
    color: #03a9f4;
    font-size: 1rem;
    cursor: pointer;
  }
  a {
    padding: 0 15px;
    margin: 0 5px;
    height: 100%;
    padding-top: 5px;
    display: flex;
    align-items: center;
    background: black;
    color: white;
    border-radius: 6px;
    box-shadow: 0 5px 6px 1px black;
  }
`;

export default Navigation;

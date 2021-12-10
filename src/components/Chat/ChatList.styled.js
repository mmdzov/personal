import styled from 'styled-components';

export const Container = styled.div`
  max-width: 350px;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 4px 15px 3px black;
  background: black;
  user-select: none;
  @media (max-width: 380px) {
    border-radius: 0px;
    max-width: 100% !important;
    margin: 0px !important;
  }

  .title {
    font-size: 1.5rem;
    text-align: left;
    height: 50px;
    line-height: 47px;
    cursor: pointer;
  }

  .chat {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    margin: 10px 0px;
    padding: 5px 10px;
    background: #0e0e0e;
    border-radius: 10px;
    cursor: pointer;
    &:focus,
    &:active {
      background: #141414;
    }
    img {
      border-radius: 100px;
      width: 50px;
      height: 50px;
    }
    .centered-content {
      text-align: left;
      padding: 0 15px;
      .username {
        font-size: 1rem;
      }
      .message {
        font-size: 0.8rem;
      }
    }
    svg {
      margin-top: 5px;
    }
    .right-content {
      display: flex;
      align-items: end;
      flex-direction: column;
      justify-content: space-between;
      .unreadMessageCount {
        background: #3f51b5;
        font-size: 0.7rem;
        padding: 4px;
        height: 22px;
        border-radius: 100px;
      }
    }
  }
`;

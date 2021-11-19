import styled from "styled-components";

export const Container = styled.div`
  max-width: 350px;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0px 4px 15px 3px black;
  background: black;
  display: grid;
  grid-template-rows: auto 1fr auto;

  .header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    > img {
      height: 50px;
      width: 50px;
      border-radius: 100px;
    }
    > div {
      padding: 0 15px;
      font-size: 1rem;
    }
  }
  .chat {
    display: flex;
    align-items: flex-end;
    > textarea {
      background: #0c0c0c;
      border: unset;
      color: #cbcbcb;
    }
    > button {
      height: 100%;
      /* padding-top: 10px; */
      background: unset;
      border: unset;
      font-size: 1rem;
    }
  }
`;

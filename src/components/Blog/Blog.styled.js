import styled from 'styled-components';

export const Container = styled.div`
  user-select: none;
  .categorylist {
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;

    .select {
      width: 120px;
      background: #e7e7e7;
      color: black;
      margin: 0 10px;
      border-radius: 5px;
    }
  }
  .pages {
    margin-bottom: 10px;
  }

  .addblog {
    padding: 10px;
    background: #000000;
    width: 35px;
    justify-content: center;
    height: 35px;
    display: flex;
    align-items: center;
    color: white;
    border-radius: 100%;
    box-shadow: 0 5px 10px 0px black;
  }
`;

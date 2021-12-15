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
      background: transparent !important;
      color: #3f51b5;
      border-bottom: 1px solid #3f51b5;
      border-radius: 0;
    }

    .ant-select-arrow {
      color: #3f51b5;
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

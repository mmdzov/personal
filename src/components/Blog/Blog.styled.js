import styled from 'styled-components';

export const Container = styled.div`
  user-select: none;
  .categorylist {
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 10px;

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
`;

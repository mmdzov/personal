import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  align-items: center;
  > div {
    margin: 0 1px;
    background: black;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 1px 8px;
  }
  > span {
    padding-top: 4px;
  }

  .arrow-left,
  .arrow-right {
    padding: 0 5px;
    padding-top: 4px;
    margin: 0 5px;
    cursor: pointer;
  }

  .dots {
    padding: 0 5px;
    font-weight: bold;
    align-items: center;
    display: flex;
    justify-content: center;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .enabled {
    background: #607d8b;
  }
`;

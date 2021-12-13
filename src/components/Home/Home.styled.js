import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;

  .blogitem {
    min-width: 220px !important;
    max-height: 340px !important;
    margin: 0 5px !important;
    margin-bottom: 15px !important;
    img {
      height: 150px !important;
    }
  }
  > h3 {
    color: white;
    font-size: 1.1rem;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: center;
    margin-bottom: 0px;
  }
  > span {
    text-align: left;
    display: flex;
    padding: 0 10px;
    margin-bottom: 20px;
  }

  .about:first-of-type {
    padding-top: 10px;
    &::after {
      top: 20px;
    }
  }
  .about:last-of-type {
    padding-bottom: 10px;

    &::before {
      height: 90%;
    }
  }
`;

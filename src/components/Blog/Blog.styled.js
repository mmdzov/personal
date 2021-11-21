import styled from 'styled-components';

export const Container = styled.div`
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

  .blogitem {
    background: black;
    padding: 5px 10px;
    text-align: left;
    margin: 0 15px;
    border-radius: 10px;
    box-shadow: 0 5px 10px 1px black;
    margin-bottom: 20px;

    .title {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: #2196f3;
      cursor: pointer;
    }
    > img {
      width: 100%;
      max-height: 190px;
      max-width: 350px;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
    }

    .description {
      height: 62px;
      overflow: hidden;
      padding: 0 10px;
      font-size: 0.8rem;
      color: #c7c7c7;
      cursor: pointer;
    }
    .row {
      display: flex;
      padding: 0 10px;
      > div {
        height: 40px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        font-size: 0.8rem;
        > svg {
          font-size: 1rem;
          margin-right: 3px;
        }
      }
    }
    .tags {
      display: flex;
      /* height: 35px; */
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 10px;
      margin-top: 10px;
      flex-wrap: wrap;
      .tag {
        color: #03a9f4;
        cursor: pointer;
        margin: 0 2px;
        padding: 0 5px;
      }
    }
  }
`;

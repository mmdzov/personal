import styled from 'styled-components';

export const Container = styled.div`
  /* max-width: 300px; */
  margin: 0 auto;
  /* background: black; */
  .tag {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    padding: 10px;
    font-size: 1rem;
    background: black;
    margin: 0 5px;
    margin-bottom: 10px;
    color: #2196f3;
    cursor: pointer;

    .title {
    }

    .posts {
      font-size: 0.9rem;
      color: white;
    }
  }

  .notfound {
    font-size: 1rem;
    padding: 76px 0px;
    color: #cdcdcd;
  }

  .header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    align-items: center;
    padding: 0 15px;
    font-size: 1.1rem;
  }
  .resultcount {
    font-size: 0.8rem;
    /* font-weight: bold; */
    color: #bdbdbd;
  }
  .tagname {
  }

  .urltag {
    display: flex;
    padding: 10px 15px;
    align-items: center;
    background: black;
    margin: 10px 10px;
    border-radius: 5px;

    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 5px;
    }

    .title {
      margin-left: 10px;
    }
  }

  form {
    padding: 0 5px;
    margin-bottom: 15px;
    input {
      background: unset;
      border: unset;
      box-shadow: unset !important;
      color: white;
    }
  }

  .ant-btn.ant-btn-icon-only.ant-input-search-button {
    color: #ffffff !important;
    border-radius: 10px !important;
    background: #607d8b !important;
  }

  .ant-input-group-addon {
    background: unset;
    overflow: hidden;
    > button {
      background: black;
      color: white;
      border: unset;
      overflow: hidden;
      border-radius: 12px;
    }
  }
`;

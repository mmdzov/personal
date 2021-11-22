import styled from 'styled-components';

export const Container = styled.div`
  form {
    padding: 20px 10px !important;
    max-width: 350px !important;
    margin: 0 auto !important;
    text-align: left !important;
  }

  input,
  textarea {
    margin-bottom: 20px !important;
  }
  .addtag {
    display: flex;
  }
  .tagGroup {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    > span {
      display: flex;
      align-items: center;
      width: min-content;
      font-size: 1rem;
      margin-bottom: 10px;
      > span {
        margin-left: 5px;
        line-height: 12px;
        padding-top: 1px;
      }
    }
  }
`;

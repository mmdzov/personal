import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 15px;
  form {
    padding: 20px 10px !important;
    /* max-width: 350px !important; */
    margin: 0 auto !important;
    text-align: left !important;
  }

  @media (max-width: 560px) {
    display: flex !important;
    align-items: center !important;
    justify-content: space-evenly !important;
    form {
      padding: 20px 10px !important ;
      /* max-width: 350px !important ; */
      margin: 0 auto !important ;
      text-align: left !important ;
      transform: scale(0.5) !important;
      width: 580px !important;
      position: absolute !important;
      top: -40px !important;
    }
  }

  .post-avatar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
    color: white;
    font-size: 1rem;
  }

  .group {
    input {
      margin-bottom: 20px !important;
    }
  }
  > input,
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
  .editor-class.rdw-editor-main {
    background-color: white;
  }
  .group-row {
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    margin-bottom: 15px;
  }
`;

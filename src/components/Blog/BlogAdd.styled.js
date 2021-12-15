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
      /* top: -40px !important; */
      top: 0px !important;
    }
    .rdw-image-modal,
    .rdw-embedded-modal,
    .rdw-link-modal {
      left: -154px !important;
    }
  }

  @media (min-width: 561px) {
    .rdw-image-modal,
    .rdw-embedded-modal,
    .rdw-link-modal {
      left: -180px !important;
    }
  }

  .post-avatar {
    display: flex;
    margin-bottom: 15px;
    color: white;
    font-size: 1rem;
    flex-direction: column;
    align-items: baseline;
    > img {
      margin: 10px 0px;
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
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
  .rdw-emoji-modal {
    left: -200px !important;
  }

  .uploads {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background: #0000001f;
    padding: 7px;
    margin-bottom: 10px;
    grid-gap: 5px;
    img {
      width: 100px;
      height: 100px;
      object-fit: contain;
      cursor: pointer;
    }
  }

  .preview {
    .title {
      font-size: 1.2rem;
      color: white;
      font-weight: bold;
      margin: 10px 0px;
    }
    img {
      margin: 0 10px;
      margin-bottom: 20px;
    }
  }
`;

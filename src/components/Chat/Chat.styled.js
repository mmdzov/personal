import styled from 'styled-components';

export const Container = styled.div`
  user-select: none;
  // max-width: 350px;
  height: 100%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 10px;
  // box-shadow: 0px 4px 15px 3px black;
  // background: black;
  display: grid;
  grid-template-rows: auto 1fr auto;
  @media (max-width: 380px) {
    border-radius: 0px;
    // max-width: 100% !important;
    margin: 0px !important;
  }

  .ant-image,
  .ant-image-error {
    padding: 0px !important;
  }

  .startChat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: -25px;

    > svg {
      font-size: 10rem;
      color: #1c1c1c;
    }

    > span {
      margin: 12px 0px;
      font-size: 1rem;
      color: #a1a1a1;
      font-weight: bold;
    }
  }

  .header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    justify-content: space-between;
    img {
      height: 50px;
      width: 50px;
      border-radius: 100px;
    }
    div > div {
      padding: 0 15px;
      font-size: 1rem;
    }
    > div {
      display: flex;
      align-items: center;
    }
    .chatlistIcon {
      font-size: 1.7rem;
      padding: 5px;
      cursor: pointer;
    }
  }
  .chat {
    display: flex;
    padding-top: 5px;
    align-items: flex-end;
    > textarea {
      background: #0c0c0c;
      border: unset;
      color: #cbcbcb;
    }
    > button {
      height: 100%;
      /* padding-top: 10px; */
      background: unset;
      border: unset;
      font-size: 1rem;
    }
  }
  .content {
    padding-right: 5px;
    overflow-y: auto;
    scroll-behavior: smooth;
    .chatitem {
      margin-bottom: 5px;
      .chatitem-message {
        width: fit-content;
        display: flex;
        padding: 0px 8px;
        border-radius: 0 10px 10px 10px;
        padding-left: 9px;
        padding-top: 3px;
        flex-direction: column !important;
      }
      &.you {
        margin-bottom: 5px;
        display: flex;
        flex-direction: row-reverse;
        .chatitem-message {
          flex-direction: row-reverse;
          justify-content: space-between;
          padding-left: unset;
          padding-left: 9px;
          border-radius: 10px 0px 10px 10px;
          background: #1c1c1c;
          overflow: hidden;
          .chatitem-btm-msg {
            direction: rtl;
            padding-left: 0;
            padding-right: 3px;
          }
          .chatitem-seen {
            color: #b5b5b5;
          }
        }
        .message {
          text-align: right;
        }
      }
      &.it {
        .chatitem-message {
          border: 1px solid #181818;
          background: black;
        }
        .chatitem-btm-msg {
          /* direction: rtl; */
          padding-right: 0px;
          padding-left: 3px;
          direction: rtl;

          .chatitem-seen {
            padding-right: 0;
          }
        }
      }
      .chatitem-header {
        > img {
          width: 40px;
          height: 40px;
          border-radius: 100px;
        }
        .username {
          font-size: 0.8rem;
        }
      }

      .chatitem-btm-msg {
        display: flex;
        font-size: 0.6rem;
        padding: 0 10px;
        /* padding-right: 10px; */
        flex-direction: row-reverse;
        align-items: flex-end;
      }
      .chatitem-date {
        margin-bottom: 4px;
      }
      .chatitem-seen {
        font-size: 0.8rem;
        color: #b5b5b5;
        padding: 0px 5px;
        line-height: 17px;
        /* padding-top: 5px; */
      }
    }
    .message {
      text-align: left;
    }
  }
  .chatdate {
    margin: 10px 0px;
    padding: 5px 0px;
    position: relative;
    > span {
      font-size: 0.7rem;
      background: #3c3c3c2e;
      padding: 3px 17px;
      border-radius: 100px;
      z-index: 9999;
      color: #bbb;
      position: relative;
      border: 1px solid #121212;
      font-weight: bold;
    }

    .line {
      width: 100%;
      // height: 1px;
      top: 16px;
      position: absolute;
      background: #121212;
    }
  }
`;

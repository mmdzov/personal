import styled from 'styled-components';

export const Container = styled.div`
  width: 95%;
  margin: 0 auto;

  .ant-image-img {
    border-radius: 100px;
    margin-right: 10px;
  }

  .tools {
    height: 30px;
    position: relative;
    .editpen {
      left: unset;
      right: 0;
      bottom: 0;
    }
  }

  .header {
    margin: 20px auto;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    > img {
      width: 100%;
      max-height: 385px;
      object-fit: cover;
      /* opacity: 0; */
    }

    > div {
      position: absolute;
      bottom: 0;
      text-align: left;
      padding: 5px 15px;
      background: #0000004a;
      box-shadow: -27px -45px 81px 10px inset black;
      width: 100%;
      
      > .title {
        font-size: 1.5rem;
      }
      > .description {
        font-size: 0.8rem;
      }
    }
  }
  @media (max-width: 770px) {
    .header {
      > div {
        position: unset;
      }
    }
  }

  .tags {
    display: flex;
    /* padding: 0 25px; */
    /* height: 30px; */
    align-items: center;
    flex-wrap: wrap;
    .tag {
      padding: 0 5px;
      margin: 0 5px;
      height: 100%;
      display: flex;
      align-items: center;
      color: #2196f3;
      cursor: pointer;
    }
  }

  .content {
    text-align: left;
    padding: 5px 10px;
    img {
      width: 100% !important;
      border-radius: 5px;

      @media (min-width: 460px) {
        max-width: 460px;
      }

      @media (max-width: 459px) {
        object-fit: cover;
        height: auto !important;
      }
    }
  }

  .likes {
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 0.9rem;
    padding-left: 0px;

    > span {
      display: flex;
      align-items: center;
    }

    svg {
      font-size: 1.5rem;
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .date {
    padding-top: 3px;
  }

  .reply-to-comment {
    font-size: 0.8rem;
    margin-bottom: 15px;
    padding: 0 10px;
    color: #cfcfcf;
    span {
      color: white;
      margin-right: 10px;
    }
  }

  .comment-send {
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    padding: 13px 15px;
    margin: 20px 5px;
    border-radius: 5px;
    margin-right: 9px;
    position: relative;
    /* background: black; */
    /* box-shadow: 0 5px 10px 2px black; */

    .comment-send-title {
      font-size: 0.8rem;
      margin-bottom: 15px;
      /* font-weight: bold; */
      > span {
        position: absolute;
        right: 22px;
        bottom: 13px;
        cursor: pointer;
        font-size: 1.1rem;
      }
    }

    > button {
      background: #3f51b5;
      border: unset;
    }
    > textarea {
      margin-bottom: 15px;
    }
  }

  .like-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }

  .comments {
    margin: 25px 0px;
    margin-right: 5px;
    .comment {
      background: black;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      margin-bottom: 5px;
      > .comment-footer {
        flex-direction: row-reverse;
        > .comment-date {
          height: 30px;
        }
      }

      > .comment-header {
        align-items: center;
        justify-content: space-between;
        > div {
          display: flex;
          align-items: center;
        }
      }
    }

    .comment-date {
      text-align: right;
      font-size: 0.8rem;
      /* height: 30px; */
      align-items: center;
      display: flex;
      justify-content: end;
    }

    .replyicon {
      font-size: 1rem;
      color: #bfbfbf;
      cursor: pointer;
    }

    .username {
      text-align: left;
      > span {
        color: black;
        margin-left: 5px;
      }
    }

    .comment-reply {
      margin: 0 5px;
      background: #607d8b;
      padding: 5px 10px;
      border-radius: 5px;
      margin-bottom: 5px;
    }

    .comment-header {
      display: flex;
      align-items: center;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        margin-right: 10px;
      }
    }

    .comment-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* flex-direction: row-reverse; */
    }
    .comment-content {
      text-align: left;
      padding: 0 20px;
      min-height: 30px;
      padding-top: 5px;
    }
  }
`;

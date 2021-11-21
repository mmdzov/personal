import { Container } from './BlogPost.styled';
import { useContext, useRef, useState } from 'react';
import Context from '../../context/Context';
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import { Button, Input } from 'antd';
import { FaReply } from 'react-icons/fa';

const { TextArea } = Input;

const BlogPost = () => {
  const { user } = useContext(Context);

  const [blogpost, setBlogpost] = useState({
    id: '40923420tfsdjj0023',
    title: 'Hello world from blog',
    description:
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, libero voluptatibus! Odio, illum? Ad placeat vel doloribus neque. Consequuntur delectus aliquam dolorum doloribus sint alias impedit placeat reprehenderit voluptate blanditiis.',
    date: Date.now(),
    image:
      'https://netseo.co.uk/wp-content/uploads/2021/06/What_is_Information_Technology-11-1536x838.jpg',
    likes: 1223,
    liked: false,
    comments: [
      {
        from: {
          ...user,
        },
        comment: 'Hello world',
        date: Date.now(),
        replies: [
          {
            from: {
              ...user,
            },
            to: {
              ...user,
            },
            comment: 'Hello world',
            date: Date.now(),
            replies: [],
          },
        ],
      },
      {
        from: {
          ...user,
        },
        comment: 'Hello world',
        date: Date.now(),
        replies: [
          {
            from: {
              ...user,
            },
            to: {
              ...user,
            },
            date: Date.now(),
            comment: 'Hello world',
            replies: [],
          },
        ],
      },
    ],
    tags: [
      {
        id: 342342,
        tag: 'psfkdofs',
      },
      {
        id: 342342,
        tag: 'psfkdofs',
      },
      {
        id: 342342,
        tag: 'psfkdofs',
      },
    ],
    content: `
    <p>Hey this editor rocks 😀</p>
    <p />
    <p />
    <img
      src="https://netseo.co.uk/wp-content/uploads/2021/06/What_is_Information_Technology-11-1536x838.jpg"
      alt="undefined"
      style={{ float: 'none' }}
    />
    <p />
    `,
  });

  const handleLikePost = () => {
    setBlogpost((prev) => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const [value, setValue] = useState('');
  const [reply, setReply] = useState({});

  const commentSendForm = useRef();
  const containerRef = useRef();
  const commentSendFormInput = useRef();

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleSendMessage = () => {
    setValue('');
  };

  const handleReplyComment = (rep) => {
    const app = document.getElementsByClassName('App')[0];
    app.scrollTo({
      top: commentSendForm.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
    setReply(rep);
  };

  const clearReply = () => {
    setReply({});
  };

  return (
    <Container ref={containerRef}>
      <div className="header">
        <img src={blogpost.image} alt="" />
        <div className="">
          <div className="title">{blogpost.title}</div>
          <div className="description">{blogpost.description}</div>
        </div>
      </div>
      <div className="tags">
        {blogpost.tags.map((item) => (
          <div className="tag">#{item.tag}</div>
        ))}
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: blogpost.content }} />
      <div className="like-date">
        <div className="likes">
          <span onClick={handleLikePost}>
            {blogpost?.liked ? <AiFillHeart color="#bb281d" /> : <AiOutlineHeart />}
          </span>
          {blogpost?.likes}
        </div>
        <div className="date">{new Date(blogpost.date).toLocaleDateString('fa-IR')}</div>
      </div>

      <form className="comment-send" ref={commentSendForm}>
        <div className="comment-send-title">
          {Object.keys(reply)?.length > 0 ? `Reply to ${reply?.from?.username}` : 'Add a Comment'}
          {Object.keys(reply)?.length > 0 ? (
            <span onClick={clearReply}>
              <AiOutlineClose />
            </span>
          ) : null}
        </div>
        {Object.keys(reply)?.length > 0 ? (
          <div className="reply-to-comment">
            <span>Comment</span>
            {reply.comment}
          </div>
        ) : null}

        <TextArea
          value={value}
          onChange={handleChange}
          placeholder="comment..."
          id="textarea"
          className="scroll"
          ref={commentSendFormInput}
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
        <Button type="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </form>

      <div className="comments">
        {blogpost.comments.map((item) => (
          <div className="comment">
            <div className="comment-header">
              <div className="">
                <img
                  className="avatar"
                  src={item.from.avatar}
                  style={{ width: 40, height: 40 }}
                  alt=""
                />
                <div className="username">{item.from.username}</div>
              </div>
              <span className="replyicon" onClick={() => handleReplyComment(item)}>
                <FaReply />
              </span>
            </div>
            <div className="comment-content">{item.comment}</div>
            <div className="comment-footer">
              <div className="comment-date">{new Date(item.date).toLocaleDateString('fa-IR')}</div>
            </div>
            {item.replies.map((reply) => (
              <div className="comment-reply">
                <div className="comment-header">
                  <img
                    className="avatar"
                    src={reply.from.avatar}
                    style={{ width: 40, height: 40 }}
                    alt=""
                  />
                  <div className="username">
                    {reply.from.username}{' '}
                    <span>to {reply.to.username} 3534e rweprokw epro ekrwerw </span>
                  </div>
                </div>
                <div className="comment-content">{reply.comment}</div>
                <div className="comment-footer">
                  <span className="replyicon" onClick={() => handleReplyComment(reply)}>
                    <FaReply />
                  </span>
                  <div className="comment-date">
                    {new Date(reply.date).toLocaleDateString('fa-IR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BlogPost;

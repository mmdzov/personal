import { Container } from './BlogPost.styled';
import { useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import { Button, Input } from 'antd';
import { FaReply } from 'react-icons/fa';
import PostImage from '../../assets/img/post.jpg';
import { useNavigate } from 'react-router-dom';
import EditPen from '../utils/EditPen';
import { unsetBlog } from '../../store/actions/blogAction';
import { useDispatch, useSelector } from 'react-redux';

const { TextArea } = Input;

const BlogPost = () => {
  const { data } = useSelector(({ main }) => main);
  const { blog } = useSelector(({ blogs }) => blogs);
  const dispatch = useDispatch();
  const [blogpost, setBlogpost] = useState({
    id: '40923420tfsdjj0023',
    title: 'Hello world from blog',
    description:
      // eslint-disable-next-line max-len
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, libero voluptatibus! Odio, illum? Ad placeat vel doloribus neque. Consequuntur delectus aliquam dolorum doloribus sint alias impedit placeat reprehenderit voluptate blanditiis.',
    date: Date.now(),
    image: PostImage,
    likes: 1223,
    category: {
      id: 53453645,
      name: 'Javascript',
    },
    liked: false,
    comments: [
      {
        id: '525365fdsfwef',
        from: {
          ...data,
        },
        comment: 'Hello world',
        date: Date.now(),
        replies: [
          {
            id: 'dfsvx525365fdsfwef',
            from: {
              ...data,
            },
            to: {
              ...data,
            },
            comment: 'Hello world',
            date: Date.now(),
            replies: [],
          },
        ],
      },
      {
        id: '5asdasc25365fdsfwef',
        from: {
          ...data,
        },
        comment: 'Hello world',
        date: Date.now(),
        replies: [
          {
            id: 'dfsvxc525365fdsfwef',
            from: {
              ...data,
            },
            to: {
              ...data,
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
        name: 'psfkdofs',
      },
      {
        id: 342342,
        name: 'psfkdofs',
      },
      {
        id: 342342,
        name: 'psfkdofs',
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

  useEffect(() => {
    const app = document.getElementsByClassName('App')[0];
    app.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, []);

  const [value, setValue] = useState('');
  const [reply, setReply] = useState({});

  const commentSendForm = useRef();
  const containerRef = useRef();
  const commentSendFormInput = useRef();

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleSendComment = () => {
    const comment = {
      from: {
        ...data,
      },
      comment: value,
      date: Date.now(),
      replies: [],
    };
    if (Object.keys(reply)?.length > 0) {
      comment.to = reply.from;
      const commentIndex = blog.comments.findIndex((item) => item.id === reply.commentId);
      blog.comments[commentIndex].replies.push(comment);
      setBlogpost((prev) => ({ ...prev, comments: blog.comments }));
      setValue('');
      setReply({});
      return;
    }

    blog.comments.unshift(comment);
    setBlogpost((prev) => ({ ...prev, comments: blog.comments }));
    setValue('');
  };

  useEffect(() => {
    return () => {
      dispatch(unsetBlog());
    };
  }, []);

  const handleReplyComment = (rep, commentId) => {
    const app = document.getElementsByClassName('App')[0];
    app.scrollTo({
      top: commentSendForm.current.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
    setReply({ ...rep, commentId });
  };

  const clearReply = () => {
    setReply({});
  };
  const navigate = useNavigate();
  const handleGoTag = (tag) => {
    navigate(`/tags/${tag}`);
  };

  const handleEditPost = () => {
    navigate('/editpost', {
      state: {
        data: blog,
      },
    });
  };

  return (
    <Container ref={containerRef}>
      {data?.isAdmin ? (
        <div className="tools">
          <EditPen onClick={handleEditPost} />
        </div>
      ) : null}
      <div className="header">
        <img src={blog?.image} alt="" />
        <div className="">
          <div className="title">{blog?.title}</div>
          <div className="description">{blog?.description}</div>
        </div>
      </div>
      <div className="tags">
        {blog?.tags?.map((item) => (
          <div className="tag" onClick={() => handleGoTag(item?.name)}>
            #{item?.name}
          </div>
        ))}
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: blog?.content }} />
      <div className="like-date">
        <div className="likes">
          <span onClick={handleLikePost}>
            {blog?.liked ? <AiFillHeart color="#bb281d" /> : <AiOutlineHeart />}
          </span>
          {blog?.likes}
        </div>
        <div className="date">{new Date(blog?.date).toLocaleDateString('fa-IR')}</div>
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
        <Button type="primary" onClick={handleSendComment}>
          Send
        </Button>
      </form>

      <div className="comments">
        {blog?.comments?.length > 0
          ? blog?.comments?.map((item) => (
              <div className="comment">
                <div className="comment-header">
                  <div className="">
                    <img
                      className="avatar"
                      src={item?.from?.avatar}
                      style={{ width: 40, height: 40 }}
                      alt=""
                    />
                    <div className="username">{item.from.username}</div>
                  </div>
                  <span className="replyicon" onClick={() => handleReplyComment(item, item.id)}>
                    <FaReply />
                  </span>
                </div>
                <div className="comment-content">{item.comment}</div>
                <div className="comment-footer">
                  <div className="comment-date">
                    {new Date(item.date).toLocaleDateString('fa-IR')}
                  </div>
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
                        {reply.from.username} <span>to {reply.to.username} </span>
                      </div>
                    </div>
                    <div className="comment-content">{reply.comment}</div>
                    <div className="comment-footer">
                      <span
                        className="replyicon"
                        onClick={() => handleReplyComment(reply, item.id)}
                      >
                        <FaReply />
                      </span>
                      <div className="comment-date">
                        {new Date(reply.date).toLocaleDateString('fa-IR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          : null}
      </div>
    </Container>
  );
};

export default BlogPost;

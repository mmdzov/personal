import { Container } from './BlogPost.styled';
import { useEffect, useRef, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import { Button, Image, Input } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import EditPen from '../utils/EditPen';
import {
  getSingleBlog,
  setBlogLike,
  setComment,
  setCommentReply,
  unsetBlog,
} from '../../store/actions/blogAction';
import { useDispatch, useSelector } from 'react-redux';
import errorImg from '../utils/errorImg';
import useTokenDecode from '../../hooks/useTokenDecode';
import setAlign from '../../utils/setAlign';
import { Helmet } from 'react-helmet';

const { TextArea } = Input;

const BlogPost = () => {
  const { blog } = useSelector(({ blogs }) => blogs);
  const [reply, setReply] = useState({});
  const { post } = useParams();
  const dispatch = useDispatch();

  const handleLikePost = () => {
    dispatch(setBlogLike(post, blog.liked ? 0 : 1));
  };

  useEffect(() => {
    if (post) {
      dispatch(getSingleBlog(post));
    }
  }, [post]);

  useEffect(() => {
    const app = document.getElementsByClassName('App')[0];
    app.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, []);

  const [value, setValue] = useState('');

  const commentSendForm = useRef();
  const containerRef = useRef();
  const commentSendFormInput = useRef();

  const handleChange = ({ target }) => {
    setValue(target.value);
  };

  const handleSendComment = () => {
    if (Object.keys(reply)?.length > 0) {
      dispatch(
        setCommentReply(post, {
          comment: value,
          comment_parent_id: reply.commentId,
          reply_to: reply.id,
        }),
      );
      setValue('');
      setReply({});
      return;
    }
    dispatch(
      setComment(post, {
        comment: value,
      }),
    );
    setValue('');
    setReply({});
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
  const decoded = useTokenDecode();

  return (
    <Container ref={containerRef}>
      <Helmet>
        <title>{`${blog?.title}`} | Personal</title>
        <meta name="description" content={blog?.description} />
      </Helmet>

      {decoded?.isAdmin ? (
        <div className="tools">
          <EditPen onClick={handleEditPost} />
        </div>
      ) : null}
      <div className="header">
        <img src={blog?.image} alt="" />
        <div className="">
          <div className="title" style={{ textAlign: setAlign(blog?.title) }}>
            {blog?.title}
          </div>
          <div className="description" style={{ textAlign: setAlign(blog?.title) }}>
            {blog?.description}
          </div>
        </div>
      </div>
      <div className="tags">
        {blog?.tags?.map((item) => (
          <div
            className="tag"
            key={item?._id}
            onClick={() => handleGoTag(item?.name)}
            style={{ textAlign: setAlign(blog?.description) }}
          >
            #{item?.name}
          </div>
        ))}
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
        style={{ textAlign: setAlign(blog?.content) }}
      />
      <div className="like-date">
        <div className="likes">
          <span onClick={handleLikePost}>
            {blog?.liked ? <AiFillHeart color="#bb281d" /> : <AiOutlineHeart />}
          </span>
          {blog?.likes > 0 ? blog?.likes : null}
        </div>
        <div className="date">
          {new Date(blog?.date).toLocaleDateString('fa-IR')} -{' '}
          {new Date(blog?.date).toLocaleTimeString('fa-IR')}
        </div>
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
          style={{ textAlign: setAlign(value) }}
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
        <Button type="primary" onClick={handleSendComment}>
          Send
        </Button>
      </form>

      <div className="comments">
        {blog?.comments !== null || blog.comments.every((item) => item !== null)
          ? blog?.comments?.length > 0
            ? blog?.comments?.map((item) => (
                <div className="comment" key={item?._id || Math.floor(Math.random() * 999999)}>
                  <div className="comment-header">
                    <div className="">
                      <Image
                        src={item?.from?.avatar}
                        style={{ width: 40, height: 40 }}
                        alt=""
                        fallback={errorImg}
                      />
                      <div className="username">{item?.from?.username}</div>
                    </div>
                    <span className="replyicon" onClick={() => handleReplyComment(item, item?.id)}>
                      {/* <FaReply /> */}
                      Reply
                    </span>
                  </div>
                  <div className="comment-content" style={{ textAlign: setAlign(item?.comment) }}>
                    {item?.comment}
                  </div>
                  <div className="comment-footer">
                    <div className="comment-date">
                      {new Date(item?.date).toLocaleDateString('fa-IR')} -{' '}
                      {new Date(item?.date).toLocaleTimeString('fa-IR')}
                    </div>
                  </div>
                  {item?.replies?.length > 0
                    ? item?.replies?.map((reply) => (
                        <div
                          className="comment-reply"
                          key={item?._id || Math.floor(Math.random() * 999999)}
                        >
                          <div className="comment-header">
                            <Image
                              src={reply.from.avatar}
                              style={{ width: 40, height: 40 }}
                              alt=""
                              fallback={errorImg}
                            />
                            <div className="username">
                              {reply?.from?.username} <span>to {reply?.reply_to?.username} </span>
                            </div>
                          </div>
                          <div
                            className="comment-content"
                            style={{ textAlign: setAlign(reply?.comment) }}
                          >
                            {reply?.comment}
                          </div>
                          <div className="comment-footer" style={{ marginLeft: 18 }}>
                            <span
                              className="replyicon"
                              onClick={() => handleReplyComment(reply, item?.id)}
                            >
                              {/* <FaReply /> */}
                              Reply
                            </span>
                            <div className="comment-date">
                              {new Date(reply.date).toLocaleDateString('fa-IR')} -{' '}
                              {new Date(reply.date).toLocaleTimeString('fa-IR')}
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              ))
            : null
          : null}
      </div>
    </Container>
  );
};

export default BlogPost;

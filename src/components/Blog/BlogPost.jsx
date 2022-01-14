import { Container } from './BlogPost.styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditPen from '../utils/EditPen';
import { blogDelete, getSingleBlog, unsetBlog } from '../../store/actions/blogAction';
import { useDispatch, useSelector } from 'react-redux';
import useTokenDecode from '../../hooks/useTokenDecode';
import { Helmet } from 'react-helmet';
import DeleteIcon from '../utils/DeleteIcon';
import BlogPostComments from './BlogPostComments';
import SendComment from './SendComment';
import BlogItemLikeDate from './BlogItemLikeDate';
import BlogItemTags from './BlogItemTags';
import BlogItemHeader from './BlogItemHeader';
import BlogItemContent from './BlogItemContent';
import useLanguage from '../../hooks/useLanguage';

const BlogPost = () => {
  const { blog } = useSelector(({ blogs }) => blogs);
  const [reply, setReply] = useState({});
  const { post } = useParams();
  const dispatch = useDispatch();

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

  const commentSendForm = useRef();
  const containerRef = useRef();
  const commentSendFormInput = useRef();

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
    commentSendFormInput.current?.focus();
    setReply({ ...rep, commentId });
  };

  const clearReply = () => {
    setReply({});
  };
  const navigate = useNavigate();

  const handleEditPost = () => {
    navigate('/editpost', {
      state: {
        data: blog,
      },
    });
  };

  const handleDeleteBlog = () => {
    dispatch(blogDelete(blog?.blog_id, navigate));
  };

  const decoded = useTokenDecode();
  const lang = useLanguage();

  return (
    <Container ref={containerRef}>
      <Helmet>
        <title>{`${blog?.title} | Personal`}</title>
        <meta name="description" content={blog?.description} />
      </Helmet>

      {decoded?.isAdmin ? (
        <div className="tools">
          <EditPen onClick={handleEditPost} />
          <DeleteIcon title={lang.blogpost.deleteblog} onClick={handleDeleteBlog} />
        </div>
      ) : null}
      <BlogItemHeader />
      <BlogItemTags />
      <BlogItemContent />
      <BlogItemLikeDate />
      <SendComment
        reply={reply}
        textAreaRef={commentSendFormInput}
        setReply={setReply}
        onClearReply={clearReply}
        ref={commentSendForm}
      />
      <BlogPostComments onReply={handleReplyComment} />
    </Container>
  );
};

export default BlogPost;

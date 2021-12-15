import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { setBlogLike } from '../../store/actions/blogAction';

const BlogItemLikeDate = () => {
  const { blog } = useSelector(({ blogs }) => blogs);
  const { post } = useParams();
  const dispatch = useDispatch();

  const handleLikePost = () => {
    dispatch(setBlogLike(post, blog.liked ? 0 : 1));
  };

  return (
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
  );
};

export default BlogItemLikeDate;

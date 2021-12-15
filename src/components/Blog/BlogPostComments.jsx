import { useSelector } from 'react-redux';
import BlogPostComment from './BlogPostComment';

const BlogPostComments = ({ onReply = () => {} }) => {
  const { blog } = useSelector(({ blogs }) => blogs);

  return (
    <div className="comments">
      {blog?.comments !== null || blog.comments.every((item) => item !== null)
        ? blog?.comments?.length > 0
          ? blog?.comments?.map((item) => (
              <BlogPostComment
                key={item?._id || Math.floor(Math.random() * 999999)}
                comment={item}
                onReply={onReply}
              />
            ))
          : null
        : null}
    </div>
  );
};

export default BlogPostComments;

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import setAlign from '../../utils/setAlign';

const BlogItemTags = () => {
  const { blog } = useSelector(({ blogs }) => blogs);
  const navigate = useNavigate();

  const handleGoTag = (tag) => {
    navigate(`/tags/${tag}`);
  };

  return (
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
  );
};

export default BlogItemTags;

import { useSelector } from 'react-redux';
import setAlign from '../../utils/setAlign';

const BlogItemHeader = () => {
  const { blog } = useSelector(({ blogs }) => blogs);

  return (
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
  );
};

export default BlogItemHeader;

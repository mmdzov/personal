import { useSelector } from 'react-redux';

const BlogItemContent = () => {
  const { blog } = useSelector(({ blogs }) => blogs);

  return (
    <div
      className="content"
      dangerouslySetInnerHTML={{ __html: blog?.content }}
      // style={{ textAlign: setAlign(blog?.content) }}
    />
  );
};

export default BlogItemContent;

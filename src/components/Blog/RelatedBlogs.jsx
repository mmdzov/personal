import { useSelector } from 'react-redux';
import BlogItem from './BlogItem';
import { Container } from './RelatedBlogs.styled';

const RelatedBlogs = () => {
  const { data } = useSelector(({ main }) => main);

  if (!data?.related_blogs || data?.related_blogs?.length === 0) return null;
  return (
    <div className="sec" style={{ padding: 0 }}>
      <div className="sec-title">Related Posts</div>
      <Container horizontal className="scroll-container">
        {data?.related_blogs?.map((item) => (
          <BlogItem blog={item} key={item?._id} />
        ))}
      </Container>
    </div>
  );
};

export default RelatedBlogs;

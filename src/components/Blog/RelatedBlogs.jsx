import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BlogItem from './BlogItem';
import { Container } from './RelatedBlogs.styled';

const RelatedBlogs = () => {
  const { data } = useSelector(({ main }) => main);
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="sec" style={{ padding: 0 }}>
      <div className="sec-title">Related Posts</div>
      <Container horizontal className="scroll-container">
        {data?.related_blogs?.map((item) => (
          <BlogItem blog={item} />
        ))}
      </Container>
    </div>
  );
};

export default RelatedBlogs;

import LinesEllipsis from 'react-lines-ellipsis';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiFillMessage } from 'react-icons/ai';
import { Container } from './BlogItem.styled';
import errorImg from '../utils/errorImg';
import { Image } from 'antd';

const BlogItem = ({ blog }) => {
  const navigate = useNavigate();

  const openBlogPost = (post) => {
    navigate(`/blog/${post?.toString()}`);
  };

  const handleGoTag = (tag) => {
    navigate(`/tags/${tag}`);
  };

  return (
    <Container className="blogitem" key={blog?._id}>
      <div className="title" onClick={() => openBlogPost(blog?._id)}>
        {blog?.title}
      </div>
      {blog?.image ? <Image fallback={errorImg} preview={false} src={blog?.image} /> : null}
      <LinesEllipsis
        className="description"
        text={blog?.description}
        maxLine="3"
        ellipsis="..."
        trimRight
        onClick={() => openBlogPost(blog?._id)}
        basedOn="letters"
      />
      <div className="row">
        {blog?.likes ? (
          <div className="like">
            <AiFillHeart style={{ color: '#d94949' }} /> {blog?.likes?.length}
          </div>
        ) : null}
        {blog?.comments ? (
          <div className="comments">
            <AiFillMessage style={{ color: '#c7c7c7' }} /> {blog?.comments?.length}
          </div>
        ) : null}
      </div>
      {blog?.tags ? (
        <div className="tags scroll">
          {blog?.tags?.map((tag) => (
            <div className="tag" key={tag.id} onClick={() => handleGoTag(tag?.name)}>
              #{tag.name}
            </div>
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default BlogItem;

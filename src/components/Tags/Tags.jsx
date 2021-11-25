import { useState } from 'react';
import { Container } from './Tags.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from 'antd';
import PostImage from '../../assets/img/post.jpg';

const { Search } = Input;

const Tags = () => {
  const [tags] = useState([
    {
      id: '423rwerw',
      tag: 'test',
      posts: 12,
    },
    {
      id: '423rwerw',
      tag: 'test',
      posts: 1,
    },
    {
      id: '423rwerw',
      tag: 'test1',
      posts: 32,
    },
    {
      id: '423rwerw',
      tag: 'test2',
      posts: 54,
    },
  ]);

  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  const { tag: urlTag } = useParams();
  const handleGoTag = (tag) => {
    navigate(tag);
  };

  const [tagblogs] = useState([
    {
      id: '40923420tfsdjj0023',
      title: 'Hello world from blog',
      description:
        // eslint-disable-next-line max-len
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, libero voluptatibus! Odio, illum? Ad placeat vel doloribus neque. Consequuntur delectus aliquam dolorum doloribus sint alias impedit placeat reprehenderit voluptate blanditiis.',
      date: Date.now(),
      image: PostImage,
      likes: 1223,
      comments: 342342,
      tags: [
        {
          id: 342342,
          name: 'psfkdofs',
        },
        {
          id: 342342,
          name: 'psfkdofs',
        },
        {
          id: 342342,
          name: 'psfkdofs',
        },
      ],
    },
  ]);

  const handleSearchTag = () => {
    setSearchLoading(true);
  };

  return (
    <Container>
      {urlTag ? null : (
        <form onSubmit={(e) => e.preventDefault()}>
          <Search placeholder="search a tag" loading={searchLoading} onSearch={handleSearchTag} />
        </form>
      )}
      {urlTag ? (
        <div className="header">
          <div className="tagname">#{urlTag}</div>
          <div className="resultcount">Results {tagblogs?.length}</div>
        </div>
      ) : null}
      {!urlTag
        ? tags.map((item) => (
            <div className="tag" onClick={() => handleGoTag(item.name)}>
              <div className="title">#{item.name}</div>
              <div className="posts">{item.posts}</div>
            </div>
          ))
        : tagblogs.map((item) => (
            <div className="urltag">
              <img src={item.image} className="avatar" alt="" />
              <div className="title">{item.title}</div>
            </div>
          ))}
    </Container>
  );
};

export default Tags;

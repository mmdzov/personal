/* eslint-disable react/self-closing-comp */
import { Container } from './Blog.styled';
import { useState } from 'react';
import { Select } from 'antd';
import LineEllipsis from 'react-lines-ellipsis';
import { AiFillHeart, AiFillMessage } from 'react-icons/ai';
import Navigation from '../Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import PostImage from '../../assets/img/post.jpg';
import Pagination from '../Pagination/Pagination';

const { Option } = Select;

const Blog = () => {
  const [blog] = useState({
    pages: 8,
    page: 1,
    cat: {
      id: 634436686,
      name: 'other',
    },
    tags: [
      {
        id: 342342,
        tag: 'psfkdofs',
      },
      {
        id: 342342,
        tag: 'psfkdofs',
      },
      {
        id: 342342,
        tag: 'psfkdofs',
      },
    ],
    category: [
      {
        id: 3423426332,
        name: 'Javascript',
      },
      {
        id: 3423476756,
        name: 'react.js',
      },
      {
        id: 645534543,
        name: 'express.js',
      },
      {
        id: 64345342,
        name: 'tdd',
      },
      {
        id: 634436686,
        name: 'other',
      },
    ],
    data: [
      {
        id: '40923420tfsdjj0023',
        title: 'Hello world from blog',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, libero voluptatibus! Odio, illum? Ad placeat vel doloribus neque. Consequuntur delectus aliquam dolorum doloribus sint alias impedit placeat reprehenderit voluptate blanditiis.',
        date: Date.now(),
        image: PostImage,
        likes: 1223,
        comments: 342342,
        tags: [
          {
            id: 342342,
            tag: 'psfkdofs',
          },
          {
            id: 342342,
            tag: 'psfkdofs',
          },
          {
            id: 342342,
            tag: 'psfkdofs',
          },
        ],
      },
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
            tag: 'psfkdofs',
          },
          {
            id: 342342,
            tag: 'psfkdofs',
          },
          {
            id: 342342,
            tag: 'psfkdofs',
          },
        ],
      },
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
            tag: 'psfkdofs',
          },
          {
            id: 342342,
            tag: 'psfkdofs',
          },
          {
            id: 342342,
            tag: 'psfkdofs',
          },
        ],
      },
    ],
  });

  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const openBlogPost = (post) => {
    navigate(post?.toString());
  };

  return (
    <Container>
      <Navigation />

      <div className="categorylist">
        <Select
          defaultValue={blog.cat.name}
          className="select"
          style={{ width: 120, background: 'white' }}
          bordered={false}
        >
          {blog.category.map((item) => (
            <Option value={item.name} className="option">
              {item.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="bloglist">
        {blog.data.map((item) => (
          <div className="blogitem">
            <div className="title" onClick={() => openBlogPost(item.id)}>
              {item.title}
            </div>
            {item?.image ? (
              <img
                src={item.image}
                // onClick={() => openBlogPost(item.id)}
                alt=""
              />
            ) : null}
            <LineEllipsis
              className="description"
              text={item.description}
              maxLine="3"
              ellipsis="..."
              trimRight
              onClick={() => openBlogPost(item.id)}
              basedOn="letters"
            />
            <div className="row">
              {item?.likes ? (
                <div className="like">
                  <AiFillHeart /> {item.likes}
                </div>
              ) : null}
              {item?.comments ? (
                <div className="comments">
                  <AiFillMessage /> {item.comments}
                </div>
              ) : null}
            </div>
            {item?.tags ? (
              <div className="tags scroll">
                {item.tags.map((tag) => (
                  <div className="tag">#{tag.tag}</div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="pages">
        <Pagination
          pages={blog.pages}
          currentPage={page}
          onChangePage={(pageitem) => {
            console.log(pageitem);
          }}
          setPage={setPage}
        />
      </div>
    </Container>
  );
};

export default Blog;

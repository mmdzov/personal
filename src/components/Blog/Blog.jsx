/* eslint-disable react/self-closing-comp */
import { Container } from './Blog.styled';
import { useState, useContext } from 'react';
import { Select } from 'antd';
import PostImage from '../../assets/img/post.jpg';
import BlogList from './BlogList';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';

const { Option } = Select;

const Blog = () => {
  const { user } = useContext(Context);
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

  return (
    <Container>
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
        {user?.isAdmin ? (
          <Link to="/addpost" className="addblog">
            <AiOutlinePlus />
          </Link>
        ) : null}
      </div>

      <BlogList blog={blog} />
    </Container>
  );
};

export default Blog;

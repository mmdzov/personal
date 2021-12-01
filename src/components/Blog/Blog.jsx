/* eslint-disable react/self-closing-comp */
import { Container } from './Blog.styled';
import { useEffect } from 'react';
import { Select } from 'antd';
import BlogList from './BlogList';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, getBlogsByCategory } from '../../store/actions/blogAction';

const { Option } = Select;

const Blog = () => {
  const { data } = useSelector(({ main }) => main);
  const { categories } = useSelector(({ blogs }) => blogs);
  const dispatch = useDispatch();
  const handleChange = (value) => {
    if (value === 'all') {
      dispatch(getBlogs());
    } else {
      dispatch(getBlogsByCategory(value, 1));
    }
  };
  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  return (
    <Container>
      <div className="categorylist">
        <Select
          defaultValue={'all'}
          className="select"
          style={{ width: 120, background: 'white' }}
          bordered={false}
          onChange={handleChange}
        >
          <Option value={'all'} className="option">
            {'all'}
          </Option>
          {categories.map((item) => (
            <Option value={item.name} className="option">
              {item.name}
            </Option>
          ))}
        </Select>
        {data?.isAdmin ? (
          <Link to="/addpost" className="addblog">
            <AiOutlinePlus />
          </Link>
        ) : null}
      </div>

      <BlogList />
    </Container>
  );
};

export default Blog;

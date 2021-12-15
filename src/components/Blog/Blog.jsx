/* eslint-disable react/self-closing-comp */
import { Container } from './Blog.styled';
import { useEffect } from 'react';
import { Select } from 'antd';
import BlogList from './BlogList';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs, getBlogsByCategory } from '../../store/actions/blogAction';
import useTokenDecode from '../../hooks/useTokenDecode';
import { Helmet } from 'react-helmet';

const { Option } = Select;

const Blog = () => {
  const decoded = useTokenDecode();
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
      <Helmet>
        <title>بلاگ | Personal</title>
        {/* <meta name="description" content='' /> */}
      </Helmet>
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
            <Option value={item.name} key={item?._id} className="option">
              {item.name}
            </Option>
          ))}
        </Select>
        {decoded?.isAdmin ? (
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

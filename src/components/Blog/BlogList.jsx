import Pagination from '../Pagination/Pagination';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs, getBlogsByCategory } from '../../store/actions/blogAction';
import BlogItem from './BlogItem';

const BlogList = () => {
  const { list, page_count, page, current_category } = useSelector(({ blogs }) => blogs);
  const handleSetPage = () => {};
  const dispatch = useDispatch();

  const handleChangePage = async (page) => {
    if (current_category === 'all') {
      await dispatch(getBlogs(page));
    } else {
      await dispatch(getBlogsByCategory(current_category?.name, page));
    }
    const app = document.getElementsByClassName('App')[0];
    const blogItem = document.getElementsByClassName('blogitem')[0];
    app?.scrollTo({
      left: 0,
      top: blogItem?.offsetTop - 30 || 0,
      behavior: 'smooth',
    });
  };

  return (
    <Container>
      <div className="bloglist">
        {list.map((item) => (
          <BlogItem blog={item} key={item?._id} />
        ))}
      </div>
      <div className="pages">
        <Pagination
          pages={page_count}
          currentPage={page}
          onChangePage={handleChangePage}
          setPage={handleSetPage}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  @media (min-width: 625px) {
    .bloglist {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 0 10px;
      .blogitem {
        margin: 7px 5px;
      }
    }
  }
  @media (min-width: 1024px) {
    .bloglist {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin: 0 10px;
      .blogitem {
        margin: 7px 5px;
      }
    }
  }
  @media (min-width: 1486px) {
    .bloglist {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      margin: 0 10px;
      .blogitem {
        margin: 7px 5px;
      }
    }
  }
  @media (min-width: 2200px) {
    .bloglist {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      margin: 0 10px;
      .blogitem {
        margin: 7px 5px;
      }
    }
  }
`;

export default BlogList;

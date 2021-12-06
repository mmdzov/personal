import { useNavigate } from 'react-router-dom';
import LineEllipsis from 'react-lines-ellipsis';
import { AiFillHeart, AiFillMessage } from 'react-icons/ai';
import Pagination from '../Pagination/Pagination';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getBlogs, getBlogsByCategory } from '../../store/actions/blogAction';

const BlogList = () => {
  const { list, page_count, page, current_category } = useSelector(({ blogs }) => blogs);
  const handleSetPage = () => {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openBlogPost = (post) => {
    navigate(post?.toString());
  };

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

  const handleGoTag = (tag) => {
    navigate(`/tags/${tag}`);
  };

  return (
    <Container>
      <div className="bloglist">
        {list.map((item) => (
          <div className="blogitem" key={item?._id}>
            <div className="title" onClick={() => openBlogPost(item?._id)}>
              {item?.title}
            </div>
            {item?.image ? (
              <img
                src={item?.image}
                // onClick={() => openBlogPost(item.id)}
                alt=""
              />
            ) : null}
            <LineEllipsis
              className="description"
              text={item?.description}
              maxLine="3"
              ellipsis="..."
              trimRight
              onClick={() => openBlogPost(item?._id)}
              basedOn="letters"
            />
            <div className="row">
              {item?.likes ? (
                <div className="like">
                  <AiFillHeart style={{ color: '#d94949' }} /> {item?.likes?.length}
                </div>
              ) : null}
              {item?.comments ? (
                <div className="comments">
                  <AiFillMessage style={{ color: '#c7c7c7' }} /> {item?.comments?.length}
                </div>
              ) : null}
            </div>
            {item?.tags ? (
              <div className="tags scroll">
                {item?.tags?.map((tag) => (
                  <div className="tag" key={tag.id} onClick={() => handleGoTag(tag?.name)}>
                    #{tag.name}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
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

  .blogitem {
    height: fit-content;
    background: black;
    padding: 5px 10px;
    text-align: left;
    margin: 0 15px;
    border-radius: 10px;
    box-shadow: 0 5px 10px 1px black;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .title {
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: #2196f3;
      cursor: pointer;
      width: 100%;
    }
    > img {
      width: 100%;
      max-height: 190px;
      /* max-width: 350px; */
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      object-fit: cover;
    }

    .description {
      max-height: 62px;
      overflow: hidden;
      padding: 0 10px;
      font-size: 0.8rem;
      color: #c7c7c7;
      cursor: pointer;
      text-align: left;
      width: 100%;
    }
    .row {
      display: flex;
      padding: 0 10px;
      width: 100%;

      > div {
        height: 40px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        font-size: 0.8rem;
        > svg {
          font-size: 1rem;
          margin-right: 3px;
        }
      }
    }
    .tags {
      width: 100%;
      display: flex;
      /* height: 35px; */
      align-items: center;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 10px;
      margin-top: 10px;
      flex-wrap: wrap;
      .tag {
        color: #03a9f4;
        cursor: pointer;
        margin: 0 2px;
        padding: 0 5px;
      }
    }
  }
`;

export default BlogList;

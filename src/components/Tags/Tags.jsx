import { useEffect, useState } from 'react';
import { Container } from './Tags.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { Image, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { searchTags, getTags, getBlogsByTag } from '../../store/actions/blogAction';
import errorImg from '../utils/errorImg';

const { Search } = Input;

const Tags = () => {
  const { tags, list } = useSelector(({ blogs }) => blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag: urlTag } = useParams();

  useEffect(() => {
    if (!urlTag) {
      dispatch(getTags());
    } else {
      dispatch(getBlogsByTag(urlTag));
    }
  }, [urlTag]);
  const [searchLoading, setSearchLoading] = useState(false);
  const handleGoBlogPost = (id) => {
    navigate(`/blog/${id}`);
  };
  const handleGoTag = (tag) => {
    navigate(tag);
  };

  const [search, setSearch] = useState('');
  const handleChange = async ({ target }) => {
    setSearch(target?.value);
    await setSearchLoading(true);
    await dispatch(searchTags(target?.value));
    await setSearchLoading(false);
  };
  const handleSearchTag = async () => {
    await setSearchLoading(true);
    await dispatch(searchTags(search));
    await setSearchLoading(false);
  };

  return (
    <Container>
      {urlTag ? null : (
        <form onSubmit={(e) => e.preventDefault()}>
          <Search
            placeholder="search a tag"
            loading={searchLoading}
            onChange={handleChange}
            value={search}
            onSearch={handleSearchTag}
          />
        </form>
      )}
      {urlTag ? (
        <div className="header">
          <div className="tagname">#{urlTag}</div>
          <div className="resultcount">Results {list?.length}</div>
        </div>
      ) : null}
      {!searchLoading ? (
        !urlTag ? (
          tags?.length > 0 ? (
            tags?.map((item) => (
              <div className="tag" key={item?.id} onClick={() => handleGoTag(item.name)}>
                <div className="title">#{item?.name}</div>
                {/* <div className="posts">{item.posts}</div> */}
              </div>
            ))
          ) : (
            <div className="notfound">Sorry:(, Nothing was found</div>
          )
        ) : (
          list.map((item) => (
            <div className="urltag" key={item?._id}>
              <Image
                className="avatar"
                onClick={() => handleGoBlogPost(item?._id)}
                src={item?.image}
                preview={false}
                fallback={errorImg}
              />
              <div className="title" onClick={() => handleGoBlogPost(item?._id)}>
                {item?.title}
              </div>
            </div>
          ))
        )
      ) : (
        <div className="notfound">Loading...</div>
      )}
    </Container>
  );
};

export default Tags;

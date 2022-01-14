import { useEffect, useState } from 'react';
import { Container } from './Tags.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { Image, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { searchTags, getTags, getBlogsByTag } from '../../store/actions/blogAction';
import errorImg from '../utils/errorImg';
import { Helmet } from 'react-helmet';
import useLanguage from '../../hooks/useLanguage';

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
  const handleGoBlogPost = (blog) => {
    let title = blog.title.split(' ').join('-');
    navigate(`/blog/${blog?.blog_id}/${title}`);
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

  const lang = useLanguage();

  return (
    <Container>
      {urlTag ? (
        <Helmet>
          <title>{`#${urlTag} | Personal`}</title>
          {/* <meta name="description" content='' /> */}
        </Helmet>
      ) : (
        <Helmet>
          <title>{`${lang.pages.tags} | Personal`}</title>
          {/* <meta name="description" content='' /> */}
        </Helmet>
      )}
      {urlTag ? null : (
        <form onSubmit={(e) => e.preventDefault()}>
          <Search
            placeholder={lang.tags.inputs.searchtag}
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
          <div className="resultcount">
            {lang.tags.results} {list?.length}
          </div>
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
            <div className="notfound">{lang.tags.resultNotFound}</div>
          )
        ) : (
          list.map((item) => (
            <div className="urltag" key={item?._id}>
              <Image
                className="avatar"
                onClick={() => handleGoBlogPost(item)}
                src={item?.image}
                preview={false}
                fallback={errorImg}
              />
              <div className="title" onClick={() => handleGoBlogPost(item)}>
                {item?.title}
              </div>
            </div>
          ))
        )
      ) : (
        <div className="notfound">{lang.tags.loading}</div>
      )}
    </Container>
  );
};

export default Tags;

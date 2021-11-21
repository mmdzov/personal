import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineFork, AiOutlineEye } from 'react-icons/ai';
import { MdCopyAll } from 'react-icons/md';
import colors from '../../colors.json';
import ProgressLine from '../progress/ProgressLine';
import ReactLoading from 'react-loading';
import LineEllipsis from 'react-lines-ellipsis';

const Repos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limitShow, setLimitShow] = useState(3);
  const color = (lang) => {
    let list = colors;
    let clr = '';
    for (let i in list) {
      if (i === lang) clr = list[i]?.color;
    }
    return clr;
  };

  const getRepos = async () => {
    try {
      setLoading(true);
      let { data: repos } = await axios.get('https://api.github.com/users/mmdzov/repos');

      for (let b in repos) {
        const item = repos[b];
        let { data: langs } = await axios.get(item?.languages_url);
        let lngs = [];
        let total = 0;
        Object.values(langs).reduce(
          // eslint-disable-next-line no-loop-func
          (prev, curr) => (total += curr),
          0,
        );
        for (let i in langs) {
          lngs.push({
            percentage: (langs[i] * 100) / total + '%',
            color: color(i),
          });
        }
        item.langs = lngs;
        repos[b] = item;
      }
      repos = repos.filter((item) => !item.fork && item?.description && item?.langs?.length > 0);
      setLoading(false);
      setRepos(repos);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  if (loading)
    return (
      <LoadingContainer className="">
        <ReactLoading type={'spin'} color={color} height={50} width={50} />
      </LoadingContainer>
    );

  return (
    <Container className="sec">
      <div className="sec-title">Github Repositories</div>
      <div className="sec-list" style={{ padding: 0 }}>
        {repos.slice(0, limitShow).map((item) => (
          <div className="repo" key={item?.node_id}>
            <a href={item?.html_url} className="name">
              {item?.name}
            </a>
            {item?.description ? (
              <LineEllipsis
                className="description"
                text={item?.description}
                maxLine="2"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            ) : null}
            <div className="clone">
              <div className="">{item?.clone_url}</div>
              <MdCopyAll />
            </div>
            {item?.langs?.length > 0 ? (
              <div className="langs" style={{ textAlign: 'left', marginTop: 9 }}>
                <ProgressLine visualParts={item?.langs} />
              </div>
            ) : null}
            <div className="more">
              {item?.watchers > 0 ? (
                <div className="">
                  <div className="">{item?.watchers}</div>
                  <AiOutlineEye />
                </div>
              ) : null}
              {item?.forks > 0 ? (
                <div className="">
                  <div className="">{item?.forks}</div>
                  <AiOutlineFork />
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {repos.length > 0 ? (
          <div
            className="seeMore"
            onClick={() => setLimitShow((prev) => (prev === repos.length ? 4 : repos.length))}
          >
            {limitShow === repos.length ? 'Hide more...' : 'See more...'}
          </div>
        ) : null}
      </div>
    </Container>
  );
};

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;

const Container = styled.div`
  .seeMore {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    box-shadow: 2px 5px 8px -5px black;
    margin: 10px 0px;
    border: 1px solid #00000057;
    font-size: 1.1rem;
    padding-bottom: 5px;
    cursor: pointer;
  }
  .repo {
    background: #0a0a0a;
    color: white;
    border-radius: 10px;
    padding: 5px 10px;
    margin: 7.5px 0px;
    box-shadow: 0 5px 10px -2px black;
    .name {
      height: 35px;
      font-size: 1.2rem;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      line-height: 33px;
      color: #03a9f4;
      cursor: pointer;
    }
    .description {
      text-align: left;
      font-size: 0.8rem;
      padding: 5px 5px;
    }
    .clone {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      height: 23px;
      background: #19203e;
      padding: 0px 10px;
      border-radius: 75px;
      line-height: 2px;
      color: white;
      font-family: monospace;
      display: none;
      > div {
        overflow-x: hidden;
        height: 100%;
        padding-top: 21px;
        margin-right: 5px;
      }
      > svg {
        font-size: 1.2rem;
      }
    }
    .more {
      padding-bottom: 5px;
      /* height: 25px; */
      align-items: center;
      display: flex;
      /* border-top: 1px solid #c3c3c3; */
      margin-top: 6px;
      > div {
        display: flex;
        align-items: center;
        /* direction: rtl; */
        padding: 0 5px;
        > div {
          font-size: 0.9rem;
          line-height: 8px;
        }
        > svg {
          font-size: 1rem;
          padding: 0 4px;
          margin-top: 3px;
        }
      }
    }
  }
`;

export default Repos;

/* eslint-disable no-unused-vars */
import { Container } from './Pagination.styled';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useState, useEffect, Fragment } from 'react';

const Pagination = ({
  pages,
  pageVisibleCount = 5,
  currentPage,
  setPage = () => {},
  onChangePage = () => {},
  onNext = () => {},
  onJump = () => {},
  onPrev = () => {},
}) => {
  const [pageCount, setPageCount] = useState([]);
  const sortPages = (pageItem) => {
    let newPageCount = [];
    let setPages = [];
    let trim = 0;
    let count = 1;
    let reverseCount = 0;
    for (let i of Array(pages)) {
      setPages.push(count);
      count++;
    }
    count = 0;
    if (pageVisibleCount % 2 === 1) trim = Math.ceil(pageVisibleCount / 2);
    else trim = pageVisibleCount / 2;
    for (let i of Array(trim)) {
      newPageCount.push(pageItem + count);
      count++;
    }
    newPageCount.push('...');
    let reversePage = setPages.sort((a, b) => b - a);
    let saveLastPages = [];
    for (let i of Array(pageVisibleCount - trim)) {
      saveLastPages.push(reversePage[reverseCount]);
      reverseCount++;
    }
    newPageCount.push(...saveLastPages.reverse());

    const dotIndex = newPageCount.findIndex((item) => item === '...');

    if (newPageCount[dotIndex + 1] - 1 === newPageCount[dotIndex - 1]) {
      newPageCount.splice(dotIndex, 1);
    }

    const afterDots = newPageCount.filter((_, index) => index > dotIndex);
    const beforeDots = newPageCount.filter((_, index) => index < dotIndex);
    if (afterDots.includes(pageItem) || beforeDots.some((item) => afterDots.includes(item))) {
      newPageCount = reversePage.slice(0, pageVisibleCount).reverse();
    }
    setPageCount(newPageCount);
  };

  useEffect(() => {
    sortPages(currentPage);
  }, [pages]);

  const runEvents = (event) => {
    sortPages(event);
    setPage(event);
    onChangePage(event);
  };

  const handleJump = (item) => {
    runEvents(item);
    onJump(item);
  };

  const handlePrev = () => {
    const prevPage = currentPage - 1;
    runEvents(prevPage);
    onPrev(prevPage);
  };
  const handleNext = () => {
    const nextPage = currentPage + 1;
    runEvents(nextPage);
    onNext(nextPage);
  };

  return (
    <Container>
      {pages > pageVisibleCount ? (
        <span className="arrow-left" onClick={handlePrev}>
          <IoArrowBack />
        </span>
      ) : null}
      {pageCount.map((item) => (
        <Fragment>
          {item === '...' ? (
            <span className="dots">{item}</span>
          ) : (
            <div
              className=""
              key={item}
              className={item === currentPage ? 'enabled' : ''}
              onClick={() => handleJump(item)}
            >
              {item}
            </div>
          )}
        </Fragment>
      ))}
      {pages > pageVisibleCount ? (
        <span className="arrow-right" onClick={handleNext}>
          <IoArrowForward />
        </span>
      ) : null}
    </Container>
  );
};

export default Pagination;

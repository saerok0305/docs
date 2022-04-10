import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageButton from "./PageButton";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import defaultStyle from "../../../style";

// config
const window = 5;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 24px;
    height: 24px;

    border-radius: 50%;

    &:hover {
        background: ${defaultStyle.color4};
        cursor: pointer;
        color: white;
        opacity: 0.5;
    }

    &.active {
        background: ${defaultStyle.color4};
        color: white;
    }

    user-select: none;

    /* font-size: 1rem; */
`;

const LongPages = React.memo(function LongPages({
  currPage,
  pages,
  toPage,
  toLeft,
  toRight,
}) {
  // const inputDispatch = useInputDispatchContext();

  let n = Math.floor((currPage - 1) / window); // 1
  if (currPage === 1) n = 0;

  const lastPage = pages[pages.length - 1]; // 19
  let beginPage = 2 + window * n; // 12
  let endPage = beginPage + (window - 1); // 21

  if (endPage >= lastPage) {
    endPage = lastPage - 1;
  }

  //   if (endPage >= lastPage) {
  //     endPage = lastPage - 1;
  //     beginPage = endPage - (window - 1);
  //   }

  if (currPage === 1) {
    beginPage = currPage + 1; // 2
    endPage = currPage + 1 + (window - 1);
  } else if (currPage === lastPage) {
    // beginPage = currPage - 1 - (window - 1);
    // endPage = currPage - 1;
  } else if (currPage === beginPage) {
    //     // if(currPage === 2) return;
  } else if (currPage === endPage) {
    //     // if(currPage === lastPage-1) return;
  } else if (currPage === beginPage - 1) {
    //     // to left
    endPage = currPage;
    beginPage = currPage - (window - 1);
  } else if (currPage === endPage) {
    //     // to right
    beginPage = currPage;
    endPage = currPage + (window - 1);
    if (endPage > lastPage) {
      endPage = lastPage;
    }
  }

  const arr = pages.slice(beginPage - 1, endPage);
  return (
    <Container>
      <PageButtonContainer onClick={toLeft}>
        <FiChevronsLeft onClick={toLeft} />
      </PageButtonContainer>

      <PageButton
        className={currPage === 1 && "active"}
        onClick={(e) => toPage(1, e)}
      >
        {pages[0]}
      </PageButton>
      <PageButton>...</PageButton>
      {arr.map((num, i) => (
        <PageButton
          key={i}
          className={currPage === num && "active"}
          onClick={(e) => toPage(num, e)}
        >
          {num}
        </PageButton>
      ))}
      <PageButton>...</PageButton>
      <PageButton
        className={currPage === pages.length && "active"}
        onClick={(e) => toPage(pages[pages.length - 1], e)}
      >
        {pages[pages.length - 1]}
      </PageButton>

      <PageButtonContainer onClick={() => toRight(pages.length)}>
        <FiChevronsRight onClick={() => toRight(pages.length)} />
      </PageButtonContainer>
    </Container>
  );
});

export default React.memo(LongPages);

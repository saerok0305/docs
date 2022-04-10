import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PageButton from "./PageButton";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ShortPages({ currPage, pages, toPage, toLeft, toRight }) {
  return (
    <Container>
      <PageButton onClick={toLeft}>
        <FiChevronsLeft onClick={toLeft} />
      </PageButton>

      {pages.map((num, i) => (
        <PageButton
          key={i}
          className={currPage === num && "active"}
          onClick={(e) => toPage(num, e)}
        >
          {num}
        </PageButton>
      ))}

      <PageButton onClick={toRight}>
        <FiChevronsRight onClick={toRight} />
      </PageButton>
    </Container>
  );
}

export default ShortPages;

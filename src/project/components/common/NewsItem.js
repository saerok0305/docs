import React from 'react';
import styled, { css } from 'styled-components';
import defaultStyle from '../../../style';

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;

  width: 100%;
  height: 100px;

  /* border-bottom: 1px solid ${defaultStyle.color0}; */

  &:hover {
    background: ${defaultStyle.color0};
    cursor: pointer;
  }
  padding: 4px;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 30px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-evenly; */
  /* width: calc(100% - 60px); */
  /* width: 300px; */
  width: 100%;
  /* max-width: 240px; */
`;

const ImageContainer = styled.div`
  display: block;
  width: 60px;
  height: 60px;
  display: block;
  background-image: url(${(props) => props.data});
  background-size: contain;
  background-size: 100%;
  background-repeat: no-repeat;
  /* background-position: center; */

  /* &:hover {
        position: relative;
        width: 300px;
        height: 300px;
        background-position: left top;
        z-index: 50;

        transition: width 0.5s, height 0.5s;
    } */
`;

const TopContainer = styled.div`
  display: flex;
`;

const Date = styled.div`
  margin-left: 8px;
  border: 1px solid #dee2e6;
  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
`;
const Source = styled.div`
  margin-left: 8px;
  border: 1px solid #dee2e6;
  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;

  ${(props) =>
    props.flag &&
    css`
      // background: ${defaultStyle.backgroundColor4};
      border: 1px solid ${defaultStyle.color4};
    `}
`;
const Section = styled.div`
  margin-left: 8px;
  border: 1px solid #dee2e6;
  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
`;

const TitleContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;
const SnippetContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* padding-top: 4px; */
  /* padding-bottom: 4px; */
`;
const Title = styled.div`
  margin-left: 8px;
  padding: 0 4px;
  // border: 1px solid #dee2e6;
  /* max-width: 240px; */
  width: 100%;
  height: 24px;

  display: flex;
  align-items: center;
  /* justify-content: center; */
  font-size: 1rem;
`;
const TitleSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bolder;
`;

const Snippet = styled.div`
  margin-left: 8px;
  padding: 0 4px;
  // border: 1px solid #dee2e6;
  /* max-width: 240px; */
  width: 100%;
  height: 26px;
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */

  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  font-size: 0.8rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NewsItem = React.memo(function NewsItem({ obj, onNewsClick }) {
  const { date, source, title, content, page, section } = obj;

  let imageUrl = null;
  if (page && page.length > 0) {
    for (let e of page) {
      if (e.type === 'image') {
        imageUrl = e.value1;
        break;
      }
    }
  }
  return (
    <Container onClick={() => onNewsClick(obj)}>
      <LeftContainer>
        <ImageContainer data={imageUrl}></ImageContainer>
      </LeftContainer>
      <RightContainer>
        <TopContainer>
          <Date>
            {date && date.includes('T') ? date.replace('T', ' ') : date}
          </Date>
          <Source>{source}</Source>
          <Section>{section ? section : ''}</Section>
        </TopContainer>
        <TitleContainer>
          <Title>
            <TitleSpan>{title}</TitleSpan>
          </Title>
        </TitleContainer>
        <SnippetContainer>
          <Snippet>{content}</Snippet>
        </SnippetContainer>
      </RightContainer>
    </Container>
  );
});

export default React.memo(NewsItem);

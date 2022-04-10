import React, { useEffect, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { BrowserRouter, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import defaultStyle from '../../../style';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: flex-start; */
  padding: 10px 10px;

  width: 100%;
  height: 100%;
  background: white;

  overflow-y: overlay;
  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: grey;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 100%;
`;

const ActionBlock = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
`;

const CloseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  font-size: 2.5rem;

  &:hover {
    cursor: pointer;
    background: ${defaultStyle.color1};
    /* opacity: 0.8; */
    color: white;
  }
`;

const MetaContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 4px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* height: 100%; */

  background: white;
  padding: 0 4px;
`;

const Title = styled.div`
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */

  font-size: 1.4rem;
  font-weight: 900;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 20px;

  border: 1px solid #dee2e6;
  /* box-shadow: 2px 2px #dee2e6; */
  background: white;
  padding: 0 4px;

  font-size: 0.8rem;
`;
const Source = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 20px;

  margin-left: 10px;
  border: 1px solid #dee2e6;
  /* box-shadow: 2px 2px #dee2e6; */
  background: white;
  padding: 0 4px;

  font-size: 0.8rem;
`;

const Id = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 20px;

  margin-left: 10px;
  border: 1px solid #dee2e6;
  /* box-shadow: 2px 2px #dee2e6; */
  background: white;
  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 10px;
`;
const Image = styled.img`
  max-width: 90%;
`;

const Text = styled.div`
font-size: 1rem;
  ${(props) =>
    props.highlight &&
    css`
      font-weight: 900;
      /* color: red; */
      /* background-color: #ffbb00; */
      background-color: #abf200;
    `}
`;

const Paragraph = styled.div`
  padding-bottom: 20px;
`;

function NewsClusterArticle({ item, headerComponents }) {
  // console.log(item); //////////////////////////////////////////////
  const {
    date,
    cluster_rank,
    keywords,
    cluster_time,
    main,
    image_url,
    local_document_salience,
    index,
    section,
    source,
    document_id,
    title,
    content,
    cluster_id,
    page,
  } = item;

  const idParagraph = new Map();
  for (let i = 0; i < page.length; i++) {
    let obj = page[i];
    let pId = obj.paragraph_id;
    if (!idParagraph.has(pId)) {
      let list = [];
      list.push(obj);
      idParagraph.set(pId, list);
    } else {
      let list = idParagraph.get(pId);
      list.push(obj);
    }
  }

  let paragraphs = [];
  for (let id of idParagraph.keys()) {
    let paragraph = idParagraph.get(id);
    paragraphs.push(paragraph);
  }

  const onClose = () => {
    console.log('close article ...');
  };

  return (
    <ArticleContainer>
      <ActionBlock>{headerComponents}</ActionBlock>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <MetaContainer>
        <Date>{date.substring(0, 19).replace('T', ' ')}</Date>
        <Source>{source}</Source>
        <Id>{document_id}</Id>
      </MetaContainer>
      <ContentContainer>
        {paragraphs.map((paragraph, pId) => (
          <Paragraph key={pId}>
            {paragraph.map((obj, sId) => {
              if (obj.type === 'image') {
                return (
                  <ImageContainer key={sId}>
                    <Image key={sId} src={obj.value1} />
                  </ImageContainer>
                );
              } else {
                return (
                  <div key={pId + '-' + sId}>
                    <Text key={sId} highlight={obj.highlight}>
                      {obj.value1}
                    </Text>
                  </div>
                );
              }
            })}
          </Paragraph>
        ))}
      </ContentContainer>
    </ArticleContainer>
  );
}

export default NewsClusterArticle;

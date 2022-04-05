import React from 'react';
import styled, { css } from 'styled-components';
import defaultStyle from '../../style';
import barcode from '../../barcode.png';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 330px;
  height: 220px;
  /* margin: 10px; */

  border: 1px solid ${defaultStyle.color0};
  border-radius: 12px;
  padding: 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 140px;
  /* margin: 4px; */
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 60px;
  /* margin: 4px; */
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.data});
  background-size: contain;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;

  box-shadow: 0 0 8px 8px white inset;
`;
const Title = styled.div`
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
`;
const Snippet = styled.div`
  /* width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.6rem; */

  text-overflow: ellipsis;
  overflow: hidden;
  // Addition lines for 2 line or multiline ellipsis
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-size: 0.8rem;

  color: grey;
`;

function PreviewItem({ title, img, snippet, link, onClickPreview }) {
  let data = null;
  if (img) {
    data = img;
  }

  const onClick = () => {
    onClickPreview();
  };

  return (
    <Container onClick={onClick}>
      <ImageContainer>
        <Image data={data} />
      </ImageContainer>
      <TextContainer>
        <Title>{title}</Title>
        <Snippet>{snippet}</Snippet>
      </TextContainer>
    </Container>
  );
}

export default PreviewItem;

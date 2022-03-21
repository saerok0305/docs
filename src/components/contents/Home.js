import React from "react";
import styled from "styled-components";
import barcode from "../../barcode.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const ImageContainer = styled.div`
  display: block;
  width: 330px;
  height: 220px;
  display: block;
  background-image: url(${(props) => props.data});
  // background-size: contain;
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

  /* opacity: 0.3; */
`;

function Home() {
  return (
    <Container>
      <ImageContainer data={barcode}></ImageContainer>
    </Container>
  );
}

export default Home;

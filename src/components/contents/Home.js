import React from "react";
import styled from "styled-components";
// import logo from '../Nclogo_leftright.svg';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%100px;
`;
const ImageContainer = styled.div`
  display: block;
  width: 400px;
  height: 400px;
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
`;

function Home() {
  return (
    <Container>
      {/* <ImageContainer data={logo}></ImageContainer> */}asdf
    </Container>
  );
}

export default Home;

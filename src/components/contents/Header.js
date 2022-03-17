import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import defaultStyle from "../../style";
import StyledLink from "../common/StyledLink";
import mappings from "../../pages/mappings.json";
import { AiOutlineMenu, AiOutlineEllipsis } from "react-icons/ai";

const Container = styled.div`
  position: relative; //////////////////////////////
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 60px;
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: calc(100% - 120px);
  overflow: none;
  ${(props) =>
    props.responsive === "mobile" &&
    css`
      width: calc(100% - 60px);
      overflow-x: scroll;
    `}
`;
const SubMiddle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 60px;
  right: 38px;
  width: fit-content;
  padding: 10px;

  border: 1px solid ${defaultStyle.color0};
  border-radius: 8px;
`;

const Right = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  width: 60px;
  height: 100%;

  background-color: white;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-left: 10px;
  width: 40px;
  height: 40px;

  cursor: pointer;

  &:hover {
    background: ${defaultStyle.color0};
  }

  border-radius: 50%;

  ${(props) =>
    !props.collapsed &&
    css`
      color: white;
      background-color: black;
    `}

  -webkit-tap-highlight-color: transparent;
`;

const HeaderItem = styled.div`
  display: flex;
  justify-content: center; ////////////////////////////////////////////
  align-items: center;
  margin: 4px;
  height: 30px; ///////////////

  cursor: pointer;

  &:hover {
    background: ${defaultStyle.color0};
  }

  border-radius: 12px;

  user-select: none;

  ${(props) =>
    props.selected &&
    css`
      background-color: black;
    `}
`;

const ExtendButton = styled.div`
  display: flex;
  justify-content: center; ////////////////////////////////////////////
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:hover {
    background: ${defaultStyle.color0};
  }

  border-radius: 50%;

  ${(props) =>
    props.extend &&
    css`
      color: white;
      background-color: black;
    `}

  -webkit-tap-highlight-color: transparent;
`;

function Header({ responsive, collapsed, onClickMenu, link, onClickLink, extend, setExtend }) {
  const ref = useRef(null);

  // const [windowSize, setWindowSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  const [lastIndex, setLastIndex] = useState(0);

  const calcLastIndex = () => {
    const clientWidth = ref.current.offsetWidth - 60;
    //const scrollWidth = ref.current.scrollWidth;

    let left = 0;
    for (let i = 0; i < mappings.length; i++) {
      const len = mappings[i].header.label.length;
      const px = len * 16 + 60 + 8; // rem + padding + margin
      left = left + px;
      if (left > clientWidth) {
        setLastIndex(i - 1);
        break;
      } else {
        setLastIndex(0);
      }
    }
  };

  useLayoutEffect(() => {
    calcLastIndex();
    return () => {
      calcLastIndex(); // for responsive layout
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", calcLastIndex);
    return () => {
      // clean up
      window.removeEventListener("resize", calcLastIndex);
    };
  }, []);

  
  const onExtend = () => {
    console.log(extend); ////
    setExtend(!extend);
  };

  return (
    <Container>
      <Left collapsed={collapsed}>
        <MenuItem collapsed={collapsed} onClick={onClickMenu}>
          <AiOutlineMenu />
        </MenuItem>
      </Left>
      {responsive === "mobile" && (
        <Middle responsive={responsive} ref={ref} collapsed={collapsed}>
          {mappings.map((e, index) => (
            <HeaderItem
              key={index}
              onClick={() => onClickLink(e.header.path)}
              selected={e.header.path === link}
            >
              <StyledLink selected={e.header.path === link} to={e.header.path}>
                {e.header.label}
              </StyledLink>
            </HeaderItem>
          ))}
        </Middle>
      )}

      {responsive !== "mobile" && (
        <Middle responsive={responsive} ref={ref} collapsed={collapsed}>
          {mappings.map((e, index) => {
            if (lastIndex === 0 || index <= lastIndex) {
              return (
                <HeaderItem
                  key={index}
                  onClick={() => onClickLink(e.header.path)}
                  selected={e.header.path === link}
                >
                  <StyledLink
                    selected={e.header.path === link}
                    to={e.header.path}
                  >
                    {e.header.label}
                  </StyledLink>
                </HeaderItem>
              );
            }
          })}
        </Middle>
      )}

      {responsive !== "mobile" && extend && (
        <SubMiddle>
          {mappings.map((e, index) => {
            if (lastIndex > 0 && index > lastIndex) {
              return (
                <HeaderItem
                  key={index}
                  onClick={() => onClickLink(e.header.path)}
                  selected={e.header.path === link}
                >
                  <StyledLink
                    selected={e.header.path === link}
                    to={e.header.path}
                  >
                    {e.header.label}
                  </StyledLink>
                </HeaderItem>
              );
            }
          })}
        </SubMiddle>
      )}

      {responsive !== "mobile" && (
        <Right>
          {lastIndex > 0 && (
            <ExtendButton extend={extend} onClick={onExtend}>
              <AiOutlineEllipsis />
            </ExtendButton>
          )}
        </Right>
      )}
    </Container>
  );
}

export default Header;

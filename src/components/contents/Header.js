import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import defaultStyle from "../../style";
import StyledLink from "../common/StyledLink";
import mappings from "../../pages/mappings.json";
import { AiOutlineMenu, AiOutlineEllipsis } from "react-icons/ai";
import barcode from "../../barcode.png";
import { NavLink } from "react-router-dom";
import { getTextWidth } from "../../utils/LayoutUtil";

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
  width: 160px;
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: calc(100% - 220px);
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
  margin-left: 10px;
  width: 40px;
  height: 40px;

  cursor: pointer;

  &:hover {
    background: ${defaultStyle.color0};
  }

  border: 1px solid ${defaultStyle.color0};
  border-radius: 50%;

  ${(props) =>
    !props.collapsed &&
    css`
      color: white;
      background-color: black;
    `}

  -webkit-tap-highlight-color: transparent;
  font-size: 1.2rem;
`;

const LogoItem = styled.div`
  margin-left: 10px;
  height: 40px;

  cursor: pointer;
  text-align: center;

  -webkit-tap-highlight-color: transparent;
  user-select: none;
`;

const Logo = styled.img`
  /* width: 100%; */
  /* width: 100px; */
  height: 40px;
  /* opacity: 0.3; */
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

  border: 1px solid ${defaultStyle.color0};
  border-radius: 50%;

  ${(props) =>
    props.extend &&
    css`
      color: white;
      background-color: black;
    `}

  -webkit-tap-highlight-color: transparent;

  font-size: 1.2rem;
`;

function Header({
  responsive,
  collapsed,
  setCollapsed,
  onClickMenu,
  link,
  setLink,
  onClickLink,
  extend,
  setExtend,
}) {
  const ref = useRef(null);

  // const [windowSize, setWindowSize] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  const [lastIndex, setLastIndex] = useState(0);

  const calcLastIndex = () => {
    const clientWidth = ref.current.clientWidth - 60;
    //const scrollWidth = ref.current.scrollWidth;

    let left = 0;
    for (let i = 0; i < mappings.length; i++) {
      const textLen = getTextWidth(
        mappings[i].header.label,
        "normal 1rem arial"
      );
      // console.log(textLen); ///
      // const len = mappings[i].header.label.length;
      // const px = len * 16 + 60 + 8; // rem + padding + margin
      const px = textLen + 60 + 8; // rem + padding + margin
      left = left + px;

      if (left + 160 > clientWidth) {
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

  const onClickLogo = () => {
    setLink("/");
    setCollapsed(true);
  };

  return (
    <Container ref={ref}>
      <Left collapsed={collapsed}>
        <MenuItem collapsed={collapsed} onClick={onClickMenu}>
          <AiOutlineMenu />
        </MenuItem>
        <LogoItem onClick={onClickLogo}>
          <NavLink to={"/"} style={{ margin: "0 auto", padding: "0 10px" }}>
            <Logo src={barcode} />
          </NavLink>
        </LogoItem>
        {/* <LogoItem2>
          <NavLink
            to={"/"}
            style={{
              // display: "block",
              // alignItems: "center",
              // // fontSize: "100px",
              textDecoration: "none",
              color: "grey",
              // // height: "40px",
              // // width: "100%"
              fontSize: "30px"
            }}
          >
            Docs
          </NavLink>
        </LogoItem2> */}
      </Left>
      {responsive === "mobile" && (
        <Middle responsive={responsive} collapsed={collapsed}>
          {mappings.map((e, index) => (
            <HeaderItem
              key={index}
              onClick={() => onClickLink(e.header.path)}
              selected={link.startsWith(e.header.path)}
            >
              <StyledLink
                selected={link.startsWith(e.header.path)}
                to={e.header.path}
              >
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
                  selected={link.startsWith(e.header.path)}
                >
                  <StyledLink
                    selected={link.startsWith(e.header.path)}
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
                  selected={link.startsWith(e.header.path)}
                >
                  <StyledLink
                    selected={link.startsWith(e.header.path)}
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

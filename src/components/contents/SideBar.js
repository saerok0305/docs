import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import styled, { css } from "styled-components";
import defaultStyle from "../../style";
import StyledLink from "../common/StyledLink";
// import mappings from "../../page/mappings.mdx";
import mappings from "../../pages/mappings.json";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  /* ${(props) =>
    props.responsive === "mobile" &&
    css`
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
    `} */

  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  /* padding-top: 10px; */
  /* padding-bottom: 10px; */
  padding: 4px;

  height: 100%;
  width: 0px;

  ${(props) =>
    !props.collapsed &&
    css`
      width: 280px; ///////////////////////////////////////
      border-right: 1px solid ${defaultStyle.color0};
      background-color: white;
    `}
  transition: width 0.1s ease-out;

  overflow-y: overlay;
  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: ${defaultStyle.color0};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: grey;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: black;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 240px;
`;

const SideBarItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4px;
  height: 30px; ///////////////
  width: 100%;

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

  &:focus {
    text-decoration: none;
    /* color: ${defaultStyle.color4}; */
    color: white;
  }
`;

const SideBarSubItem = styled.div`
  display: flex;
  align-items: center;
  margin: 4px;
  height: 30px; ///////////////
  width: 100%;

  cursor: pointer;

  &:hover {
    background: ${defaultStyle.color0};
  }

  border-radius: 12px;
  padding-left: 10px;

  user-select: none;

  ${(props) =>
    props.selected &&
    css`
      background-color: black;
    `}
  font-size: 0.8rem;

`;

const ExtendButton = styled.div`
  display: flex;
  justify-content: center; ////////////////////////////////////////////
  align-items: center;
  height: 40px; ///////////////
  width: 40px;

  transform: rotateX(0deg);
  ${(props) =>
    props.extend &&
    css`
      transform: rotateX(180deg);
      /* color: ${defaultStyle.color4}; */
    `}

  transition: transform 0.250s ease-in;
  -webkit-tap-highlight-color: transparent;

  ${(props) =>
    props.selected &&
    css`
      /* background-color: black; */
      color: white;
    `}
`;

function SideBar({ responsive, collapsed, link, onClickLink }) {
  const location = useLocation();
  const path = location.pathname;
  let selectedHeader = path.substring(1, path.length);
  selectedHeader = selectedHeader.includes("/")
    ? selectedHeader.substring(0, selectedHeader.indexOf("/"))
    : selectedHeader;

  const [state, setState] = useState({});
  const onExtend = (key) => {
    setState({ ...state, [key]: state[key] ? !state[key] : true });
  };
  return (
    <Container responsive={responsive} collapsed={collapsed}>
      {!collapsed &&
        mappings.map(
          (item, index1) =>
            item.side_bar &&
            item.side_bar.map((sideBarItem, index2) => {
              if (item.header.path === selectedHeader || path === "/")
                return (
                  <ItemContainer key={index1 + "-" + index2}>
                    <SideBarItem
                      selected={
                        link === item.header.path + "/" + sideBarItem.path
                      }
                      onClick={() => {
                        onClickLink(item.header.path + "/" + sideBarItem.path);
                        onExtend(index1 + "-" + index2);
                      }}
                    >
                      <StyledLink
                        selected={
                          link === item.header.path + "/" + sideBarItem.path
                        }
                        to={item.header.path + "/" + sideBarItem.path}
                      >
                        {sideBarItem.label}
                      </StyledLink>
                      {sideBarItem.sub &&
                        sideBarItem.sub.length &&
                        sideBarItem.sub.length > 0 && (
                          <ExtendButton
                            selected={
                              link === item.header.path + "/" + sideBarItem.path
                            }
                            extend={state[index1 + "-" + index2]}
                            // onClick={() => onExtend(index1 + "-" + index2)}
                          >
                            <AiOutlineDown />
                          </ExtendButton>
                        )}
                    </SideBarItem>
                    {sideBarItem.sub &&
                      sideBarItem.sub.length &&
                      sideBarItem.sub.length > 0 &&
                      state[index1 + "-" + index2] &&
                      sideBarItem.sub.map((subItem, index3) => (
                        <SideBarSubItem
                          selected={
                            link ===
                            item.header.path +
                              "/" +
                              sideBarItem.path +
                              "/" +
                              subItem.path
                          }
                          onClick={() =>
                            onClickLink(
                              item.header.path +
                                "/" +
                                sideBarItem.path +
                                "/" +
                                subItem.path
                            )
                          }
                          key={index1 + "-" + index2 + "-" + index3}
                        >
                          <StyledLink
                            selected={
                              link ===
                              item.header.path +
                                "/" +
                                sideBarItem.path +
                                "/" +
                                subItem.path
                            }
                            to={
                              item.header.path +
                              "/" +
                              sideBarItem.path +
                              "/" +
                              subItem.path
                            }
                          >
                            {subItem.label}
                          </StyledLink>
                        </SideBarSubItem>
                      ))}
                  </ItemContainer>
                );
            })
        )}
    </Container>
  );
}

export default SideBar;

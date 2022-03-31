import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import defaultStyle from "../style";
import Content from "./contents/Content";
import Header from "./contents/Header";
import SideBar from "./contents/SideBar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${defaultStyle.color0};
`;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 50px);
`;

function MainApp({ responsive, collapsedDefault }) {
  const [collapsed, setCollapsed] = useState(collapsedDefault);

  const [extend, setExtend] = useState(false);

  const [link, setLink] = useState("/");
  const onClickLink = (link) => {
    setCollapsed(false);
    // if (responsive === "mobile") {
    //   setCollapsed(true);
    // }
    setLink(link);
  };

  const onClickMenu = () => {
    setCollapsed(!collapsed);
    setLink(link);
  };

  const onClickContent = () => {
    if (responsive === "mobile") {
      setCollapsed(true);
    }
    setExtend(false);
  };

  const [menuState, setMenuState] = useState({});
  const changeMenuState = (key) => {
    setMenuState({ ...menuState, [key]: menuState[key] ? !menuState[key] : true });
  };

  return (
    <Container>
      <HeaderContainer>
        <Header
          responsive={responsive}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          onClickMenu={onClickMenu}
          link={link}
          setLink={setLink}
          onClickLink={onClickLink}
          extend={extend}
          setExtend={setExtend}
          setMenuState={setMenuState}
        />
      </HeaderContainer>
      <ContentContainer>
        <SideBar
          responsive={responsive}
          collapsed={collapsed}
          link={link}
          onClickLink={onClickLink}
          menuState={menuState}
          changeMenuState={changeMenuState}
        />
        <Content
          collapsed={collapsed}
          onClickContent={onClickContent}
          setLink={setLink}
        />
      </ContentContainer>
    </Container>
  );
}

export default MainApp;

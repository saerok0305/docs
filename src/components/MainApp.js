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
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
`;

function MainApp({ responsive, collapsedDefault }) {
  const [collapsed, setCollapsed] = useState(collapsedDefault);

  const [extend, setExtend] = useState(false);

  const onClickMenu = () => {
    setCollapsed(!collapsed);
    setLink(null);
  };

  console.log(collapsed); ////////

  const [link, setLink] = useState(null);
  const onClickLink = (link) => {
    setCollapsed(false);
    setLink(link);
  };

  const onClickContent = () => {
    if (responsive === "mobile") {
      setCollapsed(true);
    }
    setExtend(false);
  };
  return (
    <Container>
      <HeaderContainer>
        <Header
          responsive={responsive}
          collapsed={collapsed}
          onClickMenu={onClickMenu}
          link={link}
          onClickLink={onClickLink}
          extend={extend}
          setExtend={setExtend}
        />
      </HeaderContainer>
      <ContentContainer>
        <SideBar
          responsive={responsive}
          collapsed={collapsed}
          link={link}
          onClickLink={onClickLink}
        />
        <Content collapsed={collapsed} onClickContent={onClickContent} />
      </ContentContainer>
    </Container>
  );
}

export default MainApp;

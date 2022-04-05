import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import barcode from '../../barcode.png';
import PreviewItem from '../common/PreviewItem';
import mappings from '../../pages/mappings.json';
import StyledLink from '../common/StyledLink';
import PreviewLink from '../common/PreviewLink';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  max-width: 800px;

  padding: 20px;
`;

const PreviewItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  /* justify-content: center; */
  /* align-items: center; */
  width: 100%;
  height: 100%;
`;

function Home({ link, onClickLink, changeMenuState }) {

  const onClickPreview = (path, index) => {
    onClickLink(path);
    changeMenuState(index);
  };

  return (
    <Container>
      <PreviewItemContainer>
        {/* <ImageContainer data={barcode}></ImageContainer> */}
        {/* {list.map((e) => (
          <Preview>{e}</Preview>
        ))} */}

        {mappings.map(
          (e, index) =>
            e.header.preview && (
              <PreviewLink key={index} to={e.header.path}>
                <PreviewItem
                  title={e.header.label}
                  snippet={e.haeader.snippet}
                  img={e.header.img}
                  link={link}
                  onClickPreview={() => onClickPreview(e.header.path, index)}
                  // selected={link.startsWith(e.header.path)}
                />
              </PreviewLink>
            ),
        )}

        {mappings.map(
          (item, index1) =>
            item.side_bar &&
            item.side_bar.map(
              (sideBarItem, index2) =>
                sideBarItem.preview && (
                  <PreviewLink
                    key={index1 + '-' + index2}
                    to={item.header.path + '/' + sideBarItem.path}
                  >
                    <PreviewItem
                      title={sideBarItem.label}
                      snippe={sideBarItem.snippet}
                      img={sideBarItem.img}
                      link={link}
                      onClickPreview={() =>
                        onClickPreview(
                          item.header.path + '/' + sideBarItem.path,
                          index1 + '-' + index2,
                        )
                      }
                    />
                  </PreviewLink>
                ),
            ),
        )}
        {mappings.map(
          (item, index1) =>
            item.side_bar &&
            item.side_bar.map(
              (sideBarItem, index2) =>
                sideBarItem.sub &&
                sideBarItem.sub.length > 0 &&
                sideBarItem.sub.map((subItem, index3) => (
                  <PreviewLink
                    key={index1 + '-' + index2 + '-' + index3}
                    to={
                      item.header.path +
                      '/' +
                      sideBarItem.path +
                      '/' +
                      subItem.path
                    }
                  >
                    <PreviewItem
                      title={subItem.label}
                      snippet={subItem.snippet}
                      img={subItem.img}
                      link={link}
                      onClickPreview={() =>
                        onClickPreview(
                          item.header.path +
                            '/' +
                            sideBarItem.path +
                            '/' +
                            subItem.path,
                          index1 + '-' + index2,
                        )
                      }
                    />
                  </PreviewLink>
                )),
            ),
        )}
      </PreviewItemContainer>
    </Container>
  );
}

export default Home;

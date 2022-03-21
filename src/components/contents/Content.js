import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";
import NotFound from "../NotFound";
import mappings from "../../pages/mappings.json";
import MarkDownComponent from "../common/MarkDownComponent";
import { css } from "styled-components";
import GeneralComponent from "../common/GeneralComponent";

const Container = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: scroll;

  width: 100%;
  height: 100%;
`;

function Content({ onClickContent }) {
  return (
    <Container onClick={onClickContent}>
      <Routes>
        <Route path="/*" element={<Home />} />
        {/* <Route
          path="/"
          element={<MarkDownComponent file={"home.md"} meta={{}} />}
        />
        <Route
          path="/docs"
          element={<MarkDownComponent file={"home.md"} meta={{}} />}
        /> */}
        {mappings.map((item, index) => (
          <Route
            key={index}
            path={item.header.path + "/*"}
            element={
              <MarkDownComponent
                file={item.header.path + "/" + item.header.md}
                meta={item.header.meta}
              />
            }
          />
        ))}
        {mappings.map(
          (item, index1) =>
            item.side_bar &&
            item.side_bar.map((sideBarItem, index2) => (
              <Route
                key={index1 + "-" + index2}
                path={item.header.path + "/" + sideBarItem.path + "/*"}
                element={
                  (sideBarItem.md && (
                    <MarkDownComponent
                      file={
                        item.header.path +
                        "/" +
                        sideBarItem.path +
                        "/" +
                        sideBarItem.md
                      }
                      meta={sideBarItem.meta}
                    />
                  )) ||
                  (sideBarItem.js && <div>asdf</div>)
                }
              />
            ))
        )}
        {mappings.map(
          (item, index1) =>
            item.side_bar &&
            item.side_bar.map(
              (sideBarItem, index2) =>
                sideBarItem.sub &&
                sideBarItem.sub.length > 0 &&
                sideBarItem.sub.map((subItem, index3) => (
                  <Route
                    key={index1 + "-" + index2 + "-" + index3}
                    path={
                      item.header.path +
                      "/" +
                      sideBarItem.path +
                      "/" +
                      subItem.path +
                      "/*"
                    }
                    element={
                      (subItem.md && (
                        <MarkDownComponent
                          file={
                            item.header.path +
                            "/" +
                            sideBarItem.path +
                            "/" +
                            subItem.path +
                            "/" +
                            subItem.md
                          }
                          meta={subItem.meta}
                        />
                      )) ||
                      (subItem.component && (
                        <GeneralComponent
                          component={
                            item.header.path +
                            "/" +
                            sideBarItem.path +
                            "/" +
                            subItem.path +
                            "/" +
                            subItem.component
                          }
                        />
                      ))
                    }
                  />
                ))
            )
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Container>
  );
}

export default Content;

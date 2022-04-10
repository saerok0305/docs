import React, { useCallback, useEffect, useRef, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import styled from "styled-components";
import useDidMountEffect from "../../../hooks/CustomEffect";
import SpinLoader from "../SpinLoader";
import Pagenation from "./Pagenation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const PaginationContainer = styled.div`
  width: 100%;
  height: 30px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 30px);

  overflow-x: hidden;
  overflow-y: overlay;

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: white;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: grey;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const PageFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;

  border-top: 1px solid grey;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  height: 100%;
  width: 100%;
`;

const BufferSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height}px;
  background: white;
`;

const PaginationContent = React.memo(function PaginationContent({
  inputState,
  setInputState,
  outputState,
  response, // for loading
  retrieve,
  // onItemClick,
  item,
  scrollPosition,
}) {
  const scrollTop = scrollPosition ? scrollPosition.current : 10;

  const ref = useRef();

  const page = inputState.page;
  const totalPages = outputState.totalPages;

  const {
    loading: articleLoading,
    data: articleData,
    error: articleError,
  } = response;

  const [bufferHeight, setBufferHeight] = useState();

  useEffect(() => {
    ref.current.scrollTo(0, scrollTop);
    setBufferHeight(ref.current.clientHeight / 2);
    // setBufferHeight(100);
  });

  useDidMountEffect(() => {
    ref.current.scrollTo(0, 10);
    retrieve();
  }, [page]);

  const toLeft = useCallback(
    (e) => {
      if (page === 1) return;
      setInputState({
        ...inputState,
        page: page - 1,
      });
    },
    [inputState, page, setInputState]
  );
  const toRight = useCallback(
    (lastPage) => {
      // console.log(page + ' === ' + lastPage);
      if (page === lastPage) return;
      setInputState({
        ...inputState,
        page: page + 1,
      });
    },
    [inputState, page, setInputState]
  );
  const toPage = useCallback(
    (eventKey, e) => {
      // console.log('페이지 선택: ' + eventKey);
      setInputState({
        ...inputState,
        page: eventKey,
      });
    },
    [inputState, setInputState]
  );

  const handleScroll = useCallback(
    (ref, e) => {
      if (e.target === e.currentTarget) {
        // console.log('scrollHeight:' + e.target.scrollHeight);
        // console.log('scrollTop:' + e.target.scrollTop);
        // console.log('clientHeight:' + e.target.clientHeight);

        const bottom =
          e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight <
          2;

        const top = e.target.scrollTop === 0;

        if (top) {
          // console.log('top'); ////
          if (page > 1) {
            setInputState({
              ...inputState,
              page: page - 1,
            });
            ref.current.scroll(0, 10);
          } else {
            ref.current.scroll(0, 10);
          }
          if (scrollPosition) {
            scrollPosition.current = 10;
          }
        } else if (bottom) {
          // console.log('bottom');
          if (page < totalPages) {
            setInputState({
              ...inputState,
              page: page + 1,
            });
            ref.current.scroll(0, 10);
          }
          if (scrollPosition) {
            scrollPosition.current = 10;
          }
        } else {
          if (scrollPosition) {
            scrollPosition.current = e.target.scrollTop;
          }
        }
      }
    },
    [inputState, page, setInputState, totalPages]
  );

  return (
    <Container>
      {articleLoading && (
        <ContentContainer ref={ref}>
          <SpinnerContainer>
            <SpinLoader />
          </SpinnerContainer>
        </ContentContainer>
      )}
      {!articleLoading && (
        <ContentContainer ref={ref} onScroll={(e) => handleScroll(ref, e)}>
          {/* {!articleLoading && outputState && (
                    <div>
                        <BufferSection
                            height={bufferHeight > 10 ? 10 : bufferHeight}
                        />
                        {outputState.source.map((e, index) => item(e, index))}
                        <BufferSection
                            height={bufferHeight > 10 ? 10 : bufferHeight}
                        />
                    </div>
                )} */}
          <BufferSection height={bufferHeight > 10 ? 10 : bufferHeight} />

          {outputState &&
            outputState.source.map((e, index) => (
              <div key={index}>{item(e, index)}</div>
            ))}
          <BufferSection height={bufferHeight} />
        </ContentContainer>
      )}

      <PaginationContainer>
        {totalPages > 0 && (
          <PageFooter>
            <Pagenation
              currPage={page}
              totalPages={totalPages}
              toPage={toPage}
              toLeft={toLeft}
              toRight={toRight}
            />
          </PageFooter>
        )}
      </PaginationContainer>
    </Container>
  );
});

export default React.memo(PaginationContent);

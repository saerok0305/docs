import React, { useState } from 'react';
import styled from 'styled-components';
import useAsync from '../hooks/useAsync';
import defaultStyle from '../style';
import SpinLoader from './common-components/SpinLoader';
import { toDateString } from './util';
import ClusterItem from './components/common/ClusterItem';
import DatewiseGraph from './components/common/DatewiseGraph';
import NewsClusterArticle from './components/common/NewsClusterArticle';

// import retrieveDatewiseAgg from '../../api/ChronoDatewiseAggApi';
// import retrieveCluster from '../../api/ChronoClusterSearchApi';
// import chronoSum from '../../api/ChronoSumApi';
import SummaryTest from './components/common/SummaryTest';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  height: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 800px;
  min-width: 400px;
  height: 100%;
`;
const Middle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 200px;
  height: 100%;

  margin-left: 4px;
  border: 1px solid ${defaultStyle.color1};
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 600px;
  height: 100%;

  margin-left: 4px;

  border: 1px solid ${defaultStyle.color1};
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  /* background: grey; */
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: calc(100% - 40px);

  border: 1px solid ${defaultStyle.color1};
  border-top: none;
`;

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  width: 100%;
  height: 100%;

  /* border: 1px solid ${defaultStyle.color1}; */

  /* padding: 4px; */
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: center;
  /* padding: 10px 10px; */

  width: 100%;
  height: 100%;
  background: white;

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

  /* border: 1px solid ${defaultStyle.color1}; */

  padding: 4px;
`;

const currentDate = new Date();
const onYearAgoDate = new Date(
  currentDate.getFullYear() - 1,
  currentDate.getMonth(),
  currentDate.getDate(),
);

const FunctionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 30px;

  border-radius: 4px;

  background: ${defaultStyle.color1};

  font-size: 0.8rem;

  margin-right: 10px;
  margin-bottom: 10px;
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Node = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &:hover {
    background: ${defaultStyle.color1};
    cursor: pointer;
    color: white;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SummaryContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;

  width: 100%;
  height: 100%;

  border-top: 1px solid ${defaultStyle.color1};

  padding: 4px;

  margin-top: 10px;
`;

const Datewise = React.memo(function Datewise({
  searcher,
  inputJson,
  categories,
  sources,
  retrieveDatewiseAgg,
  retrieveCluster,
  doSum,
}) {
  const [inputState, setInputState] = useState({
    ...inputJson,
    timeAggs: true,
  });
  const Searcher = searcher;

  const [datewiseAggState, setDatewiseAggState] = useState(null);
  const [datewiseState, setDatewiseState] = useState(null);

  // api - news
  const [datewiseAggResponse, refetchDatewiseAgg] = useAsync(
    retrieveDatewiseAgg,
    [],
  );

  const {
    loading: datewiseAggLoading,
    data: datewiseAggData,
    error: datewiseAggError,
  } = datewiseAggResponse;

  const retrieve = () => {
    refetchDatewiseAgg({
      inputState,
      setOutputState: setDatewiseAggState,
    });
  };

  // 시점 검색
  // ------------------------------------------------------------------------------- //
  // 날짜+문장 검색
  const [clusterState, setClusterState] = useState({
    totalPages: 0,
    source: [],
  });

  // api - news
  const [clusterResponse, refetchCluster] = useAsync(retrieveCluster, []);

  const {
    loading: clusterLoading,
    data: clusterData,
    error: clusterError,
  } = clusterResponse;

  const handleNodeClick = (node) => {
    const date = node.name;
    // 연표서비스 클러스터검색 호출
    const fromDate = new Date(date);
    const toDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate() + 1,
    );

    // console.log(fromDate);
    // console.log(toDate);
    // console.log(toDateString(toDate));

    const req = {
      ...inputState,
      searchUnit: 'cluster',
      searchPriority: 'relevance',
      sortField: 'score',
      sortOrder: 'DESC',
      titleSearch: true,
      to: toDateString(toDate),
      from: toDateString(fromDate),
    };
    refetchCluster({
      inputState: req,
      setOutputState: setClusterState,
    });
    setRightOpen(false);
  };
  // ----------------------------------------------------------------------------------------------------

  const onDateClick = (obj) => {
    const fromDate = new Date(obj.node);
    const toDate = new Date(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate() + 1,
    );
    const req = {
      ...inputState,
      searchUnit: 'cluster',
      searchPriority: 'relevance',
      sortField: 'score',
      sortOrder: 'DESC',
      titleSearch: true,
      to: toDateString(toDate),
      from: toDateString(fromDate),
    };
    // console.log(JSON.stringify(req)); /////////////////
    refetchCluster({
      inputState: req,
      setOutputState: setClusterState,
    });
    setRightOpen(false);
  };

  // 닫기
  const onClose = () => {
    setRightOpen(false);
  };

  const headerLeftComponents = (
    <FunctionButtonContainer onClick={onClose}>닫기</FunctionButtonContainer>
  );

  // click right item
  const [rightItem, SetRightItem] = useState(null);
  const [rightOpen, setRightOpen] = useState(false);
  const onNewsClick = (item) => {
    SetRightItem(item);
    setRightOpen(true);
  };

  const [extendIndex, setExtendIndex] = useState(-1);

  const onExtend = (index) => {
    if (extendIndex !== -1) {
      setExtendIndex(-1);
    } else {
      setExtendIndex(index);
    }
  };

  const [pointedDate, setPointedDate] = useState(null);
  const onMouseEnter = (obj) => {
    //console.log(obj);
    setPointedDate(obj.node);
  };
  const onMouseLeave = () => {
    setPointedDate(null);
  };

  // api - chrono mds
  const [single, setSingle] = useState(false);
  const [multi, setMulti] = useState(false);
  const [chronoSumResponse, refetchChronoSum] = useAsync(doSum, []);
  const onChronoSum = (chronoCluster) => {
    refetchChronoSum(chronoCluster);
    if (chronoCluster.sub_news_list.length > 0) {
      setMulti(true);
      setSingle(false);
      SetRightItem(chronoCluster.main_news);
      setRightOpen(true);
    } else {
      setMulti(false);
      setSingle(true);
      SetRightItem(chronoCluster.main_news);
      setRightOpen(true);
    }
  };

  return (
    <Container>
      <Left>
        <Top>
          <Searcher
            inputState={inputState}
            setInputState={setInputState}
            retrieve={retrieve}
            categories={categories}
            sources={sources}
          />
        </Top>
        <Bottom>
          {datewiseAggLoading && (
            <ResultContainer>
              <SpinnerContainer>
                <SpinLoader />
              </SpinnerContainer>
            </ResultContainer>
          )}
          {!datewiseAggLoading && (
            <DatewiseGraph
              datewiseAggState={datewiseAggState}
              handleNodeClick={handleNodeClick}
              datewiseState={datewiseState}
              setDatewiseState={setDatewiseState}
              pointedDate={pointedDate}
            ></DatewiseGraph>
          )}
        </Bottom>
      </Left>
      <Middle>
        <ResultContainer onMouseLeave={onMouseLeave}>
          {datewiseState &&
            datewiseState.map((obj, index) => {
              return (
                <Node
                  onMouseEnter={() => onMouseEnter(obj)}
                  onClick={() => onDateClick(obj)}
                  key={index}
                >
                  {obj.node}
                </Node>
              );
            })}
        </ResultContainer>
      </Middle>

      <Right>
        {!rightOpen && clusterLoading && (
          <ResultContainer>
            <SpinnerContainer>
              <SpinLoader />
            </SpinnerContainer>
          </ResultContainer>
        )}
        {!rightOpen && !clusterLoading && (
          <ResultContainer>
            <div>주요 시점 - 뉴스</div>
            {clusterState &&
              clusterState.source.map((obj, index) => {
                return (
                  <ClusterItem
                    obj={obj}
                    index={index}
                    extendIndex={extendIndex}
                    onExtend={onExtend}
                    onNewsClick={onNewsClick}
                    onSum={onChronoSum}
                  />
                );
              })}
          </ResultContainer>
        )}
        {rightOpen && (
          <ArticleContainer>
            <NewsClusterArticle
              item={rightItem}
              headerComponents={headerLeftComponents}
            />
            {single && (
              <SummaryContainer>
                <SummaryTest
                  obj={inputState}
                  response={chronoSumResponse}
                ></SummaryTest>
              </SummaryContainer>
            )}
            {multi && (
              <SummaryContainer>
                <SummaryTest
                  obj={inputState}
                  response={chronoSumResponse}
                ></SummaryTest>
              </SummaryContainer>
            )}
          </ArticleContainer>
        )}
      </Right>
    </Container>
  );
});

export default Datewise;

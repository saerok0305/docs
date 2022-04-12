import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import defaultStyle from '../style';
import CustomButton from './common-components/CustomButton';
import useAsync from '../hooks/useAsync';
import PaginationContent from './common-components/pagination/PaginationContent';
import MajorClusterSimulatiron from './components/common/MajorClusterSimulation';
import NewsClusterArticle from './components/common/NewsClusterArticle';
import ClusterItem from './components/common/ClusterItem';
import SpinLoader from './common-components/SpinLoader';
import WordCloud from './components/common/WordCloud';
import retrieveTopicClusters from './../api/HDPApiChrono';
import SearchResult from './components/common/SearchResult';
import { BsFillBackspaceFill } from 'react-icons/bs';
import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100%;
  max-width: 480px;
  height: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  width: 100%;
  height: 100%;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: calc(100% - 40px);

  border: 1px solid ${defaultStyle.color1};
  border-top: none;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const BottomTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 40px;
  /* padding: 0 4px; */
`;
const SubBottomTop = styled.div`
  display: flex;
  /* justify-content: center; */
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 40px;
  /* padding: 0 4px; */
`;

const BottomBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: calc(100% - 40px);
`;

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 30px;

  border-radius: 4px;

  background: ${defaultStyle.color1};

  font-size: 0.8rem;

  margin: 4px;
  /* margin-bottom: 10px; */
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }

  /* ${(props) =>
    props.display !== true &&
    css`
      opacity: 0.2;
    `} */

  opacity: 0.3;

  ${(props) =>
    props.selected &&
    css`
      /* box-shadow: inset 0 0 0 0.1rem ${defaultStyle.color2}; */
      opacity: 1;
    `}
`;

const ButtonLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 100%;
  margin-left: 8px;
  margin-right: 8px;
`;

const IconLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54px; ///////////
  height: 100%;
  font-size: 2.8rem;
  /* padding: 10px; */

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

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
  /* margin-bottom: 10px; */
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const MethodButtonTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &:hover {
    background: ${defaultStyle.color0};
    cursor: pointer;
  }
`;

const eventOptions = [
  { text: 'Burstiness', name: 'timeAggs', value: { timeAggs: false } },
  { text: 'Datewise', name: 'timeAggs', value: { timeAggs: true } },
];

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

function Realization({
  searcher,
  inputJson,
  categories,
  sources,
  retrieveCluster,
  detectEvent,
  doSum,
  doPhrase,
  phraseOptions,
  sumOptions,
  translate,
}) {
  categories = categories.map((e) => {
    let active = false;
    if (inputJson.categoryList) {
      if (inputJson.categoryList.includes(e.text)) {
        active = true;
      }
    }
    return { name: e.text, text: e.text, active: active };
  });

  sources = sources.map((e) => {
    let active = false;
    if (inputJson.sourceList) {
      if (inputJson.sourceList.includes(e.text)) {
        active = true;
      }
    }
    return { name: e.text, text: e.text, active: active };
  });

  const Searcher = searcher;
  const [inputState, setInputState] = useState(inputJson);
  // defaut text
  const labelState = {
    timeAggs: eventOptions[0].text,
    sumOption: sumOptions[0].text,
    phraseOption: phraseOptions[0].text,
  };

  const [tabState, setTabState] = useState({
    all: true,
    major: false,
    topic: false,
    page: false,
  });

  const onSelectTab = (key) => {
    const newTabState = {
      all: false,
      major: false,
      topic: false,
      page: false,
      [key]: true,
    };
    setTabState(newTabState);
    if (key === 'topic') {
      onHdp('lda');
    }
  };

  // api - searchEntityCluster
  const [clusterSearchState, setClusterSearchState] = useState({
    totalPages: 0,
    source: [],
  });

  const [clusterSearchResponse, refetchClusterSearch] = useAsync(
    retrieveCluster,
    [],
  );

  // api - datewise 기반 cluster 추천
  const [majorClusterState, setMajorClusterState] = useState({
    totalPages: 0,
    source: [],
  });

  const [detectEventResponse, refetchDetectEvent] = useAsync(
    detectEvent,
    [],
  );
  const {
    loading: detectEventLoading,
    data: detectEventData,
    error: detectEvetError,
  } = detectEventResponse;

  const retrieve = (inputState) => {
    refetchClusterSearch({
      inputState,
      setOutputState: setClusterSearchState,
    });
    refetchDetectEvent({
      inputState,
      setOutputState: setMajorClusterState,
    });
    // setInputState({ ...inputState, page: 1 });
  };

  const retrieveNews = (inputState) => {
    refetchClusterSearch({
      inputState,
      setOutputState: setClusterSearchState,
    });
    // setInputState({ ...inputState, page: 1 });
  };

  useEffect(() => {
    retrieve(inputState);
  }, []);

  const [extendIndex1, setExtendIndex1] = useState(-1);
  const onExtend1 = useCallback(
    (index) => {
      if (extendIndex1 !== -1) {
        setExtendIndex1(-1);
      } else {
        setExtendIndex1(index);
      }
    },
    [extendIndex1],
  );

  const [newsOpen, setNewsOpen] = useState(false);
  // click right item
  const [leftItem, setLeftItem] = useState(null);
  const onNewsClick = (item) => {
    onNewsClose();
    setLeftItem(item);
    setNewsOpen(true);
    if (translate) {
      refetchTranslate({
        inputState: item,
        setOutputState: setTranslateState,
      });
    }
  };

  const onNewsClose = useCallback(() => {
    setLeftItem(null);
    setSelectedCluster(null); ////////////////
    setNewsOpen(false);
    setTranslateState(null);
  }, []);

  const [generatedTitleState, setGeneratedTitleState] = useState();

  const [selectedCluster, setSelectedCluster] = useState();
  const onClusterClick = (clusterObj) => {
    // setLeftOpen(true); ///
    setSelectedCluster(clusterObj);
    setPhraseState(null);
    setGeneratedTitleState(null);
    setSingleSumState(null);
    setMultiSumState(null);
  };

  const [singleSumState, setSingleSumState] = useState();
  const [singleSumResponse, refetchSingleSum] = useAsync(doSum, []);
  const {
    loading: singleSumLoading,
    data: singleSumData,
    error: singleSumError,
  } = singleSumResponse;

  const [multiSumState, setMultiSumState] = useState();
  const [multiSumResponse, refetchMultiSum] = useAsync(doSum, []);
  const {
    loading: multiSumLoading,
    data: multiSumData,
    error: multiSumError,
  } = multiSumResponse;

  const [phraseState, setPhraseState] = useState();
  const [phraseResponse, refetchPhrase] = useAsync(doPhrase, []);
  const {
    loading: phraseLoading,
    data: phraseData,
    error: phraseError,
  } = phraseResponse;

  const onRealization = (chronoCluster) => {
    setNewsOpen(true);
    refetchPhrase({
      inputState: chronoCluster,
      setOutputState: setPhraseState,
    });
    refetchSingleSum({
      inputState: {
        ...chronoCluster,
        sub_news_list: [],
        summaryLength: inputState.summaryLength,
        sumOption: inputState.sumOption,
      },
      setOutputState: setSingleSumState,
    });
    refetchMultiSum({
      inputState: {
        ...chronoCluster,
        summaryLength: inputState.summaryLength,
        sumOption: inputState.sumOption,
      },
      setOutputState: setMultiSumState,
    });
  };

  const clusterItem = (cluster, index) => {
    return (
      <ItemContainer key={index}>
        <ClusterItem
          obj={cluster}
          index={index}
          extendIndex={extendIndex1}
          onExtend={onExtend1}
          onNewsClick={onNewsClick}
          onClusterClick={onClusterClick}
        />
      </ItemContainer>
    );
  };

  const [label, setLabel] = useState(labelState);

  // Burstiness / Datewise
  // ---------------------------------------------------------------- //
  const onRecommendSizeChange = (e) => {
    const { name, value } = e.target;
    // console.log(name + " : " + value);
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const onSelectEventOption = useCallback(
    (text, attrName, val) => {
      console.log(text); ///////
      console.log(attrName); ///////////
      console.log(val); /////////////////////////////
      setLabel({ ...label, [attrName]: text });
      setInputState({ ...inputState, ...val });
    },
    [inputState, label, setInputState],
  );

  // Realization Option (Summary Length / Generation Option)
  // ---------------------------------------------------------------- //
  const onSummaryLengthChange = (e) => {
    console.log(e); //////////////////
    e.stopPropagation();
    const { name, value } = e.target;
    // console.log(name + " : " + value);
    setInputState({
      ...inputState,
      [name]: value,
    });
  };
  // ------------------------------------------------------------------ //

  // api - google tarnslator
  const [translateResponse, refetchTranslate] = useAsync(translate, []);
  const {
    loading: translateLoading,
    data: translateData,
    error: translateError,
  } = translateResponse;
  const [translateState, setTranslateState] = useState();

  const rightHeaderComponents = (
    <MethodButtonTop>
      <FunctionButtonContainer onClick={onNewsClose}>
        닫기
      </FunctionButtonContainer>
    </MethodButtonTop>
  );

  const [topicState, setTopicState] = useState(null);
  const [hdpResponse, refetchHdp] = useAsync(retrieveTopicClusters, []);
  const [topicSearchState, setTopicSearchState] = useState(null);
  const [openTopic, setOpenTopic] = useState(false);

  const onHdp = useCallback(
    (model) => {
      refetchHdp({
        recommendationState: {
          ...majorClusterState,
          query: inputState.query,
          model: model,
        },
        setOutputState: setTopicState,
      });
    },
    [refetchHdp],
  );

  const {
    loading: topicLoading,
    data: topicData,
    error: topicError,
  } = hdpResponse;

  const onTopicSearch = useCallback(
    (words) => {
      const keywords = [];
      const col = inputState.query.split(' ');
      for (let c of col) {
        keywords.push(c);
      }
      for (let i = 0; i < words.length; i++) {
        const obj = words[i];
        const keyword = obj.text; ///////
        if (!keywords.includes(keyword)) keywords.push(keyword);
        if (i === 2) break;
      }
      const query = keywords.join(' ');
      console.log(query); ////////////////////////////
      refetchTopicSearch({
        // inputState: {
        //     ...inputState,
        //     input: query,
        //     sortField: 'score',
        //     sortOrder: 'DESC',
        //     // categoryList: ['경제'], ///////////////////////////////////////////////////////////////////
        // },
        inputState: {
          ...inputState,
          query: query,
          sortField: 'cluster_time',
          sortOrder: 'DESC',
          score: 0.2,
          sizePerPage: 20,
        },
        setOutputState: setTopicSearchState,
      });

      setOpenTopic(true);
    },
    [inputState.query, inputState.from, inputState.to], // word cloud 리 렌더링과 직접적인 영향이 있으니 dependency 주의
  );

  // api - 토픽 검색
  const [topicSearchResponse, refetchTopicSearch] = useAsync(
    retrieveCluster,
    // detectEvent,
    [],
  );

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
          {!newsOpen && (
            <BottomContainer>
              <BottomTop>
                <ButtonContainer
                  selected={tabState.all === true}
                  onClick={() => onSelectTab('all')}
                >
                  <ButtonLabel>뉴스 피드</ButtonLabel>
                </ButtonContainer>

                <ButtonContainer
                  selected={tabState.major === true}
                  onClick={() => onSelectTab('major')}
                >
                  {detectEventLoading && <SpinLoader />}
                  {!detectEventLoading && <ButtonLabel>주요 뉴스</ButtonLabel>}
                </ButtonContainer>

                <ButtonContainer
                  selected={tabState.topic === true}
                  onClick={() => onSelectTab('topic')}
                >
                  {detectEventLoading && <SpinLoader />}
                  {!detectEventLoading && <ButtonLabel>토픽 모델</ButtonLabel>}
                </ButtonContainer>
              </BottomTop>
              <BottomBottom>
                {tabState.all && (
                  <PaginationContent
                    inputState={inputState}
                    setInputState={setInputState}
                    response={clusterSearchResponse}
                    retrieve={retrieveNews}
                    outputState={clusterSearchState}
                    item={clusterItem}
                  />
                )}
                {tabState.major && (
                  <MajorClusterSimulatiron
                    inputState={inputState}
                    setInputState={setInputState}
                    majorClusterLoading={detectEventLoading}
                    majorClusterState={majorClusterState}
                    item={clusterItem}
                  ></MajorClusterSimulatiron>
                )}
                {tabState.topic && !openTopic && (
                  <WordCloud
                    // onClose={onClose}
                    topicLoading={topicLoading}
                    topicState={topicState}
                    onTopicClick={onTopicSearch}
                  />
                )}
                {tabState.topic && openTopic && (
                  // <SearchResultContainer>
                  //   {/* <div>asdf</div> */}

                  // </SearchResultContainer>
                  <SearchResultContainer>
                    <SubBottomTop>
                      <IconLabel onClick={() => setOpenTopic(false)}>
                        <BsFillBackspaceFill />
                      </IconLabel>
                    </SubBottomTop>
                    <BottomBottom>
                      <SearchResult
                        onNewsClick={onNewsClick}
                        searchState={topicSearchState}
                      />
                    </BottomBottom>
                  </SearchResultContainer>
                )}
              </BottomBottom>
            </BottomContainer>
          )}

          {newsOpen && leftItem && (
            <ArticleContainer>
              <NewsClusterArticle
                item={leftItem}
                headerComponents={rightHeaderComponents}
              />
            </ArticleContainer>
          )}
        </Bottom>
      </Left>
    </Container>
  );
}

export default Realization;

import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import styled from 'styled-components';
import defaultStyle from '../../../style';
import SpinLoader from '../../common-components/SpinLoader';

const CloseButtonTop = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 60px;
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

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: center;
  /* align-items: flex-start; */
  /* padding: 10px 10px; */

  width: 100%;
  height: 100%;
  background: white;

  overflow-y: scroll;
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

const WordCloudContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  /* background: ${defaultStyle.color0}; */
  /* margin: 10px; */
  border: 1px solid ${defaultStyle.color0};

  opacity: 0.5;

  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  margin: 10px;
`;

const WordCloud = React.memo(function WordCloud({
  topicLoading,
  topicState,
  onTopicClick,
}) {
  return (
    <ResultContainer>
      {topicLoading && (
        <SpinnerContainer>
          <SpinLoader />
        </SpinnerContainer>
      )}
      {!topicLoading &&
        topicState &&
        topicState.data.map((e, index) => {
          return (
            <WordCloudContainer
              key={index}
              onClick={() => onTopicClick(e.words)}
            >
              <ReactWordcloud
                maxWords={10}
                size={[300, 300]}
                options={{
                  fontSizes: [10, 30],
                  deterministic: true,
                  rotations: 0,
                }}
                words={e.words}
              />
            </WordCloudContainer>
          );
        })}
      {/* {!hdpLoading && (
    <TopicWordCloud
        hdpResponse={hdpResponse}
        hdpState={hdpState}
        onClose={onClose}
        // onTopicSearch={onTopicSearch}
        inputState={inputState}
        retrieveCluster={retrieveCluster}
        setTopicSearchState={setTopicSearchState}
    />
)} */}
    </ResultContainer>
  );
});

export default React.memo(WordCloud);

import React from 'react';
import styled from 'styled-components';
import defaultStyle from '../../../style';
import SummaryRealization from './SummaryRealization';

const SummaryContainer = styled.div`
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

const PhraseSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  /* min-height: 200px; */

  border: 1px solid grey;
  border-radius: 8px;
  margin-bottom: 4px;
`;

const TitleSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  min-height: 120px;

  border: 1px solid grey;
  border-radius: 8px;
  margin-bottom: 4px;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 20px;

  background: ${defaultStyle.color1};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  color: white;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 10px;
`;

const SingleSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 1px solid grey;
  border-radius: 8px;

  margin-bottom: 4px;
`;
const MultiSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 1px solid grey;
  border-radius: 8px;

  /* margin-bottom: 8px; */
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const AbsTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 40px;

  color: white;
  background-color: ${defaultStyle.color3};

  border-radius: 50px;
  margin-right: 8px;
  opacity: 0.6;

  font-size: 0.8rem;
`;

const Text = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* height: 100%; */
  width: 100%;
`;

const RealizationResult = React.memo(function RealizationResult({
  generatedTitleState,
  singleSumLoading,
  singleSumState,
  multiSumLoading,
  multiSumState,
  phraseLoading,
  phraseState,
  phraseOption,
}) {
  console.log(phraseOption); /////////
  return (
    <SummaryContainer>
      <PhraseSummaryContainer>
        <Tag>주요 Phrase</Tag>
        {phraseState && (
          <TitleContainer>
            {phraseState[phraseOption].map((e, index) => {
              return <div key={index}>{e.text}</div>;
            })}
          </TitleContainer>
        )}
      </PhraseSummaryContainer>
      <TitleSummaryContainer>
        <Tag>BART 제목 생성</Tag>
      </TitleSummaryContainer>

      <SingleSummaryContainer>
        <Tag>단일 문서 추출 요약</Tag>
        {/* {singleSumState && (
                    <SummaryRealization
                        obj={inputState}
                        response={singleSumState}
                        lang={'ko'}
                        generateAbs={generateAbs}
                    ></SummaryRealization>
                )} */}
        <SummaryRealization
          loading={singleSumLoading}
          sumState={singleSumState}
        ></SummaryRealization>
      </SingleSummaryContainer>
      <MultiSummaryContainer>
        <Tag>다중 문서 추출 요약</Tag>
        {/* {multiSumState && (
                    <SummaryRealization
                        obj={inputState}
                        response={multiSumState}
                        lang={'ko'}
                        generateAbs={generateAbs}
                    ></SummaryRealization>
                )} */}
        <SummaryRealization
          loading={multiSumLoading}
          sumState={multiSumState}
        ></SummaryRealization>
      </MultiSummaryContainer>
    </SummaryContainer>
  );
});

export default React.memo(RealizationResult);

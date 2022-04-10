import React, { useCallback, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import defaultStyle from '../../../style';
import CustomButton from '../../common-components/CustomButton';
import { ResultContainer } from '../../common-components/Layout';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const MethodButtonTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const MethodButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  height: 30px;

  border-radius: 4px;

  background: ${defaultStyle.color4};

  font-size: 0.8rem;

  margin-left: 10px;
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

const ApprochOptionDropdownButton = styled(CustomButton)`
  width: 120px;
  height: 34px;
  background: ${defaultStyle.color1};
  color: white;

  font-size: 1rem;
`;

const approachList = [
  { text: 'Datewise', name: 'approach', value: { approach: 'datewise' } },
  { text: 'Burstiness', name: 'approach', value: { approach: 'burstiness' } },
];

// defaut text
const labelState = {
  approach: approachList[0].text,
};

function MajorClusterSimulatiron({
  inputState,
  setInputState,
  majorClusterLoading,
  majorClusterState,
  // onNewsClick,
  // onClusterClick,
  item,
}) {
  const [label, setLabel] = useState(labelState);

  const onSelect = useCallback(
    (text, attrName, val) => {
      // console.log(text); ///////
      // console.log(attrName); ///////////
      // console.log(val); /////////////////////////////
      setLabel({ ...label, [attrName]: text });
      if (text === 'Burstiness') {
        setInputState({ ...inputState, timeAggs: false });
      } else {
        setInputState({ ...inputState, timeAggs: true });
      }
      // setInputState({ ...inputState, ...val });
    },
    [inputState, label, setInputState],
  );

  const [extendIndex2, setExtendIndex2] = useState(-1);
  const onExtend2 = useCallback(
    (index) => {
      if (extendIndex2 !== -1) {
        setExtendIndex2(-1);
      } else {
        setExtendIndex2(index);
      }
    },
    [extendIndex2],
  );

  return (
    <Container>
      {/* <MethodButtonTop>
                <DropDown
                    as={ApprochOptionDropdownButton}
                    label={label.approach}
                    items={approachList}
                    onItemSelect={onSelect}
                />
            </MethodButtonTop> */}
      {majorClusterLoading && (
        <SpinnerContainer>
          <Spinner animation="grow" />
        </SpinnerContainer>
      )}
      {!majorClusterLoading && (
        <ResultContainer>
          {/* <div>입력 기간 내 Datewise Top 200 기준 (디폴트) </div>
                    <div>입력 기간 내 상위 200개 클러스터 기준 (옵션)</div> */}
          {majorClusterState &&
            majorClusterState.source.map((obj, index) => {
              // return (
              //     <ClusterItem
              //         obj={obj}
              //         key={index}
              //         index={index}
              //         extendIndex={extendIndex2}
              //         onExtend={onExtend2}
              //         onNewsClick={onNewsClick}
              //         onClusterClick={() => onClusterClick(obj)}
              //     />
              // );
              return item(obj, index);
            })}
        </ResultContainer>
      )}
    </Container>
  );
}

export default MajorClusterSimulatiron;

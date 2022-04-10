import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../../style';
import { ResultContainer } from '../../common-components/Layout';
import SpinLoader from '../../common-components/SpinLoader';
import ClusterItem from '../common/ClusterItem';

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

const SimilarityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 20px;
`;

const Similarity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 1px solid ${defaultStyle.color4};
  /* color: white; */
  border-radius: 4px;

  margin-left: 20px;
`;

const SpinLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const SearchResult = React.memo(function SearchResult({
  searchState,
  onNewsClick,
}) {
  const [extendIndex3, setExtendIndex3] = useState(-1);
  const onExtend3 = useCallback(
    (index) => {
      if (extendIndex3 !== -1) {
        setExtendIndex3(-1);
      } else {
        setExtendIndex3(index);
      }
    },
    [extendIndex3],
  );

  return (
    <ResultContainer>
      {!searchState && (
        <SpinLoaderContainer>
          <SpinLoader />
        </SpinLoaderContainer>
      )}
      {searchState &&
        searchState.source.map((obj, index) => {
          return (
            <ItemContainer key={index}>
              <ClusterItem
                obj={obj}
                key={index}
                index={index}
                extendIndex={extendIndex3}
                onExtend={onExtend3}
                onNewsClick={onNewsClick}
              />
              <SimilarityContainer>
                {obj.salience && (
                  <Similarity>{obj.salience.toFixed(4)}</Similarity>
                )}
              </SimilarityContainer>
            </ItemContainer>
          );
        })}
    </ResultContainer>
  );
});

export default React.memo(SearchResult);

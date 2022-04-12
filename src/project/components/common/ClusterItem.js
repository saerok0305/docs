import React from 'react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import styled, { css } from 'styled-components';
import defaultStyle from '../../../style';
import NewsItem from './NewsItem';
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100%; */
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 60px);
  /* width: 300px; */
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;

  &:hover {
    opacity: 0.5;
    color: white;
    cursor: pointer;
  }
`;

const MainNews = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* position: relative; */

  &:hover {
    background: ${defaultStyle.color0};
    cursor: pointer;
  }

  /* ${(props) =>
    props.extend &&
    css`
      background: ${defaultStyle.color0};
    `} */
`;

const SubNews = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-left: 20px solid ${defaultStyle.color0};
  /* height: 400px; */

  /* position: relative; */
  /* background: ${defaultStyle.color4}; */
  /* top: 400px; */
  /* left: 0; */
`;

const ExtendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 8px; */
  background: ${defaultStyle.color0};
  color: ${defaultStyle.color1};
  border-radius: 10px;
  user-select: none;

  height: 22px;
  width: 50px;

  &:hover {
    background: ${defaultStyle.color1};
    opacity: 0.5;
    color: white;
    cursor: pointer;
  }
  ${(props) =>
    props.extend === true &&
    css`
      background: ${defaultStyle.color0};
      opacity: 0.5;
      color: ${defaultStyle.color1};
      border: 1px solid ${defaultStyle.color1}; ;
    `}
`;

const EmptyExtendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 8px; */
  border-radius: 10px;
  user-select: none;

  height: 22px;
  width: 50px;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
`;
const Extend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  margin-left: 4px;
`;

const ClusterItem = React.memo(function ClusterItem({
  obj,
  index,
  extendIndex,
  onExtend,
  onNewsClick,
  onClusterClick,
  onSum,
  onAbsSum,
}) {
  let count = 0;
  if (obj.sub_news_list) count = obj.sub_news_list.length;
  return (
    <ItemContainer
      key={index}
      onClick={onClusterClick && (() => onClusterClick(obj))}
    >
      <MainNews extend={extendIndex && extendIndex === index}>
        <LeftContainer>
          {/* <ClusterItem
                    cluster={obj}
                    onNewsClick={onNewsClick}
                    extend={extendIndex === index}
                /> */}
          <NewsItem
            key={index}
            obj={obj.main_news}
            onNewsClick={() => onNewsClick(obj.main_news)}
          />
        </LeftContainer>
        <RightContainer onClick={() => onExtend(index)}>
          {onExtend && count > 0 && (
            <ExtendContainer key={index} extend={extendIndex === index}>
              <Count>+{count}</Count>
              <Extend>
                {extendIndex !== index && <FiPlusCircle />}
                {extendIndex === index && <FiMinusCircle />}
              </Extend>
            </ExtendContainer>
          )}

          {onExtend && count === 0 && <EmptyExtendContainer />}
        </RightContainer>

        {/* {onSum && (
                    <FunctionContainer>
                        <MethodButtonContainer
                            onClick={() => onSum({ ...obj, sub_news_list: [] })}
                        >
                            단일문서요약
                        </MethodButtonContainer>
                        {count > 0 && (
                            <MethodButtonContainer onClick={() => onSum(obj)}>
                                다중문서요약
                            </MethodButtonContainer>
                        )}
                        {onAbsSum && (
                            <MethodButtonContainer
                                onClick={() => onAbsSum(obj)}
                            >
                                제목생성
                            </MethodButtonContainer>
                        )}
                    </FunctionContainer>
                )} */}
      </MainNews>
      <SubNews>
        {onExtend &&
          extendIndex === index &&
          obj.sub_news_list.map((subItem, subIndex) => (
            <NewsItem
              key={index + '-' + subIndex}
              obj={subItem}
              onNewsClick={() => onNewsClick(subItem)}
            />
          ))}
      </SubNews>
    </ItemContainer>
  );
});

export default React.memo(ClusterItem);

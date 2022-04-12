import React from 'react';
import styled, { css } from 'styled-components';
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';
import defaultStyle from '../../../style';

const RelatedKeywordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Block = styled.div`
  background: white;
  display: flex;
  border: 1px solid ${defaultStyle.color1};

  border-radius: 4px;

  ${(props) =>
    props.id !== 0 &&
    css`
      border-top: none;
    `};
`;
const DateBlock = styled.div`
  padding: 4px 12px;
  width: 90px;

  ${(props) =>
    props.selected &&
    css`
      background: ${defaultStyle.color1};
      color: white;
    `}

  font-size: 1rem;
`;
const TextBlock = styled.div`
  width: 140px;
  font-size: 1rem;
`;

const TextContainer = styled.div`
  padding: 4px 8px;
  width: 100%;
  &:hover {
    background: ${defaultStyle.color1};
    color: white;
    cursor: pointer;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
`;

const Extend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;

  padding: 10px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    background: ${defaultStyle.color1};
    color: white;
  }
`;

function RelatedKeywords({
  relatedKeywordsData,
  id,
  setId,
  setDate,
  onSelect,
}) {
  const onIdSelect = (selectedId, selectedDate) => {
    setDate(selectedDate);
    if (id !== selectedId) setId(selectedId);
    else setId(-1);
  };

  console.log(relatedKeywordsData); /////

  return (
    <RelatedKeywordsContainer>
      {relatedKeywordsData &&
        relatedKeywordsData.map((obj, dId) => (
          <Block key={dId} id={dId}>
            <DateBlock selected={id === dId}>
              {/* {dId === 0 ? '기준일' : dId === 1 ? '7일 전' : '14일 전'} */}
              {obj.date}
            </DateBlock>
            <TextBlock>
              {obj.candidates.map((e, rkId) => (
                <TextContainer key={rkId} onClick={() => onSelect(e)}>
                  {e}
                </TextContainer>
              ))}
            </TextBlock>
            {/* <ButtonBlock
                            key={dId}
                            onClick={() => {
                                onIdSelect(obj.id, obj.date);
                            }}
                        >
                            <Extend>
                                {id !== obj.id && <FiPlusCircle />}
                                {id === obj.id && <FiMinusCircle />}
                            </Extend>
                        </ButtonBlock> */}
          </Block>
        ))}
    </RelatedKeywordsContainer>
  );
}

export default RelatedKeywords;

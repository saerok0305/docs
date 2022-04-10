import React, { useState } from 'react';
import styled from 'styled-components';
import { FiCheck } from 'react-icons/fi';
import defaultStyle from '../../../style';
import CustomButton from '../CustomButton';

const CheckBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CheckBoxButton = styled(CustomButton)`
  width: 100px;
  background: ${defaultStyle.color1};
  opacity: 0.2;

  color: white;
  font-size: 0.8rem;

  &:hover {
    opacity: 0.7;
    /* border: 1px solid ${defaultStyle.color1}; */
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &.active {
    opacity: 0.5;
  }
  &.active:hover {
    opacity: 0.7;
  }

  margin: 4px;
  border-radius: 8px;
`;

function CheckBox({ items, onClick }) {
  return (
    <CheckBoxContainer>
      {items.map((item) => (
        <CheckBoxButton
          key={item.name}
          onClick={(e) => onClick(item.name, e)}
          className={item.active && 'active'}
        >
          {item.text}
          {item.active && <FiCheck />}
        </CheckBoxButton>
      ))}
    </CheckBoxContainer>
  );
}

export default CheckBox;

CheckBox.defaultProps = {
  items: [
    { name: '경제', text: '경제', active: true },
    { name: '사회', text: '사회', active: true },
    { name: '정치', text: '정치', active: true },
    { name: 'IT/과학', text: 'IT/과학', active: true },
    { name: '세계', text: '세계', active: true },
    { name: '생활/문화', text: '생활/문화', active: true },
    { name: '스포츠', text: '스포츠', active: true },
  ],
};

import React from 'react';
import styled from 'styled-components';
import defaultStyle from '../../style';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  display: block;
  /* padding: 8px; */
  /* border-radius: 4px; */
  border: 1px solid black;
  width: 100%;
  outline: none;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    /* box-shadow: inset 0 0 0 0.2rem #ffec99; */
    box-shadow: inset 0 0 0 0.05rem ${defaultStyle.color1};
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 4px;

  display: flex;
  align-items: center;
  z-index: 1;
`;

const CustomInput = React.forwardRef((props, ref) => {
  const Icon = props.icon;
  return (
    <Container>
      <Input {...props} ref={ref} />
      <IconContainer>{props.icon && <Icon />}</IconContainer>
    </Container>
  );
});

export default CustomInput;

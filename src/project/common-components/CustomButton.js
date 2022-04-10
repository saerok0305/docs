import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 30px;
  width: 80px;

  border: 1px solid black;

  font-weight: 400;
  text-align: center;

  font-size: 1rem;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
    // box-shadow: inset 0 0 0 0.2rem #ffec99;
  }

  &:focus:active {
    outline: none;
    box-shadow: inset 0 0 0 0.1rem #ffec99;
  }

  &:hover {
    opacity: 0.5;
  }
`;

// function CustomButton(props) {
//     return (
//         <StyledButton
//             theme={props.theme}
//             className={props.className}
//             onClick={props.onClick}
//         >
//             {props.children}
//         </StyledButton>
//     );
// }

const CustomButton = React.forwardRef((props, ref) => {
  return (
    <StyledButton
      ref={ref}
      theme={props.theme}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButton>
  );
});

export default CustomButton;

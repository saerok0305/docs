import React, { useEffect, useRef, useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import styled from "styled-components";
import CustomButton from "./CustomButton";

CustomDropDown.defaultProps = {
  items: [{ text: "제목", name: "target", value: "ASC" }],
  as: CustomButton,
};

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DropDownMenuContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  min-width: 100px;
  padding: 2px;

  background: white;
  border: 1px solid black;
  // opacity: 0.4;
  border-radius: 4px;
  margin-top: 4px;

  z-index: 1;
`;

const DropDownMenu = styled.div`
  padding-left: 10px;
  cursor: pointer;
  /* border-radius: 4px; */
  color: black;
  &:hover {
    opacity: 0.5;
    background: grey;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 100%;
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100% - 20px);
  height: 100%;
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 20px;
  height: 100%;
`;

function CustomDropDown({ as, items, onSelect }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState();

  const [label, setLabel] = useState(items[0].text);

  if (!onSelect) {
    onSelect = () => {
      console.log("onSelect not implemented ... for an action");
    };
  }
  const SearchOptionDropdownButton = as;

  useEffect(() => {
    setHeight(ref.current.clientHeight);
    setWidth(ref.current.clientWidth);
  }, []);

  const onClick = (e) => {
    setOpen(!open);
  };

  const onMenuSelect = (text, name, value) => {
    onSelect(text, name, value); // <- props.onSelect
    setOpen(!open);
    setName(name);
    setLabel(text);
  };
  // };

  return (
    <DropDownContainer ref={ref}>
      <SearchOptionDropdownButton onClick={onClick}>
        <ButtonContainer>
          <TextContainer>{label}</TextContainer>

          <IconContainer>
            <BsFillCaretDownFill />
          </IconContainer>
        </ButtonContainer>
      </SearchOptionDropdownButton>
      {open && (
        <DropDownMenuContainer top={height}>
          {items.map((opt) => (
            <DropDownMenu
              key={opt.text}
              name={opt.name}
              onClick={() => onMenuSelect(opt.text, opt.name, opt.value)}
            >
              {opt.text}
            </DropDownMenu>
          ))}
        </DropDownMenuContainer>
      )}
    </DropDownContainer>
  );
}

export default CustomDropDown;

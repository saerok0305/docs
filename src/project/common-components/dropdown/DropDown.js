import React, { useEffect, useRef, useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import styled, { css } from "styled-components";
import defaultStyle from "../../../style";
import CustomButton from "../CustomButton";

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  position: relative;
  user-select: none;
  margin: 4px;
`;

const DropDownMenuContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  min-width: 120px;
  /* width: 100%; */
  ${(props) =>
    props.dropDownWidth &&
    css`
      width: ${props.dropDownWidth}px;
    `}
  padding: 8px;

  background: ${defaultStyle.color1};
  // opacity: 0.4;
  /* border-radius: 4px; */
  margin-top: 4px;

  z-index: 2;

  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: center; */
  /* align-items: flex-start; */
  /* padding: 10px 10px; */

  max-height: 600px;

  overflow-y: overlay;
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

const DropDownMenu = styled.div`
  padding-left: 10px;
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background: ${defaultStyle.color5};
    color: black;
  }
  color: white;
`;

function DropDown({ as, label, items, onItemSelect, dropDownWidth }) {
  const SearchOptionDropdownButton = as;

  const ref = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(false);
  // const [name, setName] = useState();

  useEffect(() => {
    setHeight(ref.current.clientHeight);
    setWidth(ref.current.clientWidth);
  }, []);

  const onClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const onMenuSelect2 = (text, name, value, e) => {
    e.stopPropagation();
    console.log(text); ////////
    console.log(name); //////
    console.log(value); ////
    onItemSelect(text, name, value); // <- props.onSelect
    setOpen(!open);
    // setName(text);
  };

  return (
    <DropDownContainer ref={ref}>
      <SearchOptionDropdownButton onClick={onClick}>
        {label}
        <BsFillCaretDownFill />
      </SearchOptionDropdownButton>
      {open && (
        <DropDownMenuContainer top={height} dropDownWidth={dropDownWidth}>
          {items.map((opt) => (
            <DropDownMenu
              key={opt.text}
              name={opt.name}
              // onClick={() =>
              //     onMenuSelect(opt.text, opt.name, opt.value)
              // }
              onClick={(e) => onMenuSelect2(opt.text, opt.name, opt.value, e)}
            >
              {opt.text}
            </DropDownMenu>
          ))}
        </DropDownMenuContainer>
      )}
    </DropDownContainer>
  );
}

export default DropDown;

DropDown.defaultProps = {
  items: [
    { text: "과거순", name: "sortOrder", value: "ASC" },
    { text: "최신순", name: "sortOrder", value: "DESC" },
  ],
  as: CustomButton,
};

import React, { useState } from 'react';
import styled from 'styled-components';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import defaultStyle from '../../../style';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-evenly;
`;

const ControlContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70px;
`;
const TextContainer = styled.div`
    font-size: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    border: 1px solid white;
    cursor: pointer;
    width: 30px;
    height: 20px;
    border-radius: 4px;
    margin: 0 2px;
    &:hover {
        background: ${defaultStyle.backgroundColor2};
        color: white;
    }
`;

function CustomCalendarHeader({
    date,
    decreaseYear,
    increaseYear,
    decreaseMonth,
    increaseMonth,
    // prevMonthButtonDisabled,
    // nextMonthButtonDisabled,
    // decreaseMonth,
    // increaseMonth,
}) {
    // console.log(date); /////////////////////////////////
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    // console.log(year + ' : ' + month); ///

    return (
        <HeaderContainer>
            <ControlContainer>
                <TextContainer>{year}년</TextContainer>
                <ButtonContainer>
                    <Button onClick={decreaseYear}>
                        <BsFillCaretLeftFill />
                    </Button>
                    <Button onClick={increaseYear}>
                        <BsFillCaretRightFill />
                    </Button>
                </ButtonContainer>
            </ControlContainer>
            <ControlContainer>
                <TextContainer>{month}월</TextContainer>
                <ButtonContainer>
                    <Button onClick={decreaseMonth}>
                        <BsFillCaretLeftFill />
                    </Button>
                    <Button onClick={increaseMonth}>
                        <BsFillCaretRightFill />
                    </Button>
                </ButtonContainer>
            </ControlContainer>
        </HeaderContainer>
    );
}

export default CustomCalendarHeader;

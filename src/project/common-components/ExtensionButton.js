import React from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';
import { FiArrowDownCircle } from 'react-icons/fi';
import styled, { css } from 'styled-components';
import defaultStyle from '../../style';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    // blur
    position: relative;
    z-index: 10;

    width: 40px;
    height: 40px;
    /* margin: 0 5px; */

    color: ${defaultStyle.color2};
    background: ${defaultStyle.color1};
    /* border-radius: 50%; */
    /* border-top-right-radius: 4px; */
    /* border-bottom-right-radius: 4px; */
    transform: rotateX(0deg);
    font-size: 1.4rem;
    padding-left: 4px;
    padding-right: 4px;

    transition: all 0.125s ease-in;

    ${(props) =>
        props.open &&
        css`
            transform: rotateX(180deg);
            background: ${defaultStyle.color2};
            color: black;
        `}

    &:hover {
        opacity: 0.5;
    }
    cursor: pointer;
`;

function ExtensionButton({ open, onClick }) {
    return (
        <Container open={open} onClick={onClick}>
            <FiArrowDownCircle />
        </Container>
    );
}

export default ExtensionButton;

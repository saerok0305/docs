import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { BsArrow90DegLeft } from 'react-icons/bs';
import defaultStyle from '../../../style';

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 24px;
    height: 24px;

    border-radius: 50%;

    &:hover {
        background: ${defaultStyle.color1};
        cursor: pointer;
        color: white;
        opacity: 0.5;
    }

    &.active {
        background: ${defaultStyle.color1};
        color: white;
    }

    user-select: none;

    font-size: 1rem;
`;

function PageButton({ children, ...props }) {
    return <PageContainer {...props}>{children}</PageContainer>;
}

export default PageButton;

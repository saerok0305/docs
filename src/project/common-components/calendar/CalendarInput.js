import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { AiOutlineCalendar } from 'react-icons/ai';

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    /* height: 40px; */
    height: 100%;
`;

const IconContainer = styled.div`
    position: absolute;
    right: 4px;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
`;

const CalendarInput = React.forwardRef((props, ref) => {
    const ThisInput = props.customInput;
    const iconOption = props.ic;

    return (
        <Container>
            <ThisInput {...props} ref={ref} />
            {iconOption && (
                <IconContainer>
                    <AiOutlineCalendar />
                </IconContainer>
            )}
        </Container>
    );
});

export default CalendarInput;

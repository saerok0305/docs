import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../../style';
import SpinLoader from '../../common-components/SpinLoader';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 100%;

    margin-left: 4px;
`;

const MethodButtonTop = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`;

const FunctionButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100px;
    height: 30px;

    border-radius: 4px;

    background: ${defaultStyle.color1};

    font-size: 0.8rem;

    margin-right: 10px;
    /* margin-bottom: 10px; */
    color: white;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const PhraseResult = React.memo(function PhraseResult({
    loading,
    phraseOption,
    state,
    setPhraseOpen,
}) {
    const onClose = () => {
        setPhraseOpen(false);
    };
    console.log(state); ///////
    return (
        <Container>
            <MethodButtonTop>
                <FunctionButtonContainer onClick={onClose}>
                    닫기
                </FunctionButtonContainer>
            </MethodButtonTop>

            {loading && (
                <SpinnerContainer>
                    <SpinLoader />
                </SpinnerContainer>
            )}
            {!loading && state && state[phraseOption].map((e) => <div>{e.text}</div>)}
        </Container>
    );
});

export default React.memo(PhraseResult);

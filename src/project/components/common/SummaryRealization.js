import React, { useEffect, useMemo, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import useAsync from '../../../hooks/useAsync';
import defaultStyle from '../../../style';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    height: 100%;

    padding: 10px;
`;

const SummaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 100%; */
    /* justify-content: center; */
    /* align-items: center; */

    margin-bottom: 10px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
`;

const Summary = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 100%; */
    /* justify-content: center; */
    /* align-items: center; */

    margin-bottom: 10px;
`;

const ExtractiveSummary = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 50px;
`;
const AbstractiveSummary = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 50px;
`;

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const ExTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 40px;

    color: white;
    background-color: ${defaultStyle.color3};

    border-radius: 50px;
    margin-right: 8px;

    font-size: 0.8rem;
`;

const AbsTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 40px;

    color: white;
    background-color: ${defaultStyle.color3};

    border-radius: 50px;
    margin-right: 8px;
    opacity: 0.6;

    font-size: 0.8rem;
`;

const Text = styled.div`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    /* height: 100%; */
    width: 100%;
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

function SummaryRealization({ loading, sumState }) {

    const summary = [];
    const sents = [];
    const sentences = [];
    const sentences_pos_tagged = [];
    const sentences_ne_tagged = [];
    if (sumState) {
        sumState.summary.forEach((e) => {
            const analysis = {
                rank: e.rank,
                text: e.text,
                local_salience: e.local_salience,
                global_salience: e.global_salience,
            };
            summary.push(analysis);
            sents.push(e.text);

            // style transfer
            sentences.push(e.text); /////////////////////////
            //sentences_pos_tagged.push(e.pos); /////////////////////////
            //sentences_ne_tagged.push(e.ne); /////////////////////////
        });
    }

    

    return (
        <Container>
            {/* {summary &&
                summary.map((obj, index) => {
                    return (
                        <Summary key={index}>
                            <ExtractiveSummary>
                                {loading && (
                                    <SpinnerContainer>
                                        <Spinner animation="grow" />
                                    </SpinnerContainer>
                                )}
                                {!loading && (
                                    <TextContainer>
                                        <ExTag>추출</ExTag>
                                        <Text>{obj.text}</Text>
                                    </TextContainer>
                                )}
                            </ExtractiveSummary>
                            <AbstractiveSummary>
                                {absLoading && (
                                    <SpinnerContainer>
                                        <Spinner animation="grow" />
                                    </SpinnerContainer>
                                )}
                                {!absLoading &&
                                    absData &&
                                    absData[index] &&
                                    absData[index].map((e, index2) => (
                                        <TextContainer
                                            key={index + '-' + index2}
                                        >
                                            <AbsTag>추상V{index2 + 1}</AbsTag>
                                            <Text>{e}</Text>
                                        </TextContainer>
                                    ))}
                            </AbstractiveSummary>
                        </Summary>
                    );
                })} */}
            <SummaryContainer>
                {summary &&
                    summary.map((obj, index) => {
                        return (
                            <Summary key={index}>
                                <ExtractiveSummary>
                                    {loading && (
                                        <SpinnerContainer>
                                            <Spinner animation="grow" />
                                        </SpinnerContainer>
                                    )}
                                    {!loading && (
                                        <TextContainer>
                                            <ExTag>추출</ExTag>
                                            <Text>{obj.text}</Text>
                                        </TextContainer>
                                    )}
                                </ExtractiveSummary>
                            </Summary>
                        );
                    })}
            </SummaryContainer>
        </Container>
    );
}

export default SummaryRealization;

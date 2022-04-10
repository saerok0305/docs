import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
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

const Summary = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 100%; */
    /* justify-content: center; */
    /* align-items: center; */

    margin-bottom: 10px;
`;

const Analysis = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;
`;
const Rank = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 20px;
    height: 20px;
    background-color: ${defaultStyle.color4};
    color: white;
    border-radius: 50%;
`;
const Salience = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 60px;
    height: 20px;

    border: 1px solid ${defaultStyle.color4};
    /* color: white; */
    border-radius: 4px;

    margin-left: 20px;
`;

const Text = styled.div`
    ${(props) =>
        props.highlight &&
        css`
            font-weight: 900;
            /* color: red; */
            /* background-color: #ffbb00; */
            background-color: #abf200;
        `}
`;

function SummaryTest({ obj, response }) {
    // const {
    //     loading: textrankLoading,
    //     data: textrankData,
    //     error: textrankError,
    // } = response;

    let salienceLoading = null;
    let salienceData = null;
    let salienceError = null;
    if(response) {
        salienceLoading = response.loading;
        salienceData = response.data;
        salienceError = response.error;
    }

    const [summary, setSummary] = useState(null);
    useEffect(() => {
        setSummary(null);
    }, [obj]);
    useEffect(() => {
        if (salienceData) {
            const newSummary = salienceData.summary.map((e) => {
                const analysis = {
                    rank: e.rank,
                    text: e.text,
                    local_salience: e.local_salience,
                    global_salience: e.global_salience,
                };
                return analysis;
            });
            setSummary(newSummary);
        }
    }, [response]);

    return (
        <Container>
            {summary &&
                summary.map((obj, index) => {
                    return (
                        <Summary key={index}>
                            <Analysis>
                                <Rank>{obj.rank}</Rank>
                                <Salience>
                                    {obj.local_salience.toFixed(4)}
                                </Salience>
                            </Analysis>

                            <Text>{obj.text}</Text>
                        </Summary>
                    );
                })}
        </Container>
    );
}

export default SummaryTest;

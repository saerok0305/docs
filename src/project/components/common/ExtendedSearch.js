import React, { useState } from 'react';
import styled from 'styled-components';
import defaultStyle from '../../../style';
import RelatedKeywords from './RelatedKeywords';
const Container = styled.div`
    display: flex;
    z-index: 100;
`;
const ExtendedLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 540px;

    flex: 1;
    overflow-y: scroll;
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
        background: ${defaultStyle.color1};
        border: none;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    border-radius: 4px;
    border: 1px solid white;
    background: white;
`;
const ExtendedRight = styled.div`
    margin-left: 10px;
    position: relative;

    border-radius: 4px;
    border: 1px solid white;
    background: white;
`;

function ExtendedSearch({
    onSelect,
    relatedKeywordsData,
}) {
    const [id, setId] = useState(-1);
    const [date, setDate] = useState();

    const idKeywords = new Map();
    if (relatedKeywordsData) {
        for (let dId = 0; dId < relatedKeywordsData.length; dId++) {
            let obj = relatedKeywordsData[dId];
            const keywords = new Set();
            for (let rkId = 0; rkId < obj.candidates.length; rkId++) {
                let es = obj.candidates[rkId].split(' ');
                for (let e of es) {
                    keywords.add(e);
                }
            }
            idKeywords.set(dId, [...keywords]);
        }
    }

    return (
        <Container>
            {relatedKeywordsData && (
                <ExtendedLeft>
                    <RelatedKeywords
                        relatedKeywordsData={relatedKeywordsData}
                        id={id}
                        setId={setId}
                        setDate={setDate}
                        onSelect={onSelect}
                    />
                </ExtendedLeft>
            )}
        </Container>
    );
}

export default ExtendedSearch;

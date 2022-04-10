import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import LongPages from './LongPages';
import ShortPages from './ShortPages';

// config
const window = 5;

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 100%;
`;
const GoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
    width: 80px;
    margin-left: 10px;
`;

const InputPage = styled(CustomInput)`
    height: 100%;
    width: 50px;
    /* border-radius: 8px; */
    text-align: center;
`;

const GoButton = styled(CustomButton)`
    width: 30px;
    height: 100%;
    background: white;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-left: none;
`;

function Pagenation({ currPage, totalPages, toPage, toLeft, toRight }) {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1);
    }

    const [inputs, setInputs] = useState({
        input_page: 1,
    });

    const { input_page } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        console.log(e.target); ///////
        let pageValue = 1;
        if (value !== '') {
            pageValue = parseInt(value);
            if (pageValue > totalPages) {
                pageValue = totalPages;
            }
        }
        setInputs({
            ...inputs,
            [name]: pageValue,
        });
    };

    return (
        <PageContainer>
            {pages.length > window + 2 ? (
                <LongPages
                    currPage={currPage}
                    pages={pages}
                    toPage={toPage}
                    toLeft={toLeft}
                    toRight={toRight}
                />
            ) : (
                <ShortPages
                    currPage={currPage}
                    pages={pages}
                    toPage={toPage}
                    toLeft={toLeft}
                    toRight={toRight}
                />
            )}
            {/* <GoContainer>
                <InputPage
                    name="input_page"
                    value={input_page}
                    // onClick={(e) => e.stopPropagation()}
                    onChange={onChange}
                />
                <GoButton onClick={(e) => toPage(input_page, e)}>GO</GoButton>
            </GoContainer> */}
        </PageContainer>
    );
}

export default Pagenation;

import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { debounce } from 'lodash';
import CustomInput from '../../common-components/CustomInput';
import defaultStyle from '../../../style';
import CustomButton from '../../common-components/CustomButton';
import useAsync from '../../../hooks/useAsync';
import retrieveRelatedKeywords from '../../../api/RelatedKeywordsApi';
import useDidMountEffect from '../../../hooks/CustomEffect';
import ExtendedSearch from './ExtendedSearch';

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

const SearchInput = styled(CustomInput)`
  height: 40px;
  /* min-width: 100px; */
  /* width: 70px; */
  /* width: calc(100% - 280px); */
  border-radius: 0;

  border-right-style: none;
  ${(props) =>
    props.relatedKeywordsData &&
    css`
      border-color: ${defaultStyle.color0};
    `}
`;

const ExtendedContainer = styled.div`
  position: absolute;
  top: 48px;
  left: -40px;
  /* z-index: 7; */

  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* background: yellow; */
  /* border: 1px solid ${defaultStyle.borderColor1}; */
  /* border-top: none; */

  ${(props) =>
    !props.open &&
    css`
      display: none;
    `}
`;

// 여기에 선언해야 한다.
// 컴포넌트 안에 선언하면, 객체가 계속 바뀌어 생성되기 때문에...
const debounceSomethingFunc1 = debounce((refetch) => {
  // console.log('called debounceSomethingFunc');
  refetch();
}, 400);

const StrictButton = styled(CustomButton)`
  width: 20px;
  height: 20px;
  background: ${(props) => (props.strict ? `red` : `green`)};
  border-top-left-radius: 4px;
  /* border-bottom-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px; */
  border-radius: 50%;

  // blur
  /* position: relative; */
  /* z-index: 10; */
`;

function ExtendedInput({
  inputState,
  setInputState,
  retrieve, // retrieve(inputState)
  setOutputState,
}) {
  const ref = useRef();
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const query = inputState.query;
  const strict = inputState.strictMode;

  const [relatedKeywordsResponse, refetchRelatedKeywords] = useAsync(
    () => retrieveRelatedKeywords(inputState),
    [],
  );
  const {
    loading: relatedKeywordsLoading,
    data: relatedKeywordsData,
    error: relatedKeywordsError,
  } = relatedKeywordsResponse;

  // 엔터를 누르면 없어져야함 -> false
  // 키를 입력하면 생겨야함 -> true

  // 연관 키워드 노출 조건
  // input에 엠티스트링이 아니어야한다??? 이 조건이 애매함
  // 글자가 있어도 접혀야 하는 조건을 만들어야함
  useDidMountEffect(() => {
    if (query === '') setOpen(false);
    debounceSomethingFunc1(refetchRelatedKeywords);
    // debounceSomethingFunc2(refetchTopics);
  }, [query]);

  useEffect(() => {
    if (inputState.status === -1) {
      setText('');
    }
  }, [inputState]);

  const onDebounceChange = (event) => {
    const { name, value } = event.target;
    // setText(value); ////////////////////////////////////
    setOpen(true);
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      // console.log('enter');
      retrieve(inputState);
      setOpen(false);
    }
  };

  const onClick = () => {
    if (query !== '') {
      setOpen(!open);
    }
  };

  const onSelect = (selectedQuery) => {
    // inputDispatch({
    //   type: 'INIT_INPUT_RETRIEVE',
    //   name: 'query',
    //   value: selectedQuery,
    // });
    // setText(selectedQuery);
    ref.current.value = selectedQuery;
    setOpen(false); // 확장 검색 닫기
    setInputState({ ...inputState, query: selectedQuery, page: 1 });
    retrieve({ ...inputState, query: selectedQuery, page: 1 });

    console.log({ ...inputState, query: selectedQuery, page: 1 }); //////
  };

  return (
    <Container>
      <SearchInput
        name="query"
        placeholder="검색어를 입력하세요"
        onChange={onDebounceChange}
        onKeyPress={onKeyPress}
        onClick={onClick}
        autoComplete="off"
        // icon={() => <StrictButton strict={strict} onClick={onStrictToggle} />}
        // value={text}
        defaultValue={inputState.query}
        ref={ref}
      ></SearchInput>

      <ExtendedContainer open={open}>
        <ExtendedSearch
          onSelect={onSelect}
          relatedKeywordsData={relatedKeywordsData}
        />
      </ExtendedContainer>
    </Container>
  );
}

export default ExtendedInput;

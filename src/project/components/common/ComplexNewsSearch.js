import React, { useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import defaultStyle from '../../../style';
import CustomCalendar from '../../common-components/calendar/CustomCalendar';
import CustomButton from '../../common-components/CustomButton';
import CustomInput from '../../common-components/CustomInput';
import ExtensionButton from '../../common-components/ExtensionButton';
import { toDateString } from '../../util';
import SubSearch from './SubSearch';
import { AiOutlineSearch } from 'react-icons/ai';
import ExtendedInput from './ExtendedInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MainSearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SubSearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const SearchConditionBlock = styled.div`
  position: absolute;
  z-index: 6;
  top: 4px;
  left: 0px;

  width: 100%;

  // max-height를 최소로 하여 div를 작게 만들고,
  // overflow를 하여 컨텐츠를 숨긴 뒤,
  // transition 값이 바뀌었을 때, 서서히 증가시킴

  overflow: hidden;

  background: white;

  transition: all 0.2s ease-out;
  ${(props) =>
    props.open &&
    css`
      border: 1px solid ${defaultStyle.color1};
      height: ${(props) => props.height}px;
    `}

  ${(props) =>
    !props.open &&
    css`
      border: 0px solid ${defaultStyle.color1};
      height: 0;
    `}
    border-radius: 4px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-width: 200px; */
  width: calc(100% - 280px);
  height: 40px;

  border-right: none;
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

const SearchButton = styled(CustomButton)`
  width: 40px;
  height: 100%;
  background: white;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const StartDatePickerInput = styled(CustomInput)`
  height: 40px;
  width: 100px;
  border: 1px solid ${defaultStyle.color1};
  border-right-style: none;
  /* border-bottom-style: none; */
  padding-left: 4px;

  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const EndDatePickerInput = styled(CustomInput)`
  height: 40px;
  width: 100px;
  border: 1px solid ${defaultStyle.color1};

  border-right-style: none;
  /* border-bottom-style: none; */
  padding-left: 4px;

  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
`;

const ComplexNewsSearch = React.memo(function ComplexNewsSearch({
  inputState,
  setInputState,
  setOutputState,
  retrieve, // retrieve(inputState)
  categories,
  sources,
}) {
  
  const onClickSearchButton = () => {
    setInputState({ ...inputState, page: 1 });
    retrieve({ ...inputState, page: 1 });
  };

  // const onKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     // console.log('enter');
  //     refetch();
  //   }
  // };

  // const onChange = (e) => {
  //   const { name, value } = e.target;
  //   // console.log(name + " : " + value);
  //   setInputState({
  //     ...inputState,
  //     [name]: value,
  //   });
  // };

  const onDateChange = (dateName, dateValue) => {
    return (dateValue) => {
      // if (dateName === 'startDate') setStartDate(() => dateValue);
      // else setEndDate(() => dateValue);
      // inputDispatch({
      //     type: 'INIT_INPUT',
      //     name: dateName,
      //     value: toDateString(dateValue),
      // });
      console.log(dateName);

      setInputState({
        ...inputState,
        [dateName]: toDateString(dateValue),
      });
    };
  };

  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  const onClick = useCallback(() => {
    if (!open) {
      setMaxHeight(ref.current.scrollHeight + 50);
      setOpen(true);
    } else {
      setMaxHeight(0);
      setOpen(false);
    }
  }, [open]);

  return (
    <Container>
      <MainSearchContainer>
        <CustomCalendar
          customInput={StartDatePickerInput}
          defaultDate={inputState.from}
          onDateChange={onDateChange('from')}
          icon={'icon'}
        />
        <CustomCalendar
          customInput={EndDatePickerInput}
          defaultDate={inputState.to}
          onDateChange={onDateChange('to')}
          icon={'icon'}
        />
        <SearchInputContainer>
          {/* <SearchInput
            name="query"
            placeholder="검색어를 입력하세요"
            defaultValue={inputState.query}
            autoComplete="off"
            onKeyPress={onKeyPress}
            onChange={onChange}
          /> */}
          <ExtendedInput
            inputState={inputState}
            setInputState={setInputState}
            retrieve={retrieve}
            setOutputState={setOutputState}
          />
        </SearchInputContainer>

        <SearchButton onClick={onClickSearchButton}>
          <AiOutlineSearch />
        </SearchButton>
        <ExtensionButton open={open} onClick={onClick} />
      </MainSearchContainer>
      <SubSearchContainer>
        <SearchConditionBlock ref={ref} height={maxHeight} open={open}>
          <SubSearch
            inputState={inputState}
            setInputState={setInputState}
            retrieve={retrieve}
            categories={categories}
            sources={sources}
          />
        </SearchConditionBlock>
      </SubSearchContainer>
    </Container>
  );
});

export default React.memo(ComplexNewsSearch);

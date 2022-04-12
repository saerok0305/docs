import React, { useState } from 'react';
import styled from 'styled-components';
import { useCallback } from 'react';
import CustomButton from '../../common-components/CustomButton';
import DropDown from '../../common-components/dropdown/DropDown';
import CheckBox from '../../common-components/checkbox/CheckBox';
import CustomSlider from '../../common-components/slider/CustomSlider';
import defaultStyle from '../../../style';
import useDidMountEffect from '../../../hooks/CustomEffect';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  height: 100%;
`;

const SensitivityBarBlock = styled.div`
  // display: flex;
  width: 100%;
  height: 100%;
  padding: 0 40px;
  /* padding-top: 14px; */
`;

const OptionBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 8px 0;
`;

const CategoryBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0;
`;

const pressList = [
  { text: '주요 언론사', name: 'pressScope', value: { pressScope: 2 } },
  { text: '연합뉴스', name: 'pressScope', value: { pressScope: 1 } },
  { text: '전체', name: 'pressScope', value: { pressScope: 3 } },
];

const sortOptions = [
  {
    text: '최신순',
    name: 'sortOrder',
    value: { searchPriority: 'time', sortOrder: 'DESC' },
  },
  {
    text: '과거순',
    name: 'sortOrder',
    value: { searchPriority: 'time', sortOrder: 'ASC' },
  },
  {
    text: '적합도순',
    name: 'sortOrder',
    value: { searchPriority: 'relevance' }, // 적합도 순은 디폴트로 sortOrder: "DESC" 로 셋팅됨
  },
];

const targetOptions = [
  {
    text: '제목+본문',
    name: 'searchTargetList',
    value: { searchTargetList: ['title', 'content'] },
  },
  {
    text: '제목',
    name: 'searchTargetList',
    value: { searchTargetList: ['title'] },
  },
];

const infoOptions = [
  {
    text: '정보성',
    name: 'photoArticle',
    value: { photoArticle: 'article' },
  },
  {
    text: '비정보성',
    name: 'photoArticle',
    value: { photoArticle: 'photo' },
  },
  { text: '전체', name: 'photoArticle', value: { photoArticle: 'all' } },
];

const SubOptionDropdownButton = styled(CustomButton)`
  width: 100px;
  height: 34px;
  background: ${defaultStyle.color1};
  color: white;

  font-size: 0.8rem;
`;

// const categories = [
//     { name: '경제', text: '경제', active: true },
//     { name: '사회', text: '사회', active: true },
//     { name: '정치', text: '정치', active: true },
//     { name: 'IT/과학', text: 'IT/과학', active: true },
//     { name: '세계', text: '세계', active: true },
//     { name: '생활/문화', text: '생활/문화', active: true },
//     { name: '스포츠', text: '스포츠', active: true },
// ];

// defaut text
const labelState = {
  pressScope: pressList[0].text,
  // straightSelection: tagOptions[0].text,
  sortOrder: sortOptions[0].text,
  searchTargetList: targetOptions[0].text,
  photoArticle: infoOptions[0].text,
};

const SubSearch = React.memo(function SubSearch({
  inputState,
  setInputState,
  retrieve, // retrieve(inputState)
  categories,
  sources,
}) {
  // console.log(inputState); //////////////////////////////////////
  const [label, setLabel] = useState(labelState);

  const onSelect = useCallback(
    (text, attrName, val) => {
      console.log(text); ///////
      console.log(attrName); ///////////
      console.log(val); /////////////////////////////
      console.log({ ...inputState, ...val }); //
      setLabel(text);
      setLabel({ ...label, [attrName]: text });
      setInputState({ ...inputState, ...val });
    },
    [inputState, label, setInputState],
  );

  const [categoryState, setCategoryState] = useState(categories);
  const onSelectCategory = useCallback(
    (name, e) => {
      // console.log(e.target);
      const newState = categoryState.map((obj) => {
        if (obj.name === name) return { ...obj, active: !obj.active };
        else return obj;
      });
      setCategoryState(newState);
      setInputState({
        ...inputState,
        categoryList: newState
          .filter((c) => c.active === true)
          .map((c) => c.name),
      });
    },
    [categoryState, inputState, setInputState],
  );

  const [sourceState, setSourceState] = useState(sources);
  const onSelectSource = useCallback(
    (name, e) => {
      // console.log(e.target);
      const newState = sourceState.map((obj) => {
        if (obj.name === name) return { ...obj, active: !obj.active };
        else return obj;
      });
      setSourceState(newState);
      setInputState({
        ...inputState,
        sourceList: newState
          .filter((c) => c.active === true)
          .map((c) => c.name),
      });
    },
    [sourceState, inputState, setInputState],
  );

  const handleChange = useCallback(
    (e, value) => {
      // inputDispatch({
      //     type: 'MOVE_SLIDER',
      //     name: 'score',
      //     value, // slider value
      // });
      setInputState({ ...inputState, score: value });
    },
    [inputState, setInputState],
  );

  useDidMountEffect(() => {
    retrieve({ ...inputState, page: 1 });
  }, [inputState.score]);

  return (
    <Container>
      <SensitivityBarBlock>
        <CustomSlider handleChange={handleChange} />
      </SensitivityBarBlock>
      <OptionBlock>
        {/* <DropDown
          as={SubOptionDropdownButton}
          label={label.pressScope}
          items={pressList}
          onItemSelect={onSelect}
        /> */}
        <DropDown
          as={SubOptionDropdownButton}
          label={label.sortOrder}
          items={sortOptions}
          onItemSelect={onSelect}
        />
        <DropDown
          as={SubOptionDropdownButton}
          label={label.searchTargetList}
          items={targetOptions}
          onItemSelect={onSelect}
        />
        {/* <DropDown
          as={SubOptionDropdownButton}
          label={label.photoArticle}
          items={infoOptions}
          onItemSelect={onSelect}
        /> */}
      </OptionBlock>

      <CategoryBlock>
        <CheckBox items={categoryState} onClick={onSelectCategory} />
      </CategoryBlock>

      <CategoryBlock>
        <CheckBox items={sourceState} onClick={onSelectSource} />
      </CategoryBlock>
    </Container>
  );
});

export default React.memo(SubSearch);

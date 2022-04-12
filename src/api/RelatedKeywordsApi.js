import axios from 'axios';
import { toDateObj, toDateString } from '../project/util';
import config from './../config';

const test = config.test;

async function retrieveRelatedKeywords(inputState) {
  ////////////
  const input = {
    ...inputState,
    startDate: inputState.from,
    endDate: inputState.to,
  }; ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const query = input.query; /////////////////////
  if (query === '') return;

  const date1 = input.to.substring(0, 10);

  let dateObj = toDateObj(input.to);

  dateObj.setDate(dateObj.getDate() - 7);

  const date2 = toDateString(dateObj);

  dateObj.setDate(dateObj.getDate() - 7);

  const date3 = toDateString(dateObj);

  const dateArr = [date1, date2, date3];

  const col = query.split(/\s/);
  const multiKeywordList = [
    { queries: col, date: date1 },
    { queries: col, date: date2 },
    { queries: col, date: date3 },
  ];

  const reqObj = { multiKeywordList };

  let response = null; //////////////////// const
  if (!test) {
    response = await axios.post(
      config.backend_api + '/narrative/chrono/getMultiKeywordList',
      reqObj,
    );
  } else {
    response = { data: dummyRelatedKeywords() };
  }
  // const retrievedPagination = response.data;
  if (response.data === undefined) return null;

  const refinedResponse = response.data.map((e, index) => ({
    date: dateArr[index],
    id: index,
    candidates: e,
  }));

//   console.log(' RETRIEVE RELATED KEYWORDS ...');

  return refinedResponse;
}

export default retrieveRelatedKeywords;

function dummyRelatedKeywords() {
  return [
    [
      '카카오 게임사업',
      '카카오 임요환',
      '카카오 실마리',
      '카카오 프렌즈팝',
      '카카오 이모티콘',
      '카카오 퍼블리싱',
      '카카오 비밀',
      '카카오 동아리',
      '카카오 이용자',
    ],
    [
      '카카오 게임사업',
      '카카오 임요환',
      '카카오 실마리',
      '카카오 프렌즈팝',
      '카카오 이모티콘',
      '카카오 퍼블리싱',
      '카카오 비밀',
      '카카오 동아리',
      '카카오 이용자',
    ],
    [
      '카카오 게임사업',
      '카카오 임요환',
      '카카오 실마리',
      '카카오 프렌즈팝',
      '카카오 이모티콘',
      '카카오 퍼블리싱',
      '카카오 비밀',
      '카카오 동아리',
      '카카오 이용자',
    ],
  ];
}

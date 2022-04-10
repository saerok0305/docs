import axios from 'axios';
import config from '../config';

const test = config.test;

async function generateTitle({ inputState, setOutputState }) {
  // inputState
  // {
  //     "sents": [
  //             "나스닥 지수는 올해 약 44% 급등하는 초강세를 나타냈다.",
  //             "다우지수는 이번 주 약 1.4% 상승했다.",
  //             "S&P500 지수는 1.4%, 나스닥은 0.7% 가량 올랐다.",
  //             "미국 실업 지표가 양호했던 점이 안도감을 제공했다."
  //     ]
  // }
  const sents = [];

  for (let e of inputState) {
    const firstSentence = e.content_nlu[0].doc.sentences[0].text;
    sents.push(firstSentence);
  }

  const reqObj = { sents: sents };
  console.log(JSON.stringify(reqObj)); ////

  let response = null; //////////////////// const
  if (!test) {
    response = await axios.post(
      // 'http://172.20.93.21:31234/api/generate',
      config.backend_api + '/narrative/chrono/bart',
      reqObj,
    );
  } else {
    response = getDummyResponse(reqObj.sizePerPage);
  }

  const refinedResponse = [...response.data];

  // outputState
  // {
  //     "message": "success",
  //     "result": [
  //       "나스닥, 올해 44% 급등 초강세",
  //       "다우지수 1.4% 상승",
  //       "S&P500 1.4%, 나스닥 0.7% 상승",
  //       "美 실업 지표 양호했지만..."
  //     ]
  // }

  // console.log(refinedResponse); //
  if (setOutputState) setOutputState(refinedResponse); ///////////////////////

  console.log('KOR TITLE BART, NLU WRAPPER FORMAT ...'); //////////////////////////

  return refinedResponse;
}

export default generateTitle;

function getDummyResponse(sizePerPage) {
  const dummy = {};

  let newSources = [];
  for (let i = 0; i < sizePerPage; i++) {
    newSources.push(dummy.source[0]);
  }

  dummy.source = newSources;

  // sleep(5000);/////////

  return { data: dummy };
}

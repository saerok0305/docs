import axios from 'axios';
import config from '../config';

const test = config.test;

async function detectEvent({ inputState, setOutputState }) {
  const reqObj = {
    // page: inputState.page,
    query: inputState.query,
    // keyword: inputState.keyword,
    to: inputState.to,
    from: inputState.from,
    // sizePerPage: inputState.sizePerPage, // sizePerPage
    // option: inputState.option,
    // searchUnit: inputState.searchUnit,
    sortOrder: inputState.sortOrder, // extractClusterScore일 경우 DESC 하드코딩
    // clusterSalience: inputState.clusterSalience,
    categoryList: [...inputState.categoryList],
    sourceList: [...inputState.sourceList],
    // searchTargetList: [...inputState.searchTargetList],
    // straightSelection: inputState.straightSelection,
    // pressScope: inputState.pressScope,
    score: inputState.score,
    recommendSize: inputState.recommendSize, //200
    // datewiseSize: inputState.datewiseSize,
    // relevantSize: inputState.relevantSize, //1000
    // strictMode: inputState.strictMode,
    // photoArticle: inputState.photoArticle, // photo, article, all
    spamArticle: 'not_spam',
    // recommendType: inputState.recommendType, // freq, weight
    // status: inputState.status, // -1: reset 0: normal 1: extended search 2: retrieve required
    // sortField: inputState.sortField, // score, cluster_time  // extractClusterScore일 경우 안쓰임
    timeAggs: inputState.timeAggs, // false: burstiness
    // scoreMode: inputState.scoreMode, // Max, Avg}
    // maxClusterSize: inputState.maxClusterSize,
    // titleSearch: inputState.titleSearch,
    // interval: inputState.interval,
    searchPriority: inputState.searchPriority,
    interval: inputState.interval,
    // interval: 'hour',
  };

  console.log(JSON.stringify(reqObj)); /////

  let response = null; //////////////////// const
  if (!test) {
    // https.globalAgent.options.rejectUnauthorized = false;
    // const agent = new https.Agent({
    //     rejectUnauthorized: false,
    // });
    response = await axios.post(
      // 'http://172.20.92.46:8099/view/api/detectEvent',
      // 'http://172.20.92.46:8099/view/api/detectEventKeyword',
      config.backend_api + '/narrative/chrono/detectEvents',
      reqObj,
      // {
      //     httpsAgent: agent,
      // },
    );
  } else {
    response = getDummyResponse(reqObj.sizePerPage);
  }

  const totalNumOfItems = response.data.total;
  const count = Math.ceil(totalNumOfItems / inputState.sizePerPage);

  const refinedResponse = {
    ...response.data,
    totalPages: count,
  };

  // console.log(JSON.stringify(inputState)); ///
  // console.log(refinedResponse); ///////////////////////////////////////////////////////

  if (setOutputState) setOutputState(refinedResponse);

  console.log('EVENT DETECTION ...'); //////////////////////////

  return refinedResponse;
}

export default detectEvent;

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

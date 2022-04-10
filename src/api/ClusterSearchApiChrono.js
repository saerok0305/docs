import axios from "axios";
import config from "../config";

const test = config.test;

async function retrieveCluster({ inputState, setOutputState }) {
  const reqObj = {
    // page: inputState.page,
    // query: inputState.input,
    // endDate: inputState.to,
    // startDate: inputState.from,
    // size: inputState.sizePerPage, // sizePerPage
    // option: 'cluster',
    // searchUnit: 'cluster',
    // sortOrder: inputState.sortOrder,
    // clusterSalience: 0,
    // categoryList: [
    //     '경제',
    //     '사회',
    //     '정치',
    //     'IT/과학',
    //     '세계',
    //     '생활/문화',
    //     '스포츠',
    // ],
    // searchTargetList: ['title', 'content'],
    // straightSelection: 100,
    // pressScope: 2,
    // score: 0,
    // recommendSize: 200, //200
    // datewiseSize: 1000,
    // relevantSize: 2000, //1000
    // strictMode: true,
    // photoArticle: 'article', // photo, article, all
    // recommendType: 'freq', // freq, weight
    // status: 0, // -1: reset 0: normal 1: extended search 2: retrieve required
    // sortField: inputState.sortField, // cluster_time, score
    // timeAggs: true, // false: burstiness
    // scoreMode: 'Total', // Max, Avg}

    page: inputState.page,
    query: inputState.query,
    to: inputState.to,
    from: inputState.from,
    sizePerPage: inputState.sizePerPage, // sizePerPage
    // option: inputState.option,
    // searchUnit: inputState.searchUnit,
    sortOrder: inputState.sortOrder,
    // clusterSalience: inputState.clusterSalience,
    categoryList: [...inputState.categoryList],
    sourceList: [...inputState.sourceList],
    // searchTargetList: [...inputState.searchTargetList],
    // straightSelection: inputState.straightSelection,
    // pressScope: inputState.pressScope,
    score: inputState.score,
    // recommendSize: inputState.recommendSize, //200
    // datewiseSize: inputState.datewiseSize,
    // relevantSize: inputState.relevantSize, //1000
    strictMode: inputState.strictMode,
    // photoArticle: inputState.photoArticle, // photo, article, all
    spamArticle: "not_spam",
    // recommendType: inputState.recommendType, // freq, weight
    // status: inputState.status, // -1: reset 0: normal 1: extended search 2: retrieve required
    sortField: inputState.sortField, // cluster_time, score
    // timeAggs: inputState.timeAggs, // false: burstiness
    // scoreMode: inputState.scoreMode, // Max, Avg}
    // maxClusterSize: inputState.maxClusterSize,
    // titleSearch: inputState.titleSearch,
    searchPriority: inputState.searchPriority,
    // keyword: inputState.keyword,
  };

  // console.log(JSON.stringify(reqObj)); ///////////

  let response = null; //////////////////// const
  if (!test) {
    // const agent = new https.Agent({
    //     rejectUnauthorized: false,
    // });
    // https.globalAgent.options.rejectUnauthorized = false;
    response = await axios.post(
      // 'http://172.20.92.46:8099/view/api/searchEntityCluster',
      config.backend_api + "/narrative/chrono/retrieveClusters",
      reqObj
      // {
      //     httpsAgent: agent,
      // },
    );
  } else {
    response = getDummyResponse(reqObj.sizePerPage);
  }

  const totalNumOfItems = response.data.total;
  const count = Math.ceil(totalNumOfItems / inputState.sizePerPage);

  // console.log(JSON.stringify(response.data)); //////////////////

  const refinedResponse = {
    ...response.data,
    totalPages: count,
  };

  if (setOutputState) setOutputState(refinedResponse);

  console.log("CLUSTER SEARCH ..."); //////////////////////////

  return refinedResponse;
}

export default retrieveCluster;

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

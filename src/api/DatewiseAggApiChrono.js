import axios from 'axios';
import config from '../config';

const test = config.test;

async function retrieveDatewiseAgg({ inputState, setOutputState }) {
    const reqObj = {
        // page: inputState.page,
        // query: inputState.query,
        // endDate: inputState.to,
        // startDate: inputState.from,
        // size: inputState.sizePerPage, // sizePerPage
        // option: inputState.option,
        // searchUnit: inputState.searchUnit,
        // sortOrder: inputState.sortOrder,
        // clusterSalience: inputState.clusterSalience,
        // categoryList: [...inputState.categoryList],
        // searchTargetList: [...inputState.searchTargetList],
        // straightSelection: inputState.straightSelection,
        // pressScope: inputState.pressScope,
        // score: inputState.score,
        // recommendSize: inputState.recommendSize, //200
        // datewiseSize: inputState.datewiseSize,
        // relevantSize: inputState.relevantSize, //1000
        // strictMode: inputState.strictMode,
        // photoArticle: inputState.photoArticle, // photo, article, all
        // recommendType: inputState.recommendType, // freq, weight
        // status: inputState.status, // -1: reset 0: normal 1: extended search 2: retrieve required
        // sortField: inputState.sortField, // cluster_time, score
        // timeAggs: inputState.timeAggs, // false: burstiness
        // scoreMode: inputState.scoreMode, // Max, Avg}

        page: inputState.page,
        query: inputState.query,
        keyword: inputState.keyword,
        to: inputState.to,
        from: inputState.from,
        sizePerPage: inputState.sizePerPage, // sizePerPage
        option: inputState.option,
        searchUnit: inputState.searchUnit,
        sortOrder: inputState.sortOrder, // extractClusterScore일 경우 DESC 하드코딩
        clusterSalience: inputState.clusterSalience,
        categoryList: [...inputState.categoryList],
        sourceList: [...inputState.sourceList],
        searchTargetList: [...inputState.searchTargetList],
        straightSelection: inputState.straightSelection,
        pressScope: inputState.pressScope,
        score: inputState.score,
        recommendSize: inputState.recommendSize, //200
        datewiseSize: inputState.datewiseSize,
        relevantSize: inputState.relevantSize, //1000
        strictMode: inputState.strictMode,
        photoArticle: inputState.photoArticle, // photo, article, all
        recommendType: inputState.recommendType, // freq, weight
        // status: inputState.status, // -1: reset 0: normal 1: extended search 2: retrieve required
        sortField: inputState.sortField, // score, cluster_time  // extractClusterScore일 경우 안쓰임
        timeAggs: true, // false: burstiness
        scoreMode: inputState.scoreMode, // Max, Avg}
        maxClusterSize: inputState.maxClusterSize,
        titleSearch: inputState.titleSearch,
        interval: inputState.interval,
        searchPriority: inputState.searchPriority,
        keyword: inputState.keyword,
    };

    let response = null; //////////////////// const
    if (!test) {
        response = await axios.post(
            // 'http://172.20.92.46:8099/view/api/datewise',
            config.backend_api +
                '/narrative/chrono/datewiseAggregation',
            reqObj,
        );
    } else {
        response = getDummyResponse(reqObj.sizePerPage);
    }

    const refinedResponse = {
        ...response.data,
    };

    if (setOutputState) setOutputState(refinedResponse);

    console.log('DATEWISE AGGREGATION ...'); //////////////////////////
    console.log(response.data); //////

    return refinedResponse;
}

export default retrieveDatewiseAgg;

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

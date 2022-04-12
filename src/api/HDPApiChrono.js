import axios from 'axios';
import config from '../config';

const test = config.test;

async function retrieveTopicClusters({ recommendationState, setOutputState }) {
    const reqObj = recommendationState;

    let response = null; //////////////////// const
    if (!test) {
        response = await axios.post(
            config.backend_api +'/narrative/chrono/topicClustering',
            reqObj,
        );
    } else {
        response = { data: getDummyResponse() };
    }

    const refinedResponse = {
        data: response.data,
    };
    setOutputState(refinedResponse);

    console.log('UPDATE TOPIC-CLUSTERS ...'); //////////////////////////

    return refinedResponse;
}

export default retrieveTopicClusters;

function getDummyResponse() {
    const response = [];
    return response;
}

import axios from 'axios';
import config from '../config';

const test = config.test;

async function rerankCluster({ inputState, setOutputState }) {
    const reqObj = inputState;

    let response = null; //////////////////// const
    if (!test) {
        response = await axios.post(
            config.backend_api +'/narrative/chrono/rerankCluster',
            reqObj,
        );
    } else {
        response = { data: getDummyResponse() };
    }

    const refinedResponse = {
        ...response.data,
    };
    setOutputState(refinedResponse);

    console.log('RERANK CLUSTERS ...'); //////////////////////////

    return refinedResponse;
}

export default rerankCluster;

function getDummyResponse() {
    const response = [];
    return response;
}

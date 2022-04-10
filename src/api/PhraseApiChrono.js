import axios from 'axios';
import config from '../config';

const test = config.test;

async function korPhrase({ inputState, setOutputState }) {
    const reqObj = inputState;
    let response = null; //////////////////// const
    if (!test) {
        response = await axios.post(
            config.backend_api +'/narrative/chrono/phrase',
            reqObj,
        );
    } else {
        response = getDummyResponse();
    }

    const refinedResponse = {
        ...response.data,
    };
    console.log(refinedResponse); //////////

    if (setOutputState) setOutputState(refinedResponse); ///////////////////////

    console.log('ENG PHRASE ...'); //////////////////////////

    return refinedResponse;
}

export default korPhrase;

function getDummyResponse() {
    const response = [];
    return response;
}

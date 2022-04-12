import axios from 'axios';
import config from '../config';

const test = config.test;

async function retrieveDatewise({ inputState, setOutputState }) {
    const reqObj = {
        ...inputState,
    };

    let response = null; //////////////////// const
    if (!test) {
        response = await axios.post(
            config.backend_api +'/narrative/chrono/datewise',
            reqObj,
        );
    } else {
        response = getDummyResponse();
    }

    const refinedResponse = response.data;

    if (setOutputState) setOutputState(refinedResponse);

    console.log('DATEWISE ...'); //////////////////////////

    return refinedResponse;
}

export default retrieveDatewise;

function getDummyResponse() {
    const dummy = {};

    return { data: dummy };
}

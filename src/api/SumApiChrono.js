import axios from 'axios';
import config from '../config';

const test = config.test;

async function chronoSum({ inputState, setOutputState }) {
    console.log(inputState); ///
    const reqObj = inputState;
    let response = null; //////////////////// const
    if (!test) {
        response = await axios.post(
            config.backend_api + '/narrative/chrono/chronoSum',
            reqObj,
        );
    } else {
        response = getDummyResponse();
    }

    const refinedResponse = {
        ...response.data,
    };

    if (setOutputState) setOutputState(refinedResponse); ///////////////////////

    console.log('CHRONO MDS ...'); //////////////////////////

    return refinedResponse;
}

export default chronoSum;

function getDummyResponse() {
    const dummy = {};
    return { data: dummy };
}

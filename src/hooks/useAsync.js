import { useReducer, useEffect } from 'react';
import useDidMountEffect from './CustomEffect';

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function useAsync(callback, deps = []) {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: false,
    });

    const fetchData = async (param) => {
        dispatch({ type: 'LOADING' });
        try {
            let data = null;
            if (param) {
                data = await callback(param);
            } else {
                data = await callback();
            }
            dispatch({ type: 'SUCCESS', data });
        } catch (e) {
            dispatch({ type: 'ERROR', error: e });
        }
    };

    // useEffect(() => {
    //   // fetchData();
    //   ((param) => fetchData(param))();
    //   // eslint 설정을 다음 줄에서만 비활성화
    //   // eslint-disable-next-line
    // }, deps);
    useDidMountEffect(() => {
        ((param) => fetchData(param))();
        // eslint 설정을 다음 줄에서만 비활성화
        // eslint-disable-next-line
    }, deps);

    return [state, fetchData];
}

export default useAsync;

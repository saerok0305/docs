import React, { useEffect, useRef } from 'react';

const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}

export default useDidMountEffect;




// import React, { useEffect, useRef } from 'react';

// const useDidMountEffect = (func, deps) => {
//     const didMount = useRef(false);

//     useEffect(() => {
//         let unmount;
//         if (didMount.current) unmount = func();
//         else didMount.current = true;

//         return () => {
//             didMount.current = false;
//             unmount && unmount();
//         }
//     }, deps);
// }

// export default useDidMountEffect;
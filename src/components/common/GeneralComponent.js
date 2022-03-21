import React, { lazy, Suspense } from "react";

function GeneralComponent({ component }) {
  const Compoment = lazy(() =>
    // relative path for GeneralComponent.js => ../../pages/
    import(`../../pages/${component}`)
  );
  return (
    <div>
      <Suspense fallback={<div>loading ...</div>}>
        <Compoment />
      </Suspense>
    </div>
  );
}

export default GeneralComponent;

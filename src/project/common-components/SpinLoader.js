import React from 'react';
import { Oval } from 'react-loader-spinner';

function SpinLoader() {
  return (
    <Oval
      color="black"
      secondaryColor="grey"
      height="24"
      wieht="24"
      strokeWidth={5}
    />
  );
}

export default SpinLoader;

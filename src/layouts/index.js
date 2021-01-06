import React from "react";
// import AllRoute from "./allroutes";
import TestUsers from '../views/pages/TestUsers';
import {LoadingState} from 'components/loading';

export default () => (
  <React.Suspense fallback={<LoadingState />}>
    <TestUsers />
  </React.Suspense>
);
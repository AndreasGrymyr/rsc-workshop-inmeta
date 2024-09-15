import { slow } from '@/utils/slow';
import React, { Suspense } from 'react';
import ClientComponent from './_component/ClientComponent';

async function getData(delay: number) {
  await slow(delay);
  return delay;
}

async function FirstComponent() {
  const delay = await getData(1000);

  return <div>First component, delay: {delay}</div>;
}

async function SecondComponent() {
  const delay = await getData(2000);

  return <div>Second component, delay: {delay}</div>;
}

export default async function DataFetchingPage() {
//   console.log('Start time: ' + new Date().getSeconds());

  // disse kjører sekvensielt, det må de fordi de er avhengig av hverandre.
  // let data1 = await getData(1000);
  // let data2 = await getData(data1);
  // console.log("Sequential, time: " + new Date().getSeconds());

  // functions are called in parallel
  //   const [data1, data2] = await Promise.all([getData(1000), getData(1000)]);
  //   console.log('Parallel, time: ' + new Date().getSeconds());

  const dataPromise = getData(3000);

  return (
    <>
      <h1>Data fetching</h1>
      {/* <Suspense fallback={<div>Loading...</div>}>
    <FirstComponent />
    <SecondComponent />
    </Suspense> */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <FirstComponent />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <SecondComponent />
      </Suspense> */}
      <Suspense fallback={<div>Loading...</div>}>
        <ClientComponent dataPromise={dataPromise} />
      </Suspense>
    </>
  );
}

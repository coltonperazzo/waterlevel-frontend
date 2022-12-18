import React, {useEffect} from 'react';

const asyncFetch = function(requestData, propToChange, thenFunction, catchFunction) {
  async function fetchData() {
    let backendResponse = await fetch("/query/getWaterData", requestData)
    let responseJson = await backendResponse.json();
    thenFunction(responseJson)
  }
  useEffect(function() {
    fetchData();
  }, [propToChange.month]);
}

export default asyncFetch;
import React, { useState, useEffect } from "react";
import axios from "axios";

//util import
import AxiosWithAuth from '../utils/AxiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    console.log(`useEffect Triggered`)
    AxiosWithAuth()
    .get(`/api/colors`)
    .then(res => {
      console.log(res.data)
      let colorsFromGet = res.data
      setColorList(colorsFromGet)
    })
    .catch(err => {
      console.log(`There was an error fetching colors.`, err.response)
    })
  }, [] )



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

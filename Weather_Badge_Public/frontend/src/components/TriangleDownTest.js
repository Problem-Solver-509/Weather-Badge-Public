import React from 'react';
import '../App.css';
import TriangleDown from '../TriangleDown.svg'

export default function TriangleDownTest (props) {
  return(
    <div>
      <img src={TriangleDown} alt="TriangleDown" className={props.beleza.className} />
    </div>
  )
}


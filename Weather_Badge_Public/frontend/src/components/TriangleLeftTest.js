import React from 'react';
import '../App.css';
import TriangleLeft from '../TriangleLeft.svg'

export default function TriangleLeftTest (props) {
  return(
    <div>
      <img src={TriangleLeft} alt="TriangleLeft" className={props.beleza.className} />
    </div>
  )
}


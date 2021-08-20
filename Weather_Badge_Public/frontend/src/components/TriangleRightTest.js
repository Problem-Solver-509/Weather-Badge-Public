import React from 'react';
import '../App.css';
import TriangleRight from '../TriangleRight.svg'

export default function TriangleRightTest (props) {
  return(
    <div>
      <img src={TriangleRight} alt="TriangleRight" className={props.beleza.className} />
    </div>
  )
}


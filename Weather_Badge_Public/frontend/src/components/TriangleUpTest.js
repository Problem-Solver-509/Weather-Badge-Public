import React from 'react';
import '../App.css';
import TriangleUp from '../TriangleUp.svg'

export default function TriangleUpTest (props) {
  return(
    <div>
      <img src={TriangleUp} alt="TriangleUp" className={props.beleza.className} />
    </div>
  )
}


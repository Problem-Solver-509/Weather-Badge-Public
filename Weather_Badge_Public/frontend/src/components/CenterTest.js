import React from 'react';
import '../App.css';
import Center from '../Center.svg'

export default function CenterTest (props) {
  return(
    <div>
      <img src={Center} alt="Center" className={props.beleza.className} />
    </div>
  )
}


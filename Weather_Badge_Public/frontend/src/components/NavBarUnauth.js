import React from 'react';
import '../App.css';
import WeatherLogo from '../WeatherLogo.svg';
import '../App.css';


export default function NavBar () {
  return(
    <nav style={{display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between',
                 marginBottom: 50}}>
      <img src={WeatherLogo} className="App-logo" alt='logo' />
    </nav>
  )
}

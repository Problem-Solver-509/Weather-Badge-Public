import React, { useState, useEffect } from 'react';
import Center from './Center'
import North from './North'
import South from './South'
import East from './East'
import West from './West'

import CenterSquare from './CenterSquare'
import NorthTriangleUp from './NorthTriangleUp'
import WestTriangleLeft from './WestTriangleLeft'
import EastTriangleRight from './EastTriangleRight'
import SouthTriangleDown from './SouthTriangleDown'

import '../App.css';
import '../Rose.css';


export default function Rose () {

  const starterWeather = {'center': 'Clouds', 'n': 'Clouds', 'nn': 'Clouds', 's': 'Clear', 'ss': 'Drizzle',
                          'w': 'Clouds', 'ww': 'Clouds', 'e': 'Clouds', 'ee': 'Clouds'};


  const [origin, setOrigin] = useState({});
  const [weather, setWeather] = useState(starterWeather);

  const n = weather.n
  const e = weather.e
  const w = weather.w
  const s = weather.s
  const c = weather.center
  const good = {color: 'blue'}
  const bad = {color: 'red'}

  const goodWeatherList = ['Clear', 'Clouds', 'Partly Cloudy', 'Haze']
  const badWeatherList = ['Rain', 'Thunderstorm', 'Mist']

  const cGoodBorders = {className: 'square-good'}
  const cBadBorders = {className: 'square-bad'}

  const nGoodBorders = {className: 'triangle-up-good'}
  const nBadBorders = {className: 'triangle-up-bad'}

  const wGoodBorders = {className: 'triangle-left-good'}
  const wBadBorders = {className: 'triangle-left-bad'}

  const eGoodBorders = {className: 'triangle-right-good'}
  const eBadBorders = {className: 'triangle-right-bad'}

  const sGoodBorders = {className: 'triangle-down-good'}
  const sBadBorders = {className: 'triangle-down-bad'}


  function originHandler(e) {
    setOrigin(e.target.value);
  };

  async function initialOriginWeather () {
    const response = await fetch('http://127.0.0.1:5000/');
    const data = await response.json();
    setWeather(data);
  };

  async function change_origin() {
    const configs = {
      method: 'POST',
      body: JSON.stringify({
        'lat': origin.lat,
        'lon': origin.lon
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await fetch("http://localhost:5000/change_origin", configs);
    console.log('fetch called')
    const new_weather = await response.json();
    console.log('response.json()')
    console.log(new_weather);
    setWeather(new_weather)
  }

  async function buttonHandler (){
    console.log('button clicked')
    const response = change_origin() /* take variable away and get rid of bottom 3 lines of this function */
    console.log('change_origin called')
    setWeather(response)
    console.log('set initial weather')
    console.log(response)
  }

  function redButtonHandler () {
    const redWeather = {...weather} /* {...obj} creates copy of object */
    redWeather.center = 'Thunderstorm'
    setWeather(redWeather)  /* update state with updated copy of old obj */
    console.log(weather)
    console.log(c)
  }

  function greenButtonHandler () {
    const redWeather = {...weather} /* {...obj} creates copy of object */
    redWeather.center = 'Clear'
    setWeather(redWeather)  /* update state with updated copy of old obj */
    console.log(weather)
    console.log(c)
  }

  useEffect(() => {
    const guiri = async () => {
      const gringo = await navigator.geolocation.getCurrentPosition(function(position) {;
      setOrigin({'lat': position.coords.latitude, 'lon': position.coords.longitude});
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      console.log(gringo)
      });
    }
    guiri();
  }, [])

  return (

    <div>
      <h1 className='Rose-good'>Ternary styling from weather dict</h1>
      <button onClick={buttonHandler}>Refresh Weather</button>
      <h4>Latitude: {origin.lat}</h4>
      <h4>Longitude: {origin.lon}</h4>

      <button onClick={originHandler}>Useless dont click originHandler</button>
      <button onClick={initialOriginWeather}>Useless dont click initialOriginWeather</button>

      <h3> north, west, center, east, south</h3>
      <h3>{n}, {w}, {c}, {e}, {s}</h3>

      <button onClick={redButtonHandler}>Set center to red</button>
      <button onClick={greenButtonHandler}>Set center to green</button>


      <div style={{display: 'flex', justifyContent: 'center'}}>
        {goodWeatherList.includes(n) && <NorthTriangleUp beleza={nGoodBorders} />}
        { badWeatherList.includes(n) && <NorthTriangleUp beleza={nBadBorders} />}
      </div>


      <div style={{display: 'flex', justifyContent: 'center'}}>
        {goodWeatherList.includes(w) && <WestTriangleLeft beleza={wGoodBorders} />}
        { badWeatherList.includes(w) && <WestTriangleLeft beleza={wBadBorders} />}

        {goodWeatherList.includes(c) && <CenterSquare beleza={cGoodBorders} />}
        { badWeatherList.includes(c) && <CenterSquare beleza={cBadBorders} />}

        {goodWeatherList.includes(e) && <EastTriangleRight beleza={eGoodBorders} />}
        { badWeatherList.includes(e) && <EastTriangleRight beleza={eBadBorders} />}
      </div>


      <div style={{display: 'flex', justifyContent: 'center'}}>
        {goodWeatherList.includes(s) && <SouthTriangleDown beleza={sGoodBorders} />}
        { badWeatherList.includes(s) && <SouthTriangleDown beleza={sBadBorders} />}
      </div>


      <h1>Shapes above, words below.</h1>


      <div style={{display: 'flex', justifyContent: 'center'}}>
        {goodWeatherList.includes(n) && <North beleza={good} />}
        { badWeatherList.includes(n) && <North beleza={bad} />}
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {goodWeatherList.includes(w) && <West beleza={good} />}
        { badWeatherList.includes(w) && <West beleza={bad} />}
        {goodWeatherList.includes(c) && <Center beleza={good} />} {/* style padding into these two options for center */}
        { badWeatherList.includes(c) && <Center beleza={bad} />}
        {goodWeatherList.includes(e) && <East beleza={good} />}
        { badWeatherList.includes(e) && <East beleza={bad} />}
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {goodWeatherList.includes(s) && <South beleza={good} />}
        { badWeatherList.includes(s) && <South beleza={bad} />}
      </div>

    </div>
  )
}

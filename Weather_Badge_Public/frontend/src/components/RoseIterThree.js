import React, { useEffect } from 'react';
import CenterSquare from './CenterSquare'
import NorthTriangleUp from './NorthTriangleUp'
import WestTriangleLeft from './WestTriangleLeft'
import EastTriangleRight from './EastTriangleRight'
import SouthTriangleDown from './SouthTriangleDown'
import '../App.css';
import '../RoseIterTwo.css';



export default function Rose ({ passFuncs }) {
  const goodWeatherList = ['Clear', 'Clouds', 'Partly Cloudy', 'Haze']
  const badWeatherList = ['Rain', 'Thunderstorm', 'Mist']
  const starterWeatherList = ['Start']

  const n = passFuncs.weather.n
  const e = passFuncs.weather.e
  const w = passFuncs.weather.w
  const s = passFuncs.weather.s
  const c = passFuncs.weather.center

  async function change_origin() {
    const configs = {
      method: 'POST',
      body: JSON.stringify({
        'lat': passFuncs.origin.lat,
        'lon': passFuncs.origin.lon
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
    passFuncs.setWeather(new_weather)
  }

  function redButtonHandler () {
    const redWeather = {...passFuncs.weather} /* {...obj} creates copy of object */
    redWeather.center = 'Thunderstorm'
    passFuncs.setWeather(redWeather)  /* update state with updated copy of old obj */
    console.log(passFuncs.weather)
    console.log(c)
  }

  function greenButtonHandler () {
    const greenWeather = {...passFuncs.weather} /* {...obj} creates copy of object */
    greenWeather.center = 'Clear'
    passFuncs.setWeather(greenWeather)  /* update state with updated copy of old obj */
    console.log(greenWeather)
    console.log('Clear')
  }

  async function locButtonHandler() {
    const gringo = await navigator.geolocation.getCurrentPosition(function(position) {;
    passFuncs.setOrigin({'lat': position.coords.latitude, 'lon': position.coords.longitude});
    console.log(position)
    console.log(gringo)
    });
  }

  async function refreshWeatherButtonHandler (){
    const response = change_origin() /* take variable away and get rid of bottom 3 lines of this function */
    passFuncs.setWeather(response)
    console.log('set initial weather')
    }

  /*const childFunctions = {'refreshWeather': refreshWeatherButtonHandler, 'locButtonHandler': locButtonHandler,
                           'change_origin': change_origin, }*/


  useEffect(() => {
    const guiri = async () => {
      async function initialPosition(options) {
        return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      }

      async function getWeather(lat, lon) {
        const configs = {
          method: 'POST',
          body: JSON.stringify({'lat': lat, 'lon': lon}),
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = await fetch("http://localhost:5000/change_origin", configs);
        const new_weather = await response.json();
        passFuncs.setWeather(new_weather)
      }
      const position = await initialPosition()
      getWeather(position.coords.latitude, position.coords.longitude)
      passFuncs.setOrigin({'lat': position.coords.latitude, 'lon': position.coords.longitude})
    }
    guiri();
  }, [])

  return (
    <div>
      <div >

        <div style={{display: 'flex', justifyContent: 'center'}}>
          {starterWeatherList.includes(n) && <NorthTriangleUp beleza={{className: 'triangle-up-start'}} />}
          {goodWeatherList.includes(n) && <NorthTriangleUp beleza={{className: 'triangle-up-good'}} />}
          { badWeatherList.includes(n) && <NorthTriangleUp beleza={{className: 'triangle-up-bad'}} />}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {starterWeatherList.includes(w) && <WestTriangleLeft beleza={{className: 'triangle-left-start'}} />}
          {goodWeatherList.includes(w) && <WestTriangleLeft beleza={{className: 'triangle-left-good'}} />}
          { badWeatherList.includes(w) && <WestTriangleLeft beleza={{className: 'triangle-left-bad'}} />}

          {starterWeatherList.includes(c) && <CenterSquare beleza={{className: 'square-start'}} />}
          {goodWeatherList.includes(c) && <CenterSquare beleza={{className: 'square-good'}} />}
          { badWeatherList.includes(c) && <CenterSquare beleza={{className: 'square-bad'}} />}

          {starterWeatherList.includes(e) && <EastTriangleRight beleza={{className: 'triangle-right-start'}} />}
          {goodWeatherList.includes(e) && <EastTriangleRight beleza={{className: 'triangle-right-good'}} />}
          { badWeatherList.includes(e) && <EastTriangleRight beleza={{className: 'triangle-right-bad'}} />}
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {starterWeatherList.includes(s) && <SouthTriangleDown beleza={{className: 'triangle-down-start'}} />}
          {goodWeatherList.includes(s) && <SouthTriangleDown beleza={{className: 'triangle-down-good'}} />}
          { badWeatherList.includes(s) && <SouthTriangleDown beleza={{className: 'triangle-down-bad'}} />}
        </div>
        <div>
          <h1>            </h1>

        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {/*<button onClick={refreshWeatherButtonHandler}>Refresh Weather</button>
          <button onClick={locButtonHandler}>Refresh Location</button>
          <button onClick={redButtonHandler} style={{position: 'absolute',
                                                     bottom: 0,
                                                     left: 0}}>Set center to red</button>
          <button onClick={greenButtonHandler} style={{position: 'absolute',
                                                       bottom: 0,
                                                       left: 110}}>Set center to green</button>*/}
          <button class='button' style={{margin: 1}}onClick={passFuncs.setFavOne}>Set Preset 1 Location</button>
          <button class='button' style={{margin: 1}} onClick={passFuncs.setFavOne}>Set Preset 2 Location</button>
          <button class='button' style={{margin: 1}} onClick={passFuncs.setFavOne}>Set Preset 3 Location</button>
          <button class='button' style={{margin: 1}} onClick={passFuncs.setFavOne}>Set Preset 4 Location</button>
        </div>
      </div>

    </div>
  )
}

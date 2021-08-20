import React, { useState, useEffect } from 'react';
import CenterSquare from './CenterSquare'
import NorthTriangleUp from './NorthTriangleUp'
import WestTriangleLeft from './WestTriangleLeft'
import EastTriangleRight from './EastTriangleRight'
import SouthTriangleDown from './SouthTriangleDown'
import NavBar from './NavBar'
import '../App.css';
import '../RoseIterTwo.css';
import beach from '../beach.jpg'


export default function Rose () {

  const starterWeather = {'center': 'Start', 'n': 'Start', 'nn': 'Start', 's': 'Start', 'ss': 'Start',
                          'w': 'Start', 'ww': 'Start', 'e': 'Start', 'ee': 'Start'};


  const [origin, setOrigin] = useState({});
  const [weather, setWeather] = useState(starterWeather);

  const goodWeatherList = ['Clear', 'Clouds', 'Partly Cloudy', 'Haze']
  const badWeatherList = ['Rain', 'Thunderstorm', 'Mist']
  const starterWeatherList = ['Start']

  const n = weather.n
  const e = weather.e
  const w = weather.w
  const s = weather.s
  const c = weather.center





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



  function redButtonHandler () {
    const redWeather = {...weather} /* {...obj} creates copy of object */
    redWeather.center = 'Thunderstorm'
    setWeather(redWeather)  /* update state with updated copy of old obj */
    console.log(weather)
    console.log(c)
  }

  function greenButtonHandler () {
    const greenWeather = {...weather} /* {...obj} creates copy of object */
    greenWeather.center = 'Clear'
    setWeather(greenWeather)  /* update state with updated copy of old obj */
    console.log(weather)
    console.log(c)
  }

  async function locButtonHandler() {
    const gringo = await navigator.geolocation.getCurrentPosition(function(position) {;
    setOrigin({'lat': position.coords.latitude, 'lon': position.coords.longitude});
    console.log(position)
    console.log(gringo)
    });
  }

    async function buttonHandler (){
      const response = change_origin() /* take variable away and get rid of bottom 3 lines of this function */
      setWeather(response)
      console.log('set initial weather')
      /*console.log(response)*/
    }

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
        console.log(configs)
        const response = await fetch("http://localhost:5000/change_origin", configs);
        const new_weather = await response.json();
        setWeather(new_weather)
      }

      const position = await initialPosition()
      console.log(position)
      getWeather(position.coords.latitude, position.coords.longitude)
      setOrigin({'lat': position.coords.latitude, 'lon': position.coords.longitude})
    }
    guiri();
  }, [])


  return (

    <div>

      <div style={{backgroundImage: `url(${beach})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: '100vh'}}>
        <NavBar className='App-header' />
        <button onClick={buttonHandler}>Refresh Weather</button>
        <button onClick={locButtonHandler}>Refresh Location</button>

        <h4>Latitude: {origin.lat}</h4>
        <h4>Longitude: {origin.lon}</h4>

        {/*<h3> north, west, center, east, south</h3>
        <h3>{weather.n}, {weather.w}, {weather.center}, {weather.e}, {weather.s}</h3>*/}

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


        <button onClick={redButtonHandler} style={{position: 'absolute',
                                                   bottom: 0}}>Set center to red</button>
        <button onClick={greenButtonHandler} style={{position: 'absolute',
                                                     bottom: 0,
                                                     left: 110}}>Set center to green</button>
        </div>

    </div>
  )
}

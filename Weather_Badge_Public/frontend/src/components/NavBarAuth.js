import React, { useState } from 'react';
import '../App.css';
import WeatherLogo from '../WeatherLogo.svg';


export default function NavBar ({ passFuncs }) {

  const userDisplayName = sessionStorage.getItem('username')

  const [location, setLocation] = useState({})

  async function getPosition() {
    let position = navigator.geolocation.getCurrentPosition()
    setLocation(position)
  }

  const favNorth = {'lat': passFuncs.loginDict.north_lat, 'lon': passFuncs.loginDict.north_lon}
  const favWest = {'lat': passFuncs.loginDict.west_lat, 'lon': passFuncs.loginDict.west_lon}
  const favEast = {'lat': passFuncs.loginDict.east_lat, 'lon': passFuncs.loginDict.east_lon}
  const favSouth = {'lat': passFuncs.loginDict.south_lat, 'lon': passFuncs.loginDict.south_lon}


  async function updateWeather(latitude, longitude) {
    const configs = {
      method: 'POST',
      body: JSON.stringify({
        latitude, longitude
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await fetch("http://localhost:5000/change_origin", configs);
    const new_weather = await response.json();
    passFuncs.setWeather(new_weather)
    console.log('update weather')
  }

  async function resetOriginTwo() {
    const home = await navigator.geolocation.getCurrentPosition(function(position) {;
      passFuncs.setOrigin({'lat': position.coords.latitude, 'lon': position.coords.longitude});
      });
    return home
  }

  const resetOrigin = async () => {
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
      updateWeather(position.coords.latitude, position.coords.longitude)
    }

  function selectionChangeHandler(e) {
    passFuncs.setChosenOption(<h3>{e.target.value}</h3>)
    if(e.target.value === 'Preset 1') {
      passFuncs.setWeather(passFuncs.starterWeather)
      passFuncs.setOrigin(favNorth)
      updateWeather(favNorth.lat, favNorth.lon)
      console.log('preset 1')
    }else if(e.target.value === 'Preset 2'){
    passFuncs.setWeather(passFuncs.starterWeather)
      passFuncs.setOrigin(favWest)
      updateWeather(favWest.lat, favWest.lon)
      console.log('preset 2')
    }else if(e.target.value === 'Preset 3') {
    passFuncs.setWeather(passFuncs.starterWeather)
      passFuncs.setOrigin(favEast)
      updateWeather(favEast.lat, favEast.lon)
      console.log('preset 3')
    }else if(e.target.value === 'Preset 4') {
    passFuncs.setWeather(passFuncs.starterWeather)
      passFuncs.setOrigin(favSouth)
      updateWeather(favSouth.lat, favSouth.lon)
      console.log('preset 4')
    }else if (e.target.value === 'Current Location') {
    passFuncs.setWeather(passFuncs.starterWeather)
      const home = resetOrigin()
      console.log('Current Location')
    }
  }

  function logout () {
    passFuncs.setLoginDict({})
  }

  return(
    <nav style={{display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'space-between',
                 marginBottom: 50}}>
      <img src={WeatherLogo} className="App-logo" alt='logo' />

      <div style={{marginLeft: 'auto'}}>

        <select name="myName" id="myId" onChange={selectionChangeHandler} class='button' style={{display: 'flex',
                                                                                                 marginRight: 2}}>
          <option>Select a Preset</option>
          <option value="Preset 1">Preset 1</option>
          <option value="Preset 2">Preset 2</option>
          <option value="Preset 3">Preset 3</option>
          <option value="Preset 4">Preset 4</option>
          <option value="Current Location">Current Location</option>
          {/* option to reset to current location */}
        </select>

      </div>
      <div>
        <button onClick={logout} class='button'>Logout</button>
      </div>
    </nav>
  )
}

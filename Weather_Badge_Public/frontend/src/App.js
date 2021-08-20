import React, { useState } from 'react';
import RoseIterThree from './components/RoseIterThree'
import NavBarAuth from './components/NavBarAuth'
import NavBarUnauth from './components/NavBarUnauth'
import Login from './components/Login'
import Register from './components/Register'
import pattern from './pattern.jpg'
import './App.css';


const useStateWithSessionStorage = (key, initialValue) => {
  const [value, setValue] = useState(
    sessionStorage.getItem(key) || initialValue
  );
  return [value, setValue]
}


function App () {
  const [chosenOption, setChosenOption] = useState('');
  const [origin, setOrigin] = useState({});
  const [loginDict, setLoginDict] = useState({})
  const [userAuth, setUserAuth] = useStateWithSessionStorage("userAuth", "");
  const [username, setUsername] = useStateWithSessionStorage("username", "");
  /* const [favoriteLocation, setFavoriteLocation] = useState({}) */
  const welcome = <h3 style={{textAlign: 'center', color: '#7b77f7'}}>{username}'s Weather Badge</h3>
  const starterWeather = {'center': 'Start', 'n': 'Start', 'nn': 'Start', 's': 'Start', 'ss': 'Start',
                          'w': 'Start', 'ww': 'Start', 'e': 'Start', 'ee': 'Start'};

  const [weather, setWeather] = useState(starterWeather);

  async function setFavOne () {
    const configs = {
      method: 'POST',
      body: JSON.stringify({
        'favorite_n_lat': origin.lat, 'favorite_n_lon': origin.lon, 'session_id': userAuth
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    const response = await fetch("http://localhost:5000/api/favorite_n", configs);
    setLoginDict({...loginDict, 'north_lat': origin.lat, 'north_lon': origin.lon})

  }


  function userAuthHandler(e) {
    setUserAuth(e); // saves in memory
    sessionStorage.setItem("userAuth", e);
  }

  function usernameHandler(e) {
    setUsername(e); // saves in memory
    sessionStorage.setItem("username", e);
  }


  const childFunctions = {'setUserAuth': setUserAuth, 'username': username,
                          'userAuthHandler': userAuthHandler, 'setUser': setUsername,
                          'usernameHandler': usernameHandler, 'setFavOne': setFavOne,
                          'origin': origin, 'setOrigin': setOrigin, 'userAuth': userAuth,
                          'loginDict': loginDict, 'setLoginDict': setLoginDict, 'weather': weather,
                          'setWeather': setWeather, 'starterWeather': starterWeather,
                          'chosenOption': chosenOption, 'setChosenOption': setChosenOption}


  return (
    <div >
      <div style={{backgroundImage: `url(${pattern})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '100vw',
                    height: '100vh'}}>

        { !loginDict.session_id && <NavBarUnauth className='App-header' />}
        { loginDict.session_id && <NavBarAuth className='App-header' passFuncs={childFunctions}/>}

        { !loginDict.session_id && <h2 style={{textAlign: 'center', color: '#7b77f7'}}>WeatherBadge</h2>}

        { !loginDict.session_id && <Login authSetter={childFunctions}/>}
        { !loginDict.session_id && <Register authSetter={childFunctions}/>}

        {loginDict.session_id && welcome}

        { loginDict.session_id && <RoseIterThree passFuncs={childFunctions}/>}

      </div>
    </div>
  )
}

export default App;

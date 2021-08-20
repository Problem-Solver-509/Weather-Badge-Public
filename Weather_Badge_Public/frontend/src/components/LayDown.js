
import { BrowserRouter, Route, Link } from "react-router-dom";



App.js line 26


      <div >
        <NavBar />
        {switcher ? <TestGreen /> : <TestRed />}
      </div>
      <div>
        <Switcher switcherHandler={switcherHandler}/>
      </div>



App.js line 8

  /*const [switcher, setSwitcher] = useState(true)

  function switcherHandler(e) {
    setSwitcher(!switcher)
    console.log(switcher)
  }*/


roseitertwo line 45

  /*function originHandler(e) {
    setOrigin(e.target.value);
  };*/

  /*async function initialOriginWeather () {
    const response = await fetch('http://127.0.0.1:5000/');
    const data = await response.json();
    setWeather(data);
  };*/


roseitertwo line 111

      /*<button onClick={originHandler}>Useless dont click originHandler</button>*/
      /*<button onClick={initialOriginWeather}>Useless dont click initialOriginWeather</button>*/



roseitertwo line 52


  function redButtonHandler () {
    const redWeather = {...weather} /* {...obj} creates copy of object */
    weather.center = 'Thunderstorm'
    setWeather(redWeather)  /* update state with updated copy of old obj */
    console.log(weather)
    console.log(weather.center)
  }

  function greenButtonHandler () {
    const redWeather = {...weather} /* {...obj} creates copy of object */
    weather.center = 'Clear'
    setWeather(redWeather)  /* update state with updated copy of old obj */
    console.log(weather)
    console.log(weather.center)
  }

roseitertwo line 77


      <button onClick={redButtonHandler}>Set center to red</button>
      <button onClick={greenButtonHandler}>Set center to green</button>





findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);
				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};


roseitertwo line 87

  useEffect(() => {
    const guiri = async () => {
      const gringo = await navigator.geolocation.getCurrentPosition(function(position) {;
        setOrigin({'lat': position.coords.latitude, 'lon': position.coords.longitude});
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        console.log(gringo)

        async function changeOriginTwo() {
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
        changeOriginTwo()
      });

    }
    guiri();
  }, [origin.lat, origin.lon])


const = [chosenOption, setChosenOption] = useState('1')

const function getLocation() {
  const configs={
    body:JSON.stringify(
      sessionId: sessionId,
      chosenPreset: chosenOption,

    )
  }
}


function selectionChangeHandler(e) {
  setChosenOption(e.target.value)
}

const RandomComponent = () => {
  return(
    <div>
      <select name='someName' id='someId' onchange={selectionChangeHandler}>
        <option value="1">this is the text the user sees</option>
        <option value="1">this is the text the user sees</option>
        <option value="1">this is the text the user sees</option>
        <option value="1">this is the text the user sees</option>

      </select>
    </div>
  )
}



, 'north_lat': self.north_lat, 'north_lon': self.north_lon,
                     'west_lat': self.west_lat, 'west_lon': self.west_lon, 'east_lat': self.east_lat,
                     'east_lon': self.east_lon, 'south_lat': self.south_lat, 'south_lon': self.south_lon




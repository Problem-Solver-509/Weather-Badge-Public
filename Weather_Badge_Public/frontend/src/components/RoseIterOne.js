import React from 'react';
import Center from './Center'
import North from './North'
import South from './South'
import East from './East'
import West from './West'
import '../App.css';


/*style output_dict-key in css for each weather detail */

const good = {color: 'green'}
const bad = {color: 'red'}


export default function Rose () {

  const n = 'clouds'
  const e = 'clouds'
  const w = 'clouds'
  const s = 'Clouds'
  const c = 'clouds'

  return(

    <div>
      <h1>Ternary styling from weather dict</h1>
      <div>
        {n === 'clouds' && <North beleza={good} />}
        {e === 'clouds' && <East beleza={good} />}
        {w === 'clouds' && <West beleza={good} />}
        {s === 'clouds' && <South beleza={good} />}
        {c === 'clouds' && <Center beleza={good} />}

        {n === 'Clouds' && <North beleza={bad} />}
        {e === 'Clouds' && <East beleza={bad} />}
        {w === 'Clouds' && <West beleza={bad} />}
        {s === 'Clouds' && <South beleza={bad} />}
        {c === 'Clouds' && <Center beleza={bad} />}

      </div>
    </div>
  )
}


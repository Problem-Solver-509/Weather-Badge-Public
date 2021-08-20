import React, { useState } from 'react';
import '../App.css';


export default function Login ({ authSetter }) {

  const [userName, setUserName] = useState("")
  const [password , setPassword] = useState("")


  function userNameHandler (e) {
    setUserName(e.target.value)
  }

  function passwordHandler (e) {
    setPassword(e.target.value)
  }

  async function submitButtonHandler() {

    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: userName,
                            password: password})
    }

    const response = await fetch("http://localhost:5000/api/login", options)
    console.log('here be the posted username and password')
    const user = await response.json()
    console.log(user)
    authSetter.setUserAuth(user.session_id)
    authSetter.userAuthHandler(user.session_id)
    authSetter.setUser(user.username)
    authSetter.usernameHandler(user.username)
    authSetter.setLoginDict(user)
    console.log(user)
  }


  return (
    <div>
      <div>
        <h3 style={{textAlign: 'center', color: '#7b77f7'}}>Login</h3>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <input onChange={userNameHandler} placeholder={'Username'}/>
        <input type='password' onChange={passwordHandler} placeholder={'Password'}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button class='button' onClick={submitButtonHandler} >Submit</button>
      </div>
    </div>
  )
}

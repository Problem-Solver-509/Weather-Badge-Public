import React, { useState } from 'react';
import '../App.css';


export default function Register ({ authSetter }) {
   const [password, setPassword] = useState('')
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')

   function usernameHandler(e) {
     setUsername(e.target.value)
   }
   function passwordHandler(e) {
     setPassword(e.target.value)
   }
   function emailHandler(e) {
     setEmail(e.target.value)
   }

   async function sendData() {
     const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: username,
                            password: password,
                            email: email})
    }
    const response = await fetch("http://localhost:5000/api/create-user", options)
    const user = await response.json()
    authSetter.setUserAuth(user.session_id)
    authSetter.userAuthHandler(user.session_id)
    authSetter.setUser(user.username)
    authSetter.usernameHandler(user.username)
    authSetter.setLoginDict(user)
    console.log(user)

   }


  return(
    <div >
      <h3 style={{textAlign: 'center', color: '#7b77f7'}}>Register</h3>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <input onChange={usernameHandler} placeholder={'Username'}/>
        <input onChange={emailHandler} placeholder={'Email'}/>
      </div>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <input type='password' onChange={passwordHandler} placeholder={'Password'}/>
        <input type='password' placeholder={'Confirm Password'}/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button class='button' onClick={sendData} >Submit</button>
      </div>
    </div>
  )
}

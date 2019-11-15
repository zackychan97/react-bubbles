import React, { useState } from "react";

//import component

import AxiosWithAuth from '../utils/AxiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  console.log(props)

  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  console.log(login)

  const handleChange = e => {
    e.preventDefault()
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(login)
    AxiosWithAuth()
    .post(`/api/login`, login)
    .then (res => {
      console.log(res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/homepage')
    })
    .catch(err => console.log(`There was a login error. Please try again.`, err))
  }


  return (
    <div>
    <h1>Welcome to the Bubble App!</h1>
    <h3>Please login below.</h3>
  <form onSubmit={handleSubmit}> 
    <input  
      type="text"
      name="username"
      placeholder="Username"
      value={login.username}
      onChange={handleChange}
    />
    <input  
      type="text"
      name="password"
      placeholder="Password"
      value={login.password}
      onChange={handleChange}
    />
    <button>Login!</button>
  </form>
</div>
);
};


export default Login;

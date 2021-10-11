import React, { useState } from 'react'
import { getUserToken } from "../utils/authToken";
import { setUserToken, clearUserToken } from "../utils/authToken"
import { Link } from 'react-router-dom'

const RegisterForm = (props) => {
    const initialState = { user: "", password: "", password2: ""}
    const [input, setInput] = useState(initialState)
    const [currentUser, setCurrentUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)

  const registerUser = async (data)=> {
    try {
      const configs = {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${getUserToken()}`,
        }
      }
      const newUser =  await fetch('http://localhost:9000/auth/register',configs)
      const parsedUser = await newUser.json()
      console.log("PARSED", parsedUser)
      setUserToken(parsedUser.token)
      setCurrentUser(parsedUser.user)
      setIsAuthenticated(parsedUser.isLoggedIn)
      return parsedUser 

    } catch(err){
      console.log("parsed a no go", err)
      clearUserToken()
      setIsAuthenticated(false)
    }
  }
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      if (input.password === input.password2) {
        const createdUserToken = await registerUser(input)
        console.log(createdUserToken)
        if (createdUserToken) {
          const user_id = createdUserToken.user._id
          props.history.push(`/${user_id}/renta`)
        } else {
          props.history.push("/register")
        }
      } else {
        alert("TYPO OR SOMETHING PASSWORD DIDN'T MATCH THOUGH")
        props.history.push("/register")
      }
      setInput(initialState)
    }
    
    const handleChange = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value })
    }
  
    return (
      <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">Name: </label>
          <input
            id="user"
            name="user"
            value={input.user}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={input.password}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Confirm Password: </label>
          <br />
          <input
            id="password2"
            type='password'
            name="password2"
            value={input.password2}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input type="submit" value="Register" />
          <p >Already have an account?<Link to='/'> Log in</Link></p>
        </form>
      </>
    );
  };

export default RegisterForm
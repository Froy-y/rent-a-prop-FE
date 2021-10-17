import React, { useState } from 'react'
import { getUserToken } from "../../../utils/authToken"
import { setUserToken, clearUserToken } from "../../../utils/authToken"
import { Link } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

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
    setUserToken(parsedUser.token)
    setCurrentUser(parsedUser.user)
    setIsAuthenticated(parsedUser.isLoggedIn)
    return parsedUser 

  } catch(err){
    clearUserToken()
    setIsAuthenticated(false)
  }
}
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (input.password === input.password2) {
      const createdUserToken = await registerUser(input)
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
      <div className="registerPage">
        <div className="registerContent">
          <div className="registerH1">
            <h1>Register</h1>
          </div>
          <form className= "registerLabels" onSubmit={handleSubmit}>
            <FloatingLabel
                htmlFor="user"
                controlId="floatingInput"
                label="Username"
                className="mb-3"
            >
                <Form.Control
                type="name"
                id="user"
                name="user"
                value={input.user}
                onChange={handleChange} 
                placeholder="username"
                required />
            </FloatingLabel>
            <FloatingLabel 
              htmlFor="password" 
              controlId="floatingPassword" 
              label="Password"
              className="mb-3"
            >
                <Form.Control 
                  id="password"
                  name="password"
                  type="password"
                  value={input.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required />
            </FloatingLabel>
            <FloatingLabel 
              htmlFor="password" 
              controlId="floatingPassword" 
              label="Confirm Password"
              className="mb-3"
            >
                <Form.Control 
                  id="password2"
                  type='password'
                  name="password2"
                  value={input.password2}
                  onChange={handleChange}
                  placeholder="Password"
                  required />
            </FloatingLabel>

            <input type="submit" value="Register" />
            <p >Already have an account?<Link to='/login'> Log in</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm
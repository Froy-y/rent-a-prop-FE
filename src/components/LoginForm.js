import React, { useState } from 'react'
import { setUserToken, clearUserToken } from '../utils/authToken'
import { Link } from 'react-router-dom'

const LoginForm = (props) => {
    const initialState = { user: "", password: "" }
    const [input, setInput] = useState(initialState)
    const [currentUser, setCurrentUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const loginUser = async (data) => {
        try {
            const config = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const newUser = await fetch('http://localhost:9000/auth/login', config)
            const parsed = await newUser.json()
            console.log(parsed)
            setUserToken(parsed.token)
            setCurrentUser(parsed.user)
            setIsAuthenticated(parsed.isLoggedIn)
            return parsed
        } catch (err) {
            clearUserToken()
            setIsAuthenticated(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await loginUser(input)
        const user_id = createdUserToken.user._id
        if (createdUserToken) {
            props.history.push(`/${user_id}/renta`)
        } else {
            props.history.push("/")
        }
        setInput(initialState)
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return(
        <>
            <div>
                <h1>Login</h1>
                <div >
                    <div>
                    <form className='text-center' onSubmit={handleSubmit}>
                        <label htmlFor="user">user: </label>
                        <br />
                        <input
                        id="user"
                        name="user"
                        value={input.user}
                        onChange={handleChange}
                        />
                        <br />
                        <br />
                        <label htmlFor="password">Password: </label>
                        <br />
                        <input
                        type='password'
                        id="password"
                        name="password"
                        value={input.password}
                        onChange={handleChange}
                        />
                        <br />
                        <br />
                        <input type="submit" value="Login" />
                        <p>Don't have an account?<Link to='/register'> Register</Link></p>
                    </form>
                    </div> 
                </div>
            </div>
        </>
    )
}

export default LoginForm
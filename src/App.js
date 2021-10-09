import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewRental from './components/NewRental';
import RentalList from './components/RentalList';
import EditRental from './components/EditRental';
import RentalDetails from './components/RentalDetails';
import RegisterForm from './components/RegisterForm'
import { useEffect, useState } from 'react';
import { clearUserToken, setUserToken } from './utils/authToken'

const App = () => {
const [currentUser, setCurrentUser] = useState({})
const [isAuthenticated, setIsAuthenticated] = useState(false)

  const registerUser = async (data)=> {
    try{
      const configs = {
        method:"POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const newUser =  await fetch('http://localhost:9000/auth/register',configs)
      const parsedUser = await newUser.json()
      console.log(parsedUser)
      // sets local storage
      setUserToken(parsedUser.token)
      // put the returned user object in state
      setCurrentUser(parsedUser.user)
      // adds a boolean cast of the responses isLoggedIn prop
      setIsAuthenticated(parsedUser.isLoggedIn)
      // alternative (safer) implementation would be to use jwt decode library - https://www.npmjs.com/package/jwt-decode
      // this would also require reconfiguring our backend so we only send tokens with a signup

      return parsedUser 

    }catch(err){
      console.log(err)
      clearUserToken()
      setIsAuthenticated(false)
    }
  }

  return (
    <div className="App">
      <h1>Hi</h1>
      <Router>
        <Switch>
          <Route exact path="/" render={(renderProps)=><RegisterForm {...renderProps} signUp={registerUser}/>}/>
          <Route exact path ='/renta/new' render={(routerProps) => <NewRental {...routerProps} /> } />
          <Route exact path ='/renta' render={(routerProps) => <RentalList {...routerProps} /> } />
          <Route exact path ='/renta/:id/edit' render={(routerProps) => <EditRental {...routerProps} /> } />
          <Route exact path ='/renta/:id' render={(routerProps) => <RentalDetails {...routerProps} /> } />
        </Switch>
      </Router>
    </div>
  )
}

export default App
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewRental from './components/NewRental'
import RentalList from './components/RentalList'
import EditRental from './components/EditRental'
import RentalDetails from './components/RentalDetails'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'

const App = () => {
  return (
    <div className="App">
      <h1>Hi</h1>
      <Router>
        <Switch>
          <Route exact path="/" render={(renderProps)=><LoginForm {...renderProps} />}/>
          <Route exact path="/register" render={(renderProps)=><RegisterForm {...renderProps} />}/>
          <Route exact path ='/:userId/renta/new' render={(routerProps) => <NewRental {...routerProps} /> } />
          <Route exact path ='/:userId/renta' render={(routerProps) => <RentalList {...routerProps} /> } />
          <Route exact path ='/:userId/renta/:rentaId/edit' render={(routerProps) => <EditRental {...routerProps} /> } />
          <Route exact path ='/:userId/renta/:rentaId' render={(routerProps) => <RentalDetails {...routerProps} /> } />
        </Switch>
      </Router>
    </div>
  )
}

export default App
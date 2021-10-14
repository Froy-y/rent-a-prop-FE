import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import RegisterForm from './components/Pages/Auth/RegisterForm'
import LoginForm from './components/Pages/Auth/LoginForm'

import Home from './components/Pages/Present/Home'
import About from './components/Pages/Present/About'

import NewRental from './components/Pages/Rentals/NewRental'
import RentalList from './components/Pages/Rentals/RentalList'
import EditRental from './components/Pages/Rentals/EditRental'
import RentalDetails from './components/Pages/Rentals/RentalDetails'

import NewTenant from './components/Pages/Tenants/NewTenant'
import TenantList from './components/Pages/Tenants/TenantList'
import EditTenant from './components/Pages/Tenants/EditTenant'
import TenantDetails from './components/Pages/Tenants/TenantDetails'

import NavBar from './components/Presentational/NavBar'


const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/*" component= {NavBar} />
        <Switch>
          <Route exact path="/" render={(renderProps)=><LoginForm {...renderProps} />}/>
          <Route exact path="/register" render={(renderProps)=><RegisterForm {...renderProps} />}/>
          
          <Route exact path="/:userId/home" render={(renderProps)=><Home {...renderProps} />}/>
          <Route exact path="/:userId/about" render={(renderProps)=><About {...renderProps} />}/>

          <Route exact path ='/:userId/renta/new' render={(routerProps) => <NewRental {...routerProps} /> } />
          <Route exact path ='/:userId/renta' render={(routerProps) => <RentalList {...routerProps} /> } />
          <Route exact path ='/:userId/renta/:rId/edit' render={(routerProps) => <EditRental {...routerProps} /> } />
          <Route exact path ='/:userId/renta/:rId' render={(routerProps) => <RentalDetails {...routerProps} /> } />

          <Route exact path ='/:userId/renta/:rId/tenant/new' render={(routerProps) => <NewTenant {...routerProps} /> } />
          <Route exact path ='/:userId/renta/:rId/tenant' render={(routerProps) => <TenantList {...routerProps} /> } />
          <Route exact path ='/:userId/renta/:rId/tenant/:tId/edit' render={(routerProps) => <EditTenant {...routerProps} /> } />
          <Route exact path ='/:userId/renta/:rId/tenant/:tId' render={(routerProps) => <TenantDetails {...routerProps} /> } />
        </Switch>
      </Router>
    </div>
  )
}

export default App
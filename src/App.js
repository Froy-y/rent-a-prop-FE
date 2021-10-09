import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NewRental from './components/Rentals/NewRental';
import RentalList from './components/Rentals/RentalList';
import EditRental from './components/Rentals/EditRental';
import RentalDetails from './components/Rentals/RentalDetails';

import NewTenant from './components/Tenants/NewTenant';
import TenantList from './components/Tenants/TenantList';
import EditTenant from './components/Tenants/EditTenant';
import TenantDetails from './components/Tenants/TenantDetails';

const App = () => {
  return (
    <div className="App">
      <h1>Hi</h1>
      <Router>
        <Switch>
          <Route exact path ='/renta/new' render={(routerProps) => <NewRental {...routerProps} /> } />
          <Route exact path ='/renta' render={(routerProps) => <RentalList {...routerProps} /> } />
          <Route exact path ='/renta/:id/edit' render={(routerProps) => <EditRental {...routerProps} /> } />
          <Route exact path ='/renta/:id' render={(routerProps) => <RentalDetails {...routerProps} /> } />

          <Route exact path ='/renta/:id/tenant/new' render={(routerProps) => <NewTenant {...routerProps} /> } />
          <Route exact path ='/renta/:id/tenant' render={(routerProps) => <TenantList {...routerProps} /> } />
          <Route exact path ='/renta/:id/tenant/:id/edit' render={(routerProps) => <EditTenant {...routerProps} /> } />
          <Route exact path ='/renta/:id/tenant/:id' render={(routerProps) => <TenantDetails {...routerProps} /> } />
        </Switch>
      </Router>
    </div>
  )
}

export default App
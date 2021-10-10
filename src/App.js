import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewRental from './components/PropertyPages/NewRental';
import RentalList from './components/PropertyPages/RentalList';
import EditRental from './components/PropertyPages/EditRental';
import RentalDetails from './components/PropertyPages/RentalDetails';

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
        </Switch>
      </Router>
    </div>
  )
}

export default App
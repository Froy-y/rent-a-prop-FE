import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NewRental from './components/RentalPages/NewRental';
import RentalList from './components/RentalPages/RentalList';
import EditRental from './components/RentalPages/EditRental';
import RentalDetails from './components/RentalPages/RentalDetails';

import NewTenant from './components/Tenants/NewTenant';
import TenantList from './components/Tenants/TenantList';
import EditTenant from './components/Tenants/EditTenant';
import TenantDetails from './components/Tenants/TenantDetails';

import React, { useState } from "react"
import axios from 'axios'

async function postImage({image, description}) {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("description", description)

        const result = await axios.post('/images', formData, { headers: {"Content-Type": "multipart/form-data"} })
        return result.data
}

const App = () => {
  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])

  const handleSubmitFile = async (e) => {
      e.preventDefault()
      const result = await postImage({image: file, description})
      setImages([result.image, ...images])
  }

  const handleChange = (e) => {
      const file = e.target.files[0]
      setFile(file)
  }

  return (
    <div className="App">
      <h1>Hi</h1>
      <div>
          <form onSubmit={ handleSubmitFile }>
              <input type="file" onChange={ handleChange } accept="image/*"/>
              <input value={ description } onChange={ e => setDescription(e.target.value) } type="text"/>
              <button type="submit">Upload!</button>
          </form>
      </div>
      <div>
          { images.map( image => (
              <div key={ image }>
                  <img src={ image } />
              </div>
          ))}
      </div>
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
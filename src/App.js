import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NewRental from './components/PropertyPages/NewRental';
import RentalList from './components/PropertyPages/RentalList';
import EditRental from './components/PropertyPages/EditRental';
import RentalDetails from './components/PropertyPages/RentalDetails';

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
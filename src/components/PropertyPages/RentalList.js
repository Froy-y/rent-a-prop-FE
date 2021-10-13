import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"

const RentalList = props => {
    const [rental, setRental] = useState([])
    const history = useHistory()
    const [show, setShow] = useState(false)
    
    //fetch for index
    const getRentals = async () => {
        try {
            const allRentals = await fetch('http://localhost:9000/renta')
            const parsed = await allRentals.json()
            setRental(parsed)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {getRentals()}, [])

    const handleDelete = async id => {
        try {
            const config = {
                method: 'DELETE'
            }
            const deleteRental = await fetch(`http://localhost:9000/renta/${id}`, config)
            const parsed = await deleteRental.json()
            const updateRental = rental.filter(rentalProperty => rentalProperty._id !== parsed._id)
            setRental(updateRental)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = path => history.push(path)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return(
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rental && rental.map(rentalProperty => (
                            <tr key={ rentalProperty._id }>
                                <td>{ rentalProperty.name }</td>
                                <td><Link to={`/renta/${rentalProperty._id}`}>{ rentalProperty.address }</Link></td>
                                <td onClick={() => handleDelete(rentalProperty._id)}>X</td>
                                
                            </tr>
                        )) }
                    </tbody>
                </table>
                { rental && rental.map(property => (
                <div className="cardDiv">
                    <Card style={{ width: '18rem' }} onClick={ handleShow } className="cursorCard">
                        <Card.Body>
                            <Card.Title>{ property.name }</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{ property.address }</Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Button 
                            variant="primary"
                            size="lg"
                            onClick={() => handleClick(`/renta/${property._id}`)}
                            >
                            View
                            </Button>
                        </Card.Body>
                    </Card>
                    <Offcanvas show={ show } onHide={ handleClose }>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{ property.name }</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        { property.address }
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
                ))}
                <Link to="/renta/new">Create New Rental</Link>
                <br/>
                <Link to="/">Dismiss</Link>
            </div>
        </>
    )
}

export default RentalList
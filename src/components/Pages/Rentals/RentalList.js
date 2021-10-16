import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { getUserToken } from "../../../utils/authToken"
import Card from 'react-bootstrap/Card'
import { useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"

const RentalList = (props) => {
    const [rental, setRental] = useState([])
    const history = useHistory()
    const [show, setShow] = useState(false)
    const { userId } = useParams()

    //fetch for index
    const getRentals = async () => {
        try {
            const configs = {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `bearer ${getUserToken()}`,
                  }
              }
            const allRentals = await fetch(`http://localhost:9000/${userId}/renta`, configs)
            const parsed = await allRentals.json()
            setRental(parsed)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getRentals()
    }, [])

    const handleDelete = async (rentaId) => {
        try {
            const config = {
                method: 'DELETE',
                headers: {
                    "Authorization": `bearer ${getUserToken()}`
                }
            }
            const deleteRental = await fetch(`http://localhost:9000/${userId}/renta/${rentaId}`, config)
            const parsed = await deleteRental.json()
            const updateRental = rental.filter(rentalProperty => rentalProperty._id !== parsed._id)
            setRental(updateRental)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = path => history.push(path)
    const handleShow = () => setShow(true)

    return(
        <>
            <div className="listContent">
                { rental && rental.map(property => (
                <div className="cardDiv">
                    <Card onClick={ handleShow } className="cursorCard">
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
                            onClick={() => handleClick(`/${userId}/renta/${property._id}`)}
                            >
                            View
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                ))}
                <Link to={`/${userId}/renta/new`}>Create New Rental</Link>
                <br/>
                <Link to={`/${userId}/home`}>Back</Link>
            </div>
        </>
    )
}

export default RentalList
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
            <div className="rentalListH1">
                <h1>Welcome! You currently have { rental.length } properties!</h1>
            </div>
            <div className="listContent">
                { rental && rental.map(property => (
                <div className="cardDiv">
                    <Card onClick={ handleShow } className="rentaListCard">
                        <Card.Body>
                            <Card.Title>{ property.name }</Card.Title>
                            <Card.Subtitle className="mb-2 text-white"><i>{ property.address }</i></Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Button 
                                variant="light"
                                onClick={() => handleClick(`/${userId}/renta/${property._id}`)}
                            >
                            View
                            </Button>
                            <Button
                                className="deleteButton"
                                variant="danger"
                                onClick={() => handleDelete(property._id)}
                            >
                            Delete
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                ))}
                <br/>
            </div>
            <Button
                    className="createRentaBtn"
                    variant="secondary"
                    onClick={() => handleClick(`/${userId}/renta/new`)}
                >
                Create New Rental
            </Button>
        </>
    )
}

export default RentalList
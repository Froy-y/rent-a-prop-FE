import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'

const RentalList = (props) => {
    const [rental, setRental] = useState([])
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex)
    }

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

    useEffect(() => {
        getRentals()
    }, [])

    const handleDelete = async (id) => {
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
                {/* <Card className="bg-dark text-white">
                    <Card.Img src="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg" alt="Card image" className=""/>
                    <Card.ImgOverlay>
                        <Card.Title>Card title</Card.Title>
                        <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                        </Card.Text>
                        <Card.Text>Last updated 3 mins ago</Card.Text>
                    </Card.ImgOverlay>
                </Card> */}
                {/* <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://fastly.4sqi.net/img/general/600x600/52158091_RPeg8et7CuvXltcLdcndipZCSfihF245A1xElsHEFj8.jpg"
                        alt="First slide"
                        className="carousel-image"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c21hbGx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                        alt="Second slide"
                        className="carousel-image"
                        />

                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c21hbGx8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                        alt="Third slide"
                        className="carousel-image"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel> */}
                <Link to="/renta/new">Create New Rental</Link>
                <br/>
                <Link to="/">Dismiss</Link>
            </div>
        </>
    )
}

export default RentalList
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserToken } from "../../../utils/authToken"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const RentalDetails = (props) => {
    const [rental, setRental] = useState('')
    const [tenants, setTenants] = useState([])
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const { userId } = useParams()
    const { rId } = useParams()

    //fetch show
    const getRental = async(rId) => {
        try {
            const configs = {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `bearer ${getUserToken()}`,
                }
              }
            const foundRental = await fetch(`https://lit-sands-33874.herokuapp.com/${userId}/renta/${rId}`, configs)
            const parsed = await foundRental.json()
            setRental(parsed.renta)
            setTenants(parsed.tenants)
            setLoading(!loading)
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect(() => {
        getRental(rId)
    }, [])

    const handleClick = path => history.push(path)

    return(
        <>
            {
                loading ? <h3><em>Loading...</em></h3> :
                <>
                    <div className="detailsHeader">
                        <h1>Details for your property</h1>
                    </div>
                    <Card className="detailsCard">
                        <Card.Body>
                            <Card.Title>{ rental.name }</Card.Title>
                            <Card.Subtitle className="mb-2 text-white"><i>{ rental.address }</i></Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <h6>Current Tenant Count: { tenants.length }</h6>
                        </Card.Footer>
                    </Card>
                </>
            }
            <Button
                className="createRentaBtn"
                variant="secondary"
                onClick={() => handleClick(`/${userId}/renta/`)}
            >
            Back
            </Button>
            <Button
                className="createRentaBtn"
                variant="secondary"
                onClick={() => handleClick(`/${userId}/renta/${rId}/edit`)}
            >
            Edit
            </Button>
            { tenants && tenants.length ? (
                <div>
                    <Button
                        className="createRentaBtn"
                        variant="secondary"
                        onClick={() => handleClick(`/${userId}/renta/${rId}/tenant`)}
                    >
                    View Tenants
                    </Button>
                    <Button
                        className="createRentaBtn"
                        variant="secondary"
                        onClick={() => handleClick(`/${userId}/renta/${rId}/tenant/new`)}
                    >
                    Create Tenants
                    </Button>
                </div>
                
            ) : (
                <Button
                    className="createRentaBtn"
                    variant="secondary"
                    onClick={() => handleClick(`/${userId}/renta/${rId}/tenant/new`)}
                >
                Create Tenants
                </Button>
            ) }
        </>
    )
}

export default RentalDetails
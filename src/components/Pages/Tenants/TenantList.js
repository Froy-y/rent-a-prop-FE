import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"

const TenantList = (props) => {
    const [tenant, setTenant] = useState([])
    const history = useHistory()
    const [show, setShow] = useState(false)
    const { rId } = useParams()
    const { userId } = useParams()

    const getTenants = async () => {
        try {
            const allTenants = await fetch(`http://localhost:9000/${userId}/renta/${rId}/tenant`)
            const parsed = await allTenants.json()
            setTenant(parsed)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTenants()
    }, [])

    const handleDelete = async (id) => {
        try {
            const config = {
                method: 'DELETE'
            }
            const deleteTenant = await fetch(`http://localhost:9000/${userId}/renta/${rId}/tenant/${id}`, config)
            const parsed = await deleteTenant.json
            const updateTenants = tenant.filter(person => person._id !== parsed._id)
            setTenant(updateTenants)
        } catch (err) {
            console.log(err)   
        }
    }

    const handleClick = path => history.push(path)
    const handleShow = () => setShow(true)

    return(
        <>
            <div className="rentalListH1">
                <h1>Welcome! You currently have { tenant.length } tenants!</h1>
            </div>
            <div className="listContent">
                { tenant && tenant.map(person => (
                <div className="cardDiv">
                    <Card onClick={ handleShow } className="rentaListCard">
                        <Card.Body>
                            <Card.Title>{ person.name }</Card.Title>
                            <Card.Subtitle className="mb-2 text-white"><i>{ person.age }</i></Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Button 
                                variant="light"
                                onClick={() => handleClick(`/${userId}/renta/${rId}/tenant/${person._id}`)}
                            >
                            View
                            </Button>
                            <Button
                                className="deleteButton"
                                variant="danger"
                                onClick={() => handleDelete(person._id)}
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
                    onClick={() => handleClick(`/${userId}/renta/${rId}/tenant/new`)}
                >
                Create New Tenant
            </Button>
            <Button
                    className="createRentaBtn"
                    variant="secondary"
                    onClick={() => handleClick(`/${userId}/renta/${rId}`)}
                >
                Back
            </Button>
        </>
    )
}

export default TenantList
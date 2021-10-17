import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const TenantDetail = (props) => {
    const currentId = props.match.params.tId
    const [tenant, setTenant] = useState('')
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const { rId } = useParams()
    const { userId } = useParams()

    //fetch show
    const getTenant = async (id) => {
        const foundTenant = await fetch(`https://lit-sands-33874.herokuapp.com/${userId}/renta/${rId}/tenant/${id}`)
        const parsed = await foundTenant.json()
        setTenant(parsed)
        setLoading(!loading)
    }

    useEffect(() => {
        getTenant(currentId)
    }, [])

    const handleClick = path => history.push(path)

    return(
        <>
            {
                loading ? <h3><em>Loading...</em></h3> :
                <>
                    <div className="detailsHeader">
                        <h1>Details of your tenant</h1>
                    </div>
                    <Card className="detailsCard">
                        <Card.Body>
                            <Card.Title>Name: { tenant.name }</Card.Title>
                            <Card.Subtitle className="mb-2 text-white"><i>Age: { tenant.age }</i></Card.Subtitle>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </>
            }
            <Button
                    className="createRentaBtn"
                    variant="secondary"
                    onClick={() => handleClick(`/${userId}/renta/${rId}/tenant`)}
                >
                Back
            </Button>
            <Button
                    className="createRentaBtn"
                    variant="secondary"
                    onClick={() => handleClick(`/${userId}/renta/${rId}/tenant/${tenant._id}/edit`)}
                >
                Edit
            </Button>
        </>
    )
}

export default TenantDetail
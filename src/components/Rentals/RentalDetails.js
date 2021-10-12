import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RentalDetails = (props) => {
    const currentId = props.match.params.rId
    const [rental, setRental] = useState('')
    const [tenants, setTenants] = useState([])
    const [loading, setLoading] = useState(true)

    //fetch show
    const getRental = async (id) => {
        const foundRental = await fetch(`http://localhost:9000/renta/${id}`)
        const parsed = await foundRental.json()
        setRental(parsed.renta)
        setTenants(parsed.tenants)
        setLoading(!loading)
    }

    useEffect(() => {
        getRental(currentId)
    }, [])

    console.log(tenants)
    return(
        <>
            {
                loading ? <h3><em>Loading...</em></h3> :
                <div>
                    <h1>Details for your property</h1>
                    <p>Name: <strong>{ rental.name }</strong></p>
                    <p>Address: <strong>{ rental.address }</strong></p>
                    <p>Current Tenant Count: {tenants.length}</p>
                </div>
            }
            <Link to='/renta'>Back</Link>
            <br/>
            <Link to={`/renta/${rental._id}/edit`}>Edit</Link>
            <br/>
            { tenants.length ? <Link to={`/renta/${rental._id}/tenant`}>View Tenants</Link> : null }
        </>
    )
}

export default RentalDetails
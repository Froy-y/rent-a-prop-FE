import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserToken } from "../../../utils/authToken"
import { useParams } from "react-router-dom"

const RentalDetails = (props) => {
    const [rental, setRental] = useState('')
    const [tenants, setTenants] = useState([])
    const [loading, setLoading] = useState(true)
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
            const foundRental = await fetch(`http://localhost:9000/${userId}/renta/${rId}`, configs)
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

    return(
        <>
            {
                loading ? <h3><em>Loading...</em></h3> :
                <div>
                    <h1>Details for your property</h1>
                    <p>Name: <strong>{ rental.name }</strong></p>
                    <p>Address: <strong>{ rental.address }</strong></p>
                    <p>Current Tenant Count: { tenants.length }</p>
                </div>
            }
            <Link to='/${userId}/renta/'>Back</Link>
            <br/>
            <Link to={`/${userId}/renta/${rId}/edit`}>Edit</Link>
            <br/>
            { tenants && tenants.length ? (
                <div>
                    <Link to={`/${userId}/renta/${rId}/tenant`}>View Tenants</Link>
                    <Link to={`/${userId}/renta/${rId}/tenant/new`}>Create Tenants</Link>
                </div>
            ) : (<Link to={`/${userId}/renta/${rId}/tenant/new`}>Create Tenants</Link>) }
        </>
    )
}

export default RentalDetails
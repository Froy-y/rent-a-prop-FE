import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserToken } from '../utils/authToken'
import { useParams } from "react-router-dom"

const RentalDetails = (props) => {
    const [rental, setRental] = useState('')
    const [loading, setLoading] = useState(true)
    const {userId} = useParams()
    const {rentaId} = useParams()

    //fetch show
    const getRental = async(rentaId) => {
        try {
            const configs = {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `bearer ${getUserToken()}`,
                }
              }
            const foundRental = await fetch(`http://localhost:9000/${userId}/renta/${rentaId}`, configs)
            const parsed = await foundRental.json()
            setRental(parsed)
            setLoading(!loading)
        } catch (err) {
            console.log(err)
        }
        
    }

    useEffect(() => {
        getRental(rentaId)
    }, [])

    return(
        <>
            {
                loading ? <h3><em>Loading...</em></h3> :
                <div>
                    <h1>Details for your property</h1>
                    <p>Name: <strong>{ rental.name }</strong></p>
                    <p>Address: <strong>{ rental.address }</strong></p>
                </div>
            }
            <Link to='/renta'>Back</Link>
            <br/>
            <Link to={`/renta/${rental._id}/edit`}>Edit</Link>
        </>
    )
}

export default RentalDetails
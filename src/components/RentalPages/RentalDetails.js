import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AWSupload from '../AWSupload'

const RentalDetails = (props) => {
    const currentId = props.match.params.id
    const [rental, setRental] = useState('')
    const [loading, setLoading] = useState(true)

    //fetch show
    const getRental = async(id) => {
        const foundRental = await fetch(`http://localhost:9000/renta/${id}`)
        const parsed = await foundRental.json()
        setRental(parsed)
        setLoading(!loading)
    }

    useEffect(() => {
        getRental(currentId)
    }, [])

    return(
        <>
            {
                loading ? (<h3><em>Loading...</em></h3>) :
                (<div>
                    <div>
                        <h1>Details for your property</h1>
                        <p>Name: <strong>{ rental.name }</strong></p>
                        <p>Address: <strong>{ rental.address }</strong></p>
                    </div>
                    <div>
                        <AWSupload />
                    </div>
                </div>)
            }
            <Link to='/renta'>Back</Link>
            <br/>
            <Link to={`/renta/${rental._id}/edit`}>Edit</Link>
        </>
    )
}

export default RentalDetails
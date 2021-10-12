import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { getUserToken } from "../utils/authToken"

const RentalList = (props) => {
    const [rental, setRental] = useState([])
    const { userId } = useParams()

    //fetch for index
    const getRentals = async () => {
        try {
            console.log(getUserToken())
            const configs = {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `bearer ${getUserToken()}`,
                  }
              }
            const allRentals = await fetch(`http://localhost:9000/${userId}/renta`, configs)
            console.log(allRentals)
            const parsed = await allRentals.json()
            console.log(parsed)
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
                <Link to={`/${userId}/renta/new`}>Create New Rental</Link>
                <br/>
                <Link to="/">Dismiss</Link>
            </div>
        </>
    )
}

export default RentalList
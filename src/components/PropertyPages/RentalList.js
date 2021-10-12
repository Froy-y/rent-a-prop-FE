import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RentalList = (props) => {
    const [rental, setRental] = useState([])

    //fetch for index
    const getRentals = async () => {
        try {
            const allRentals = await fetch('http://localhost:9000/renta')
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
                <Link to="/renta/new">Create New Rental</Link>
                <br/>
                <Link to="/">Dismiss</Link>
            </div>
        </>
    )
}

export default RentalList
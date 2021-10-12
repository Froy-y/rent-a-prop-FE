import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import {getUserToken} from '../../utils/authToken'

const EditRental = (props) => {
    const initialState = {
        name: '',
        address: ''
    }
    const [input, setInput] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const {userId} = useParams()
    const {rId} = useParams()
    
    const getRental = async (rId) => {
        try {
            const configs = {
                method: "GET",
                body: JSON.stringify(),
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `bearer ${getUserToken()}`,
                }
            }
            const id = props.match.params.rId
            const foundRental = await fetch(`http://localhost:9000/${userId}/renta/${id}`, configs)
            const parsed = await foundRental.json()
            setInput(parsed)
            setLoading(false)
        } catch (err) {
            console.log(err)
            props.history.push('/renta')
        }
    }

    const updateRental = async (rId, data) => {
        const configs = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${getUserToken()}`,
            },
        }
        const updateRental = await fetch(`http://localhost:9000/${userId}/renta/${rId}`, configs)
        const parsed = await updateRental.json()
        props.history.push(`/${userId}/renta/${rId}`)
    }

    useEffect(() =>{
        getRental()
    }, [])


    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, address } = input
        const rentalData = { name, address }
        updateRental(input._id, rentalData)
    }


    return(
        <>
            {
                loading ? <h3>Loading...</h3> :
                <form onSubmit= { handleSubmit }>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" value={ input.name } onChange= { handleChange }/>
                    </div>
                    <div>
                        <label htmlFor="address">address</label>
                        <input id="address" name="address" value={ input.address } onChange= { handleChange }/>
                    </div>
                    <div>
                        <input type="submit" value="Edit Rental" />
                    </div>
                </form>
            }
            <Link to={`/${userId}/renta`}>Back</Link>
        </>
    )
}

export default EditRental
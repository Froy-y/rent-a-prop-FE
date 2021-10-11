import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const EditRental = (props) => {
    const initialState = {
        name: '',
        address: ''
    }
    const [input, setInput] = useState(initialState)
    const [loading, setLoading] = useState(true)
    
    const getRental = async (id) => {
        try {
            const id = props.match.params.id
            const foundRental = await fetch(`https://git.heroku.com/lit-sands-33874.git/renta/${id}`)
            const parsed = await foundRental.json()
            setInput(parsed)
            setLoading(false)
        } catch (err) {
            console.log(err)
            props.history.push('/renta')
        }
    }

    const updateRental = async (id, data) => {
        const configs = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        }
        const updateRental = await fetch(`https://git.heroku.com/lit-sands-33874.git/renta/${id}`, configs)
        const parsed = await updateRental.json()
        props.history.push(`/renta/${id}`)
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
            <Link to="/renta">Back</Link>
        </>
    )
}

export default EditRental
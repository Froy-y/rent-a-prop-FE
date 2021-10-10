import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NewRental = (props) => {
    const initialState = {
        name: '',
        address: ''
    }
    const [input, setInput] = useState(initialState)

    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    //fetch for post
    const newRental = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const createdRental = await fetch("http://localhost:9000/renta", configs)
            console.log(createdRental)
            const parsed = await createdRental.json()
            console.log(parsed)
            props.history.push('/renta')
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setInput(initialState)
        newRental(input)
    }

    return(
        <>
            <div>
                <form onSubmit={ handleSubmit }>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" value={ input.name } onChange={handleChange}/>
                    
                    <label htmlFor="address">address</label>
                    <input id="address" name="address" value={ input.address } onChange={handleChange}/>

                    <input type="submit" value="Add a property" />
                </form>
                <Link to="/renta">Back</Link>
            </div>
        </>
    )
}

export default NewRental
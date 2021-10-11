import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NewRental = (props) => {
    const initialState = {
        name: '',
        address: ''
    }
    const [input, setInput] = useState(initialState)

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

            const createdRental = await fetch('https://git.heroku.com/lit-sands-33874.git/renta', configs)
            const parsed = await createdRental.json()
            props.history.push('/renta')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
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
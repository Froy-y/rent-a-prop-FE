import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NewTenant = (props) => {
    const initialState = {
        name: '',
        age: ''
    }
    const [rental, setRental] = useState('')
    const [input, setInput] = useState(initialState)

    const newTenant = async(data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const createdTenant = await fetch('http://localhost:9000/tenant', configs)
            const parsed = await createdTenant.json()
            props.history.push('/tenant')

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
        newTenant(input)
    }

    return(
        <>
            <div>
                <form onSubmit={ handleSubmit }>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input name="name" name="name" value = { input.name } onChange={ handleChange }/>
                    </div>
                    <div>
                        <label htmlFor="age">age</label>
                        <input age="age" name="age" value = { input.age } onChange={ handleChange }/>
                    </div>
                    <div>
                        <input type="submit" value="Add a tenant" />
                    </div>
                </form>
                <Link to={`/renta/${rental._id}/tenant`}>Back</Link>
                <br/>
                <Link to={`/renta/`}>BackIF THAT ONE DONT WORK</Link>
            </div>
        </>
    )
}

export default NewTenant
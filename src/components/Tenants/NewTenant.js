import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const NewTenant = (props) => {
    const { rId } = useParams()
    const { userId } = useParams()

    const initialState = {
        name: '',
        age: '',
        renta: rId || ''
    }
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

            const createdTenant = await fetch(`http://localhost:9000/${userId}/renta/${rId}/tenant`, configs)
            const parsed = await createdTenant.json()
            props.history.push(`/${userId}/renta/${rId}/tenant`)

        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        newTenant(input)
        setInput(initialState)
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
                <Link to={`/${userId}/renta/${rId}/tenant`}>Back</Link>
                <br/>
                <Link to={`/${userId}/renta/`}>BackIF THAT ONE DONT WORK</Link>
            </div>
        </>
    )
}

export default NewTenant
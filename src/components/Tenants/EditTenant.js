import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const EditTenant = (props) => {
    const initialState = {
        name: '',
        age: ''
    }
    const [input, setInput] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const { rId } = useParams()

    const getTenant = async (id) => {
        try {
            const id = props.match.params.id
            const foundTenant = await fetch (`http://localhost:9000/renta/${rId}/tenant/${id}`)
            const parsed = await foundTenant.json()
            setInput(parsed)
            setLoading(false)
        } catch (err) {
            console.log(err)
            props.history.push(`/renta`)
        }
    }

    const updateTenant = async (id, data) => {
        const configs = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const updateTenant = await fetch(`http://localhost/renta/${rId}/tenant/${id}`, configs)
        const parsed = await updateTenant.json()
        props.history.push('/renta')
    }

    useEffect(() => {
        getTenant()
    }, [])

    const handleChange = (e) => {
        setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, age } = input
        const tenantData = { name, age }
        updateTenant(input._id, tenantData)
    }

    return(
        <>
            {
                loading ? <h3><em>Loading ...</em></h3> :
                <form onSubmit={ handleSubmit }>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input id="name" name="name" value={ input.name } onChange={ handleChange } />
                    </div>
                    <div>
                        <label htmlFor="age">age</label>
                        <input id="age" name="age" value={ input.age } onChange={ handleChange } />
                    </div>
                    <div>
                        <input type="submit" value="Edit Tenant" />
                    </div>
                </form>
            }
            <Link to="/renta">Back</Link>
        </>
    )
}

export default EditTenant
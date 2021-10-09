import React, { useEffect, useState } from 'react'

const TenantDetail = (props) => {
    const currentId = props.match.params.id
    const [tenant, setTenant] = useState('')
    const [loading, setLoading] = useState(true)

    //fetch show
    const getTenant = async(id) => {
        const foundTenant = await fetch(`http://localhost:9000/renta/${id}`)
        const parsed = foundTenant.json()
        setTenant(parsed)
        setLoading(!loading)
    }

    useEffect(() => {
        getTenant(currentId)
    }, [])

    return(
        <>
            {
                loading ? <h3><em>Loading...</em></h3> :
                <div>
                    <h1>Details of your tenant!</h1>
                    <p>Name: <strong>{ tenant.name }</strong></p>
                    <p>Age: <strong>{ tenant.age }</strong></p>
                </div>
            }
            <Link to={`/renta/${ tenant.renta._id }`}>Back Home</Link>
            <br/>
            <Link >Edit</Link>
        </>
    )
}

export default TenantDetail
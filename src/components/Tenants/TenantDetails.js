import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const TenantDetail = (props) => {
    const currentId = props.match.params.id
    const [tenant, setTenant] = useState('')
    const [loading, setLoading] = useState(true)
    const { rId } = useParams()

    //fetch show
    const getTenant = async (id) => {
        const foundTenant = await fetch(`http://localhost:9000/renta/${rId}/tenant/${id}`)
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
            <Link to={`/renta/${ tenant.renting._id }`}>Back to House</Link>
            <br/>
            <Link to={`/renta/${ tenant.renting._id }/tenant/${tenant._id}`}>Edit</Link>
        </>
    )
}

export default TenantDetail
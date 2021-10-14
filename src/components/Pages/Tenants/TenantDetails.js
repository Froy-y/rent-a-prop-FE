import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const TenantDetail = (props) => {
    const currentId = props.match.params.tId
    const [tenant, setTenant] = useState('')
    const [loading, setLoading] = useState(true)
    const { rId } = useParams()
    const { userId } = useParams()

    //fetch show
    const getTenant = async (id) => {
        const foundTenant = await fetch(`http://localhost:9000/${userId}/renta/${rId}/tenant/${id}`)
        const parsed = await foundTenant.json()
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
            <Link to={`/${userId}/renta/${ rId  }`}>Back to House</Link>
            <br/>
            <Link to={`/${userId}/renta/${rId}/tenant/${ tenant._id }/edit`}>Edit</Link>
        </>
    )
}

export default TenantDetail
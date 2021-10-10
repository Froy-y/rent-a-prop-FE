import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const TenantList = (props) => {
    const [tenant, setTenant] = useState('')
    const [rental, setRental] = useState('')
    const { rId } = useParams()
    const { tId } = useParams()

    const getTenants = async (id) => {
        try {
            const allTenants = await fetch(`http://localhost:9000/${id}/tenant`)
            console.log('all tenants', allTenants)
            const parsed = await allTenants.json()
            console.log('parsed', parsed)
            setTenant(parsed)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTenants()
    }, [])

    const handleDelete = async (id) => {
        try {
            const config = {
                method: 'DELETE'
            }

            const deleteTenant = await fetch(`http://localhost:9000/${rId}/tenant/${id}`, config)
            const parsed = await deleteTenant.json
            const updateTenants = tenant.filter(person => person._id !== parsed._id)
            setTenant(updateTenants)
        } catch (err) {
            console.log(err)   
        }
    }
    console.log(tenant)
    return(
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenant && tenant.map(person => (
                            <tr key={ person._id }>
                                <td>{ person.name }</td>
                                <td>{ person.age }</td>
                                <td onClick={() => handleDelete(person._id)}>X</td>
                                <td><Link to={`/renta/${rId}/tenant/${person._id}`}>Show</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to={ `/renta/${rId}/tenant/new` }>Create New Tenant</Link>
                <br />
                <Link to={ `/renta/` }>Back</Link>
            </div>
        </>
    )
}

export default TenantList
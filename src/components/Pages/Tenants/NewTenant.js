import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

const NewTenant = (props) => {
    const history = useHistory()
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

            const createdTenant = await fetch(`https://lit-sands-33874.herokuapp.com/${userId}/renta/${rId}/tenant`, configs)
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

    const handleClick = path => history.push(path)

    return(
        <>
            <div className="detailsHeader">
                <h1>Create a new tenant!!!</h1>
            </div>
            <div>
                <Card className="detailsCard">
                    <Card.Body>
                        <Form onSubmit={ handleSubmit }>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control placeholder="Enter Name" id="name" name="name" value={ input.name } onChange={ handleChange }/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" readOnly/>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAge">
                                <Form.Label htmlFor="age">Age</Form.Label>
                                <Form.Control placeholder="1+1=21" id="age" name="age" value={ input.age } onChange={ handleChange }/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control placeholder="Apartment, studio, or floor" readOnly/>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control readOnly/>
                                </Form.Group>

                                {/* <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Select>
                                </Form.Group> */}

                                <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control readOnly />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" id="formGridCheckbox">
                                <Form.Check type="null" label="Check me out"/>
                            </Form.Group>

                            <Button variant="light" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>    
            </div>
            <Button
                    className="createRentaBtn"
                    variant="secondary"
                    onClick={() => handleClick(`/${userId}/renta/${rId}`)}
                >
                Back
            </Button>
        </>
    )
}

export default NewTenant
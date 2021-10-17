import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"

const Home = props => {
    return(
        <>
            <div className="homePage">
                <div className="homeCard">
                    <Card className="homeContentCard">
                        <Card.Body>
                            <Card.Title><h1>Welcome to Rent-A-Prop!!!</h1></Card.Title>
                            <Card.Text>
                                <p>
                                    <li>
                                        Rent-A-Prop is a website specifically made for real estate investors!!
                                    </li>
                                    <li>
                                        This wonderful site will help you keep track of all your owned rental properties along with the tenants that live there!!
                                    </li>
                                    <li>
                                        Features include keeping track of the monthly mortgage payments, the history of the property and more!
                                        We hope you enjoy this amazing tool built to make your life easier.
                                    </li>
                                    <li>
                                        <Link to={`/register`}>Register</Link> now!
                                    </li>
                                </p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Home
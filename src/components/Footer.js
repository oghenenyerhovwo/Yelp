import React from 'react'
import { Navbar, Container, Nav} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCopyright} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Nav>
                        <Nav.Link disabled to="/">
                            <FontAwesomeIcon icon={faCopyright} />
                            {" "}Yelp Camp 2017 |
                        </Nav.Link>
                        <Link className="nav-link" to="/campgrounds">Home |</Link>
                        <Link className="nav-link" to="/newcampground">New Campground</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default Footer

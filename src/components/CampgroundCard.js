import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons"
import {Card, Button,  Col, } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CampgroundCard = props => {
    const {campground} = props

    return (
        <>
            <Col xs={12} md={6} lg={4}>
                <Card style={{marginTop: "30px"}} >
                     <Card.Img 
                        style={{height: "400px"}} 
                        variant="top" 
                        src={campground.image} 
                        alt={campground.name}
                    />
                     <Card.Body>
                         <Card.Title>{campground.title}</Card.Title>
                         <Card.Text>{
                            campground.description.slice(0, 120)
                         }... </Card.Text>
                         <Link to={`/showcampground/${campground._id}`}>
                            <Button 
                                variant="outline-primary" 
                                block
                            >
                                Detail {" "} <FontAwesomeIcon icon={faAngleDoubleRight} />
                            </Button>
                         </Link>
                         
                     </Card.Body>
                 </Card>
             </Col>
        </>
    )
}

export default CampgroundCard

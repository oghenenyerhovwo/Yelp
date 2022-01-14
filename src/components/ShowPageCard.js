import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDoubleRight, faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

// Components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// functions
import { deleteCampground } from '../actions/campgroundActions'


const ShowPageCard = props => {
    const {setToggleComment, toggleComment, dataDetailCampground } = props
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.userState)
    const {
       loadingDeleteCampground,
        errorDeleteCampground,
    } = useSelector(state => state.campgroundState)

    return (
        <div>
            <Card style={{
                     border: "2px solid rgb(210, 219, 231)",
                     borderRadius: "10px"
                 }} >
                     <Card.Img style={{height: "500px"}}  variant="top" src={dataDetailCampground.image} />
                     
                     <Card.Body>
                         <Card.Title>
                             {dataDetailCampground.title} 
                             <div style={{float: "right"}}>${dataDetailCampground.price}/night </div> 
                         </Card.Title>
                         <Card.Text>{dataDetailCampground.description} </Card.Text>
                         <br />
                         <div>
                             <em> 
                                 Submitted by {dataDetailCampground.author && dataDetailCampground.author.name} at {dataDetailCampground.createdAt && dataDetailCampground.createdAt.slice(0,10) }
                             </em>
                        <div>
                        {
                            (currentUser.token && dataDetailCampground.author) &&
                            <>
                            {
                                 dataDetailCampground.author._id === currentUser._id && 
                                <Link to={`/editcampground/${dataDetailCampground._id}`}>
                                    <Button
                                        size="sm"
                                        variant="warning"
                                        style={{marginRight: "0.2rem"}}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                            }
                            {
                                (dataDetailCampground.author.role === "admin" || dataDetailCampground.author.role === "superAdmin") && !(dataDetailCampground.author._id === currentUser._id)? null:
                                !(dataDetailCampground.author._id === currentUser._id) && !(currentUser.role === "admin") ? null :
                                <>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => dispatch(deleteCampground(dataDetailCampground._id))}
                                    >
                                            Delete
                                    </Button>
                                    {loadingDeleteCampground && <LoadingBox />}
                                    {errorDeleteCampground &&  <MessageBox>{errorDeleteCampground} </MessageBox>}
                                </>
                            }
                                     
                            </>

                            }
                                    
                        </div>
                    </div> <br />
                    <Button 
                        variant="outline-success"
                        style={{float: "right"}}
                         onClick= {() => setToggleComment(toggle => !toggle)}
                    >
                        {
                            !toggleComment ? <span>  Show Comments {" "} <FontAwesomeIcon icon={faAngleDoubleRight} /> </span>:
                            <span>  Hide Comments {" "} <FontAwesomeIcon icon={faAngleDoubleDown} /> </span>
                        }
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ShowPageCard

import React, { useEffect, useState } from 'react'
import {Row, Col,Container,ListGroup,} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

// Components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ShowPageCard from '../components/ShowPageCard'
import Comment from '../components/Comment'

// functions
import { detailCampground, } from '../actions/campgroundActions'

// constants
import { DELETE_CAMPGROUND_RESET } from '../constants/campgroundConstant'
import { SET_SUCCESS_MESSAGE } from '../constants/generalConstant'

const ShowCampgroundScreen = props => {
    // hooks
    const [toggleComment, setToggleComment] = useState(false)
    const dispatch = useDispatch()

    const {
        dataDetailCampground,
        loadingDetailCampground,
        errorDetailCampground,

        successDeleteCampground,
    } = useSelector(state => state.campgroundState)
    const campgroundId= props.match.params.id

    useEffect(() => {
        if(successDeleteCampground){
            props.history.push("/campgrounds")
            dispatch({type: SET_SUCCESS_MESSAGE, payload: "Deleted campground successfully"})
            dispatch({type: DELETE_CAMPGROUND_RESET})
        }
        dispatch(detailCampground(campgroundId))        
    }, [dispatch,campgroundId,props.history, successDeleteCampground,dataDetailCampground.imageUrl ])

    return (
        <Container>
            {
                loadingDetailCampground ? <LoadingBox />:
                errorDetailCampground ? <MessageBox>{errorDetailCampground} </MessageBox>:
                <Row>
                    <Col style={{marginTop: "20px"}} xm={12} sm={4}>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active>
                                Info 1
                            </ListGroup.Item>
                            <ListGroup.Item as="li">Info 2</ListGroup.Item>
                            <ListGroup.Item as="li">Info 3</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col style={{marginTop: "20px"}} xm={12} sm={8}>
                        <ShowPageCard 
                            dataDetailCampground={ dataDetailCampground}
                            setToggleComment={setToggleComment}
                            toggleComment={toggleComment}
                        />
                        <Comment 
                            toggleComment={toggleComment} 
                            campgroundIdProp={dataDetailCampground._id}
                        />
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default ShowCampgroundScreen

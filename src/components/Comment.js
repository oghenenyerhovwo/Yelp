import React, { useState, useEffect } from 'react'
import { Button, ListGroup, Card, Form} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment,faTrash} from "@fortawesome/free-solid-svg-icons"
import { useSelector, useDispatch } from 'react-redux'

// components
import LoadingBox from './LoadingBox'
import MessageBox from './MessageBox'

// functions
import { createComment, listComment, deleteComment } from '../actions/commentActions'

// constants
import { CREATE_COMMENT_RESET, DELETE_COMMENT_RESET } from '../constants/commentConstant'

const Comment = props => {
    // hooks
    const {currentUser} = useSelector(state => state.userState)
    const [text, setText] = useState("")
    const {
        loadingCreateComment,
        errorCreateComment,

        successCreateComment,
        dataListComment,
        loadingListComment,
        errorListComment,

        loadingDeleteComment,
        errorDeleteComment,
        successDeleteComment,
    } = useSelector(state => state.commentState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(props.toggleComment){
            dispatch(listComment(props.campgroundIdProp))
        }
        if(successCreateComment){
            dispatch({type: CREATE_COMMENT_RESET})
        }
        if(successDeleteComment){
            dispatch({type: DELETE_COMMENT_RESET})
        }
        
    }, [dispatch,props.toggleComment, successDeleteComment, successCreateComment, props.campgroundIdProp])
    
    // functions
    const submitHandler = e => {
        e.preventDefault()
        dispatch(createComment(props.campgroundIdProp, {text,}))
    }

    return (
        <div>
            {
                props.toggleComment && <Card style={{
                    border: "2px solid rgb(210, 219, 231)",
                    borderRadius: "10px",
                    marginTop: "30px",
                }} >
                    <Card.Body> 
                        <h5 style={{display: "inline"}}> Comment Section </h5>
                        <span style={{float: "right", fontSize: "1.25rem"}}>
                            <FontAwesomeIcon icon={faComment} />
                        </span>
                        <br /> <br /> <br />
                        <>
                            {loadingDeleteComment && <LoadingBox />}
                            {errorDeleteComment && <MessageBox variant="danger">{errorDeleteComment} </MessageBox>}
                            {
                                loadingListComment ? <LoadingBox /> :
                                errorListComment ? <MessageBox variant="danger">{errorListComment} </MessageBox>:
                                <ListGroup variant="flush">
                                    {
                                        dataListComment && dataListComment.map(comment => (
                                            <div className="commentLi">
                                                <div style={{display: "inline"}} className="commentTitle"> 
                                                    {comment.author.name} 
                                                </div>
                                                {
                                                    (comment.author.role === "admin" || comment.author.role === "superAdmin") && !(comment.author._id === currentUser._id)? null:
                                                    !(comment.author._id === currentUser._id) && !(currentUser.role === "admin") ? null :
                                                    <span className="delete-icon">
                                                        <FontAwesomeIcon 
                                                            icon={faTrash}
                                                            onClick={() => dispatch(deleteComment(props.campgroundIdProp, comment._id))} 
                                                        />
                                                    </span>
                                                }


                                                
                                                <p>{comment.text} </p> 
                                            </div>
                                        ))
                                    }
                                </ListGroup>
                            }
                            
                        </>

                        <br /> <br /> <br /> <br />
                        <Form onSubmit={submitHandler}> 
                            <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Control 
                                    as="textarea" 
                                    rows={3}
                                    placeholder="Comments...." 
                                    onChange={e =>setText(e.target.value) }
                                    value={text}
                                />
                            </Form.Group>
                            {errorCreateComment && <MessageBox variant="danger">{errorCreateComment} </MessageBox>}
                            <Button 
                                block 
                                variant="success" 
                                type="submit"
                            >
                                Post Comment {"  "}
                                {loadingCreateComment && <LoadingBox/>}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default Comment

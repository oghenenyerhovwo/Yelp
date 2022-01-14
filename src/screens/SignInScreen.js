import React, { useEffect, useState } from 'react'
import { Form , Button, Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// function
import { signInUser } from '../actions/userAction'

// constant
import { SIGNIN_USER_RESET } from '../constants/userConstants'
import { SET_SUCCESS_MESSAGE, SET_ERROR_MESSAGE } from '../constants/generalConstant'
import { Link } from 'react-router-dom'

const SignInScreen = props => {
    const {
        loadingSignInUser,
        errorSignInUser,
        successSignInUser,
        currentUser,
    } = useSelector(state => state.userState)
    const dispatch = useDispatch()
    const initialState= {
        email: "",
        password: "",
    }
    const [form, setForm] = useState(initialState)

    const previousUrl=props.location.search && props.location.search.split("=")[1]
    const redirect=props.location.search ? `/${previousUrl}`: "/campgrounds"

    useEffect(() => {
        if(currentUser.token){
            if(successSignInUser){
                dispatch({type: SET_SUCCESS_MESSAGE, payload: "Welcome to Yelp Camp, " + currentUser.name})
                dispatch({type: SIGNIN_USER_RESET})
            }
            props.history.push(redirect)
        }else if(redirect === "/newcampground") {
            dispatch({type: SET_ERROR_MESSAGE, payload: "You need to be logged in to do that"})
        }// eslint-disable-next-line
    }, [successSignInUser,props.history, dispatch, currentUser])

    // functions
    const handleChange = e => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        dispatch(signInUser(form))
    }
    return (
        <div>
            (
        <Row>
            <Col xm={12} sm={3}></Col>
            <Col xm={12} sm={6}>
            <h4 style={{textAlign: "center"}}>Sign In</h4>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email" 
                        onChange={handleChange}
                        value={form.email}
                        name="email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Image URl</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        onChange={handleChange}
                        value={form.password}
                        name="password"
                        required
                    />
                </Form.Group>
                {errorSignInUser && <MessageBox variant="danger">{errorSignInUser} </MessageBox>}
                <Button block variant="warning" type="submit">
                    Sign In {" "}
                    {loadingSignInUser && <LoadingBox/>}
                </Button>
                <br />
                Do not have an account? <Link to="/register" >Create an Account here</Link>
            </Form> 
            </Col>
            <Col xm={12} sm={3}></Col>
        </Row>
        </div>
    )
}

export default SignInScreen

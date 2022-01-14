import React, { useEffect, useState } from 'react'
import { Form , Button, Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// function
import {  registerUser } from '../actions/userAction'

// constant
import { REGISTER_USER_RESET, REGISTER_USER_FAIL } from '../constants/userConstants'
import { SET_SUCCESS_MESSAGE } from '../constants/generalConstant'
import { Link } from 'react-router-dom'

const RegisterScreen = props => {
    const {
        loadingRegisterUser,
        errorRegisterUser,
        successRegisterUser,
        currentUser,
    } = useSelector(state => state.userState)
    const dispatch = useDispatch()
    const initialState= {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    }
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        if(successRegisterUser ||  currentUser.token){
            dispatch({type: SET_SUCCESS_MESSAGE, payload: "Welcome to Yelp Camp, " + currentUser.name})
            dispatch({type: REGISTER_USER_RESET})
            props.history.push("/campgrounds")
        }
    }, [successRegisterUser,props.history, dispatch, currentUser])

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
        if(form.password=== form.confirmPassword){
            dispatch(registerUser(form))
        } else {
            dispatch({type: REGISTER_USER_FAIL, payload: "Password did not match"})
        }
    }
    return (
        <div>
            (
        <Row>
            <Col xm={12} sm={3}></Col>
            <Col xm={12} sm={6}>
            <h4 style={{textAlign: "center"}}>Register</h4>
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Name" 
                        onChange={handleChange}
                        value={form.name}
                        name="name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        onChange={handleChange}
                        value={form.password}
                        name="password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm password" 
                        onChange={handleChange}
                        value={form.confirmPassword}
                        name="confirmPassword"
                        required
                    />
                </Form.Group>
                {errorRegisterUser && <MessageBox variant="danger">{errorRegisterUser} </MessageBox>}
                <Button block variant="warning" type="submit">
                    Sign Up  {" "}
                    {loadingRegisterUser && <LoadingBox/>}
                </Button>
                <br />
                Already have an account? <Link to="/signin" >Log in to your account</Link>
            </Form> 
            </Col>
            <Col xm={12} sm={3}></Col>
        </Row>
        </div>
    )
}

export default RegisterScreen

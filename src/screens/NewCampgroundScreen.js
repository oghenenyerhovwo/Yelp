import React, { useEffect, useState } from 'react'
import { Form,Image, Button, Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// function
import { createCampground } from '../actions/campgroundActions'

// constants
import { CREATE_CAMPGROUND_RESET, } from '../constants/campgroundConstant'
import { UPLOAD_FILE_RESET, } from '../constants/fileConstant'
import { SET_SUCCESS_MESSAGE, } from '../constants/generalConstant'
import { uploadFile } from '../actions/fileActions'

const NewCampgroundScreen = props => {
    // hooks
    const {
        loadingCreateCampground,
        errorCreateCampground,
        successCreateCampground,
        createdCampground,
    } = useSelector(state => state.campgroundState)
    const {
        loadingUploadFile,
        errorUploadFile,
        successUploadFile,
        dataUploadFile,
    } = useSelector(state => state.fileState)
    
    const dispatch = useDispatch()
    const initialState= {
        title:"",
        image: "",
        description: "",
        location: "",
        price: "",
    }
    const [form, setForm] = useState(initialState)

    useEffect(() => {
        if(successCreateCampground){
            props.history.push(`/showcampground/${createdCampground._id}`)
            dispatch({type: SET_SUCCESS_MESSAGE, payload: "Campground created successfully"})
            dispatch({type: CREATE_CAMPGROUND_RESET})
        }
        if(successUploadFile){
            setForm(prevForm => {
                return{
                    ...prevForm,
                    image: dataUploadFile
                }
            })
            dispatch({type: UPLOAD_FILE_RESET})
        }
    }, [props.history,dataUploadFile,dispatch,successUploadFile, successCreateCampground, createdCampground])

    // functions
    const handleChange = e => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const uploadFleHandler = e => {
        if(e.target.files[0]){
            dispatch(uploadFile(e.target.files[0]))
        }
        
    }

    const submitHandler = e => {
        e.preventDefault()
        const data={...form, price: Number(form.price)}
        dispatch(createCampground(data))
    }

    return (
        <Row>
            <Col xm={12} sm={3}></Col>
            <Col xm={12} sm={6}>
            <h4 style={{textAlign: "center"}}>Create New Campground</h4>
            
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter title" 
                        onChange={handleChange}
                        value={form.title}
                        name="title"
                    />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label >Select Image</Form.Label> 
                    <Form.Control onChange={uploadFleHandler} type="file" /> 
                    {loadingUploadFile && <LoadingBox/>}
                    {errorUploadFile && <MessageBox variant="danger">{errorUploadFile} </MessageBox>}
                    {form.image && <Image
                        style={{height: "50px",width: "50px"}} 
                        variant="top" 
                        src={form.image} 
                        alt={form.name}
                    />}
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Price" 
                        onChange={handleChange}
                        value={form.price}
                        name="price"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Location" 
                        onChange={handleChange}
                        value={form.location}
                        name="location"
                    />
                </Form.Group>
                <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3}
                        placeholder="Enter Description" 
                        onChange={handleChange}
                        value={form.description}
                        name="description"
                    />
                </Form.Group>
                {errorCreateCampground && <MessageBox variant="danger">{errorCreateCampground} </MessageBox>}
                <Button block variant="info" type="submit">
                    Create  {"  "}
                    {loadingCreateCampground && <LoadingBox/>}
                </Button>
            </Form> 
            </Col>
            <Col xm={12} sm={3}></Col>
        </Row>
    )
}

export default NewCampgroundScreen

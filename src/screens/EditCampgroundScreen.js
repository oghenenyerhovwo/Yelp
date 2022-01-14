import React, { useEffect, useState } from 'react'
import { Form ,Image, Button, Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// function
import { detailCampground, updateCampground } from '../actions/campgroundActions'
import { uploadFile } from '../actions/fileActions'

// constants
import { UPDATE_CAMPGROUND_RESET } from '../constants/campgroundConstant'
import {  UPLOAD_FILE_RESET } from '../constants/fileConstant'

const EditCampgroundScreen = props => {
    // hooks
    const {
        dataDetailCampground,
        loadingUpdateCampground,
        errorUpdateCampground,
        successUpdateCampground,
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
    const campgroundId= props.match.params.id

    useEffect(() => {
        if(successUpdateCampground){
            dispatch({type: UPDATE_CAMPGROUND_RESET})
            props.history.push(`/showcampground/${dataDetailCampground._id}`)
        }
        
        if(!dataDetailCampground._id || dataDetailCampground._id !== campgroundId){
            dispatch(detailCampground(campgroundId))
        } else {
            setForm(
                {
                    title:dataDetailCampground.title,
                    image: dataDetailCampground.image,
                    description: dataDetailCampground.description,
                    location: dataDetailCampground.location,
                    price: dataDetailCampground.price,
                }
            )
        }
    }, [dispatch,  props.history, successUpdateCampground, dataDetailCampground, campgroundId])
    useEffect(() => {
        if(successUploadFile){
            setForm(prevForm => {
                return{
                    ...prevForm,
                    image: dataUploadFile
                }
            })
            dispatch({type: UPLOAD_FILE_RESET})
        }
    }, [successUploadFile,dataUploadFile,dispatch])
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
        const data={
            title:form.title,
            description: form.description,
            location: form.location,
            price: Number(form.price),
            image:form.image, 
        }
        dispatch(updateCampground(dataDetailCampground._id, data))
    }

    const uploadFleHandler = e => {
        if(e.target.files[0]){
            dispatch(uploadFile(e.target.files[0]))
        }
        
    }

    return (
        <Row>
            <Col xm={12} sm={3}></Col>
            <Col xm={12} sm={6}>
            <h4 style={{textAlign: "center"}}>Edit Campground</h4>
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
                    <Button onClick={()=> setForm({...form, image: dataDetailCampground.image})} variant="light" size="sm">Reset</Button>
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
                {errorUpdateCampground && <MessageBox variant="danger">{errorUpdateCampground} </MessageBox>}
                <Button block variant="info" type="submit">
                    Create {"  "}
                    {loadingUpdateCampground && <LoadingBox/>}
                </Button>
            </Form> 
            </Col>
            <Col xm={12} sm={3}></Col>
        </Row>
    )
}

export default EditCampgroundScreen

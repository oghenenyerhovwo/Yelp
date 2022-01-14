import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Row, } from 'react-bootstrap'
import { Container } from 'react-bootstrap'

// components
import LoadingBox from "../components/LoadingBox.js"
import MessageBox from "../components/MessageBox.js"

// functions
import { listCampgrounds } from '../actions/campgroundActions.js'
import JumbotronComponent from '../components/Jumbotron.js'
import CampgroundCard from '../components/CampgroundCard.js'
import { GET_CAMPGROUND_ARRAY } from '../constants/campgroundConstant.js'

const HomeScreen = props => {
    // hooks
    const {
        dataListCampgrounds,
        loadingListCampgrounds,
        errorListCampgrounds,
        searchArray,
        isNeedReload,
        databaseCampground,
    } = useSelector(state => state.campgroundState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isNeedReload){
            dispatch(listCampgrounds())
            dispatch({type: GET_CAMPGROUND_ARRAY, payload: searchArray })
        } else {
            dispatch({
                type: GET_CAMPGROUND_ARRAY, 
                payload: searchArray.length === 0 ? databaseCampground : searchArray
            })
        }
        
    }, [dispatch,searchArray, isNeedReload, databaseCampground])

    return (
        <Container className="home-screen">
            <JumbotronComponent />
            {
                loadingListCampgrounds ? <LoadingBox />:
                errorListCampgrounds ? <MessageBox variant="danger">{errorListCampgrounds} </MessageBox>:
                <Row>
                    {
                        dataListCampgrounds && dataListCampgrounds.map(campground => (
                            <CampgroundCard key={campground._id} campground={campground} />
                        ))
                    }
                </Row>
            }
        </Container>
    )
}

export default HomeScreen

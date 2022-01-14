import React, { useEffect } from 'react'
import { Navbar, Container, Nav, NavDropdown, FormControl, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOutUser } from '../actions/userAction'
import { CAMPGROUND_SEARCH_DATA, CAMPGROUND_SEARCH_ARRAY } from '../constants/campgroundConstant'

const Header = props => {
    const {
        currentUser,
    } = useSelector(state => state.userState)
    const {
        databaseCampground,
        searchData,
        isNeedResearch
    } = useSelector(state => state.campgroundState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isNeedResearch){
            dispatch({type: CAMPGROUND_SEARCH_DATA, payload: searchData})
            const searchedCampground = databaseCampground.filter(({title}) => title.toLowerCase().startsWith(searchData.toLowerCase()))
            dispatch({type: CAMPGROUND_SEARCH_ARRAY, payload: searchedCampground })
        }
    }, [dispatch, isNeedResearch, searchData, databaseCampground])

    const handleClick = e => {
        searchHandler(e)
    }

    const searchHandler =  e => {
        const {value} =e.target
        const searchId= document.location.href === "http://localhost:3000/campgrounds"? value : searchData
        dispatch({type: CAMPGROUND_SEARCH_DATA, payload: value})
        const searchedCampground = databaseCampground.filter(({title}) => title.toLowerCase().startsWith(searchId.toLowerCase()))
        dispatch({type: CAMPGROUND_SEARCH_ARRAY, payload: searchedCampground })
    }

    return (
        <div>
            <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Link className="nav-link" to="/">
                        <Navbar.Brand>
                            <img
                                src="/logo192.png"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt=""
                            />{" "} Yelp Camp
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search..."
                                className="mr-2"
                                aria-label="Search"
                                onChange={searchHandler}
                            />
                            <Link to="/campgrounds" onClick={handleClick} >
                                <Button variant="outline-success">Search</Button>
                            </Link>
                        </Form>
                        <Nav className="justify-content-center float-md-right">
                            <Link className="nav-link" to="/campgrounds">Home</Link> 
                            {
                                currentUser.token? (
                                    <>
                                        <Link 
                                            className="nav-link" 
                                            to="#signout"
                                            onClick={() => dispatch(signOutUser())}
                                        >Sign Out</Link>:
                                        <Link className="nav-link" disabled to="#signout">{currentUser.name}</Link>:
                                    </>
                                ):
                                <Link className="nav-link" to="/signin">Sign In</Link> 
                            }
                        </Nav>
                        {
                            currentUser.role === "superAdmin" &&
                            <>
                                <NavDropdown title="Super Admin Desk" id="navbarScrollingDropdown">
                                    <Link className="dropdown-item" to="/userlist">User List</Link>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">{currentUser.name}</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        }
                    </Navbar.Collapse >    
                        
                    
                </Container>
            </Navbar>
        </div>
    )
}

export default Header

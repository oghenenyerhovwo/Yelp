import React from 'react'
import { Route } from 'react-router-dom'

// components
import HomeScreen from '../screens/HomeScreen'
import ShowCampgroundScreen from '../screens/ShowCampgroundScreen'
import NewCampgroundScreen from '../screens/NewCampgroundScreen'
import EditCampgroundScreen from '../screens/EditCampgroundScreen'
import SignInScreen from '../screens/SignInScreen'
import RegisterScreen from '../screens/RegisterScreen'
import UserListScreen from '../screens/UserListSreen'

// Private Routes
import LoggedInRouter from './Routers/LoggedInRouter'

const Main = () => {
    return (
        <>
            <Route path="/showcampground/:id" component={ShowCampgroundScreen} exact />
            <LoggedInRouter path="/newcampground" component={NewCampgroundScreen} exact/>
            <LoggedInRouter path="/editcampground/:id" component={EditCampgroundScreen} exact/>
            <Route path="/signin" component={SignInScreen} exact/>
            <Route path="/register" component={RegisterScreen} exact/>
            <LoggedInRouter path="/userlist" component={UserListScreen} exact/>
            <Route path="/campgrounds" component={HomeScreen} exact/>
            <Route path="/" component={HomeScreen} exact/>
        </>
    )
}

export default Main

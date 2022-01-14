import React from 'react'
import { useSelector, } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const LoggedInRouter = ({
    component: Component, 
    ...rest
}) => {
    const {currentUser} = useSelector(state => state.userState)

    return (
        <div>
            <Route {...rest} render={(props) =>
                currentUser.token ? <Component {...props}></Component> :
                  <Redirect to="/signin" />
            }></Route>
        </div>
    )
}

export default LoggedInRouter

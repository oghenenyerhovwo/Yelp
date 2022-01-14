import React, { useEffect, useState } from 'react'
import {Table, Container, Button,} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

// components
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

// functions
import { listUsers, } from '../actions/userAction'
import TableBody from '../components/TableBody'
import { SET_SUCCESS_MESSAGE } from '../constants/generalConstant'
import { UPDATE_USER_ROLE_RESET } from '../constants/userConstants'

const UserListScreen = () => {
    // hooks
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const {
        dataListUsers,
        loadingListUsers,
        errorListUsers,
        loadingUpdateUserRole,
        errorUpdateUserRole,
        successUpdateUserRole,
    } = useSelector(state => state.userState)

    useEffect(() => {
        if(successUpdateUserRole){
            dispatch({type: SET_SUCCESS_MESSAGE, payload: "user updated succesfully"})
            dispatch({type: UPDATE_USER_ROLE_RESET})
        }else if (!toggle) {
            dispatch(listUsers())
        }
    }, [dispatch, toggle,successUpdateUserRole])

    return (
        <Container>
            <h2 >List of All Users in Database</h2>
            {loadingUpdateUserRole && <LoadingBox />}
            {errorUpdateUserRole && <MessageBox variant="danger">{errorUpdateUserRole} </MessageBox>}
            <Button
                variant="outline-warning"
                size="sm"
                style={{marginBottom: "20px"}}
                onClick={() => setToggle(toggle => !toggle)}
            > {!toggle ? "Make Changes": "Done"}
            </Button>
            {
                loadingListUsers ? <LoadingBox />:
                errorListUsers ? <MessageBox variant="danger">{errorListUsers} </MessageBox>:
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataListUsers.map(user => (
                            <tr key={user._id}>
                                <TableBody 
                                    toggle={toggle}
                                    user={user} 
                                />
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </Container>
    )
}

export default UserListScreen

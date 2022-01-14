import React, { useState } from 'react'
import { Form , Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateUserRole } from '../actions/userAction'

const TableBody = props => {
    const dispatch = useDispatch()
    const {user, toggle,} = props
    const [userRole, setUserRole] = useState("")
    const handleClick =() => {
        if(userRole !== ""){
            dispatch(updateUserRole(user._id, userRole))
        }
    }

    return (
        <>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <Form>
                    <select 
                        className= {`form-control ${!toggle && "form-control-plaintext"}`}
                        readonly={!toggle}
                        defaultValue={user.role} 
                        onChange={e => setUserRole(e.target.value)}
                        aria-label="Default select example"
                    >
                        <option value="basic">Basic</option>
                        <option  value="admin">Admin</option>
                    </select>
                </Form>
            </td>
            <td>
                <Button
                    disabled={!toggle || userRole === "" || userRole === user.role}
                    onClick={handleClick}
                >
                    Save
                </Button>
            </td>
        </>
    )
}

export default TableBody

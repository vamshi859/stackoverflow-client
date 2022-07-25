import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchAllUsers } from "../../actions/users";
import User from './User';
import './Users.css';

const UsersList = () => {

    const users = useSelector((state) => state.usersReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUsers())
    },[])
    // console.log(users);
    return (
        <div className="user-list-container">
            {
                users.map((user) => <User user={user} key={user?._id} />)
            }
        </div>
    )
}

export default UsersList;
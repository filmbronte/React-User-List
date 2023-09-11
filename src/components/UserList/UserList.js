import { useState, useEffect } from "react";

import * as userService from '../../services/userService'

import { UserItem } from "./UserItem/UserItem";
import { UserDetails } from "./UserDetails/UserDetails";
import { UserEdit } from "./UserEdit/UserEdit";
import { UserDelete } from "./UserDelete/UserDelete";
import { UserAdd } from "./UserAdd/UserAdd";

const UserActions = {
    Details: 'details',
    Edit: 'edit',
    Delete: 'delete',
    Add: 'add'
}

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [userAction, setUserAction] = useState({ user: null, action: null });

    useEffect(() => {
        userService.getAll()
            .then(users => setUsers(users));
    }, []);


    const detailsClickHandler = (id) => {
        userService.getOne(id)
            .then(user => {
                setUserAction({
                    user,
                    action: UserActions.Details
                });
            })
    }

    const editClickHandler = (id) => {
        userService.getOne(id)
            .then(user => {
                setUserAction({
                    user,
                    action: UserActions.Edit
                });
            })
    }

    const deleteClickHandler = (id) => {
        userService.getOne(id)
            .then(user => {
                setUserAction({
                    user,
                    action: UserActions.Delete
                });
            })
    }

    const addClickHandler = () => {
        userService.getOne()
            .then(user => {
                setUserAction({
                    user,
                    action: UserActions.Add
                });
            })
    }

    const closeHandler = () => {
        setUserAction({ user: null, action: null })
    }

    const userCreateHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            ...address
        } = Object.fromEntries(formData);

        const userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            address
        }

        userService.create(userData)
            .then(user => {
                setUsers(state => [...state, user])
                closeHandler();
            })
    }

    const onUserUpdateSubmit = async (e, userId) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            ...address
        } = Object.fromEntries(formData);

        const userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            address
        }

        const updatedUser = await userService.update(userId, userData);

        setUsers(state => state.map(x => x._id === userId ? updatedUser : x));
    }

    const onUserUpdateSubmitHandler = (e, userId) => {
        onUserUpdateSubmit(e, userId);
        // setShowEditUser(null);
        closeHandler();
    };

    const onUserDelete = async (userId) => {
        // Delete from server
        await userService.del(userId);

        // Delete from state
        setUsers(state => state.filter(x => x._id !== userId));
    };

    const onDeleteHandler = (id) => {
        onUserDelete(id);

        closeHandler();
    };

    return (
        <>
            <div className="table-wrapper">

                {userAction.action == UserActions.Details &&
                    <UserDetails {...userAction.user}
                        onDetailsClose={closeHandler}
                    />}
                {userAction.action == UserActions.Edit &&
                    <UserEdit
                        user={userAction.user}
                        onEditClose={closeHandler}
                        onUserCreateSubmit={onUserUpdateSubmitHandler}
                    />}
                {userAction.action == UserActions.Delete &&
                    <UserDelete {...userAction.user}
                        onDeleteClose={closeHandler}
                        onDelete={onDeleteHandler}
                    />}
                {userAction.action == UserActions.Add &&
                    <UserAdd {...null}
                        onAddClose={closeHandler}
                        onUserCreate={userCreateHandler}
                    />}

                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                First name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                    data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                    </path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {users.map(user =>
                            <UserItem
                                key={user._id}
                                {...user}
                                onDetailsClick={detailsClickHandler}
                                onEditClick={editClickHandler}
                                onDeleteClick={deleteClickHandler}
                            />
                        )}


                    </tbody>
                </table>
            </div>
            <button onClick={addClickHandler} className="btn-add btn">Add new user</button>
        </>

    );
}
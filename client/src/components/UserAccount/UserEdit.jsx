import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsers, getDBUser } from '../../redux/actions'
import { CartContext } from "../Shopping/ShoppingCart";
import { Redirect } from 'react-router-dom'
import { validate } from "./validateUserEdit";
import Swal from "sweetalert2";

import './UserEdit.css'

export default function UserEdit() {
    const [input, setInput] = useState()
    const [errors, setErrors] = useState({})
    const { userId, } = useContext(CartContext)
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    useEffect(() => {
        if (!Object.keys(user).length && userId) {
            dispatch(getDBUser(userId))
        }
        if (Object.keys(user).length && userId) {
            setInput({ ...user })
        }
    }, [user])

    const handleChangeTextBox = (e) => {
        setErrors(validate({ ...input, [e.target.name]: e.target.value }))
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    if (userId) {
        return (
            <form onSubmit={(e) => {
                e.preventDefault()
                Swal.fire({
                    title: 'Do you want to save the changes?',
                    showDenyButton: true,
                    confirmButtonText: 'Save',
                    denyButtonText: `Don't save`,
                }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        const response = await dispatch(updateUsers(input))
                        Swal.fire(response, '', 'success')
                    }
                })
            }}>
                <h1>Edit user</h1>
                <div className="field">
                    <label className="label">User</label>
                    <div className="control">
                        <label>
                            {input ? input.user : ''}
                        </label>

                    </div>
                    {errors.user &&
                        <p className="help-danger">{errors.user}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <label>
                            {input ? input.email : ''}
                        </label>

                    </div>
                    {errors.email &&
                        <p className="help-danger">{errors.email}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            name="name"
                            className="name"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.name : ''}
                        />
                    </div>
                    {errors.name &&
                        <p className="help-danger">{errors.name}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Lastname</label>
                    <div className="control">
                        <input
                            name="lastname"
                            className="lastname"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.lastname : ''}
                        />
                    </div>
                    {errors.lastname &&
                        <p className="help-danger">{errors.lastname}</p>
                    }
                </div>
                <div className="field">
                    <label className="label">Phone</label>
                    <div className="control">
                        <input
                            name="phone"
                            className="phone"
                            type="text"
                            onChange={handleChangeTextBox}
                            value={input ? input.phone : ''}
                        />
                    </div>
                    {errors.phone &&
                        <p className="help-danger">{errors.phone}</p>
                    }
                </div>

                {!Object.keys(user).length
                    ? <h4>Loading...</h4>
                    :
                    <button className='button' type="submit">Submit</button>
                }
            </form>
        )
    } else {
        return <Redirect to='/' />
    }
}
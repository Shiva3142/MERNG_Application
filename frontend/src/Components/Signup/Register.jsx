import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Loder from '../templates/Loder';
import { userContext } from '../../App';

import { useRegisterUserMutation } from "../../Graphql/Graphql-codegen/graphql.tsx";

function Register() {
    let [showloder, updateShowLoder] = useState(0)
    let navigate = useNavigate()
    let { state, dispatch } = useContext(userContext)
    useEffect(() => {
        if (state.user === true) {
            navigate("/")
        }
    }, [])
    
    const [mutation] = useRegisterUserMutation({
        update(proxy, result) {
            updateShowLoder(0)
            localStorage.setItem("token", result.data.registerUser.token)
            dispatch({ type: "LOGIN", username: result.data.registerUser.name, email: result.data.registerUser.email })
            navigate("/")
        },
        onError(errors) {
            updateShowLoder(0)
            window.alert(Object.values(errors.graphQLErrors[0].extensions.errors)[0]);
        }
    });
    let [userDetails, updateUserDetails] = useState({
        name: "",
        email: "",
        password: ""
    })
    function updateUserDetail(event) {
        updateUserDetails((prevalue) => {
            return ({
                ...prevalue,
                [event.target.name]: event.target.value
            })
        })
    }
    async function SignUp(event) {
        updateShowLoder(1)
        event.preventDefault()
        if (userDetails.name.trim() !== "" && userDetails.email.trim() !== "" && userDetails.password.trim() !== "") {
            await mutation({
                variables: {
                    name: userDetails.name,
                    email: userDetails.email,
                    password: userDetails.password
                }
            })
        }
        else {
            alert("Please Fill All the required fields")
        }
    }

    return (
        <>
        {
                showloder === 1 ? (<>
                    <Loder />
                </>) : (
                    <></>
                )
            }
            <div className="ui container menu">
                <NavLink to="/" className="active item">Home</NavLink>
            </div>
            <div className="ui middle aligned center aligned grid signupformcontainer">
                <div className="column signupform">
                    <h2 className="ui teal image header">
                        <div className="content">
                            Create New Account
                        </div>
                    </h2>
                    <form onSubmit={SignUp} className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="name" placeholder="Name" value={userDetails.name} onChange={updateUserDetail} required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="envelope outline icon"></i>
                                    <input type="email" name="email" placeholder="E-mail address" value={userDetails.email} onChange={updateUserDetail} required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password" value={userDetails.password} onChange={updateUserDetail} required />
                                </div>
                            </div>
                            <button type='submit' className="ui fluid large teal submit button" >Register</button>
                        </div>

                        <div className="ui error message"></div>
                    </form>

                    <div className="ui message">
                        Already registered ? <NavLink to="/login" >Login</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register

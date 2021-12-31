import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import './css/Signup.css'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';
import Loder from '../templates/Loder';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink,
    useMutation
} from "@apollo/client";

const REGISTER_QUERY = gql`
    mutation loginUser(
            $email:String
            $password:String
        ){
            loginUser(
            email:$email
            password:$password
            ){
                id email token name
            }
        }
`



function Login() {
    let [showloder, updateShowLoder] = useState(0)

    let { state, dispatch } = useContext(userContext)
    let navigate = useNavigate()
    useEffect(() => {
        if (state.user === true) {
            navigate("/")
        }
    }, [])
    const [mutation, { data, loading, error }] = useMutation(REGISTER_QUERY, {
        update(proxy, result) {
            localStorage.setItem("token", result.data.loginUser.token)
            dispatch({ type: "LOGIN", username: result.data.loginUser.name, email: result.data.loginUser.email })
            updateShowLoder(0)
            navigate("/")
        },
        onError(errors) {
            updateShowLoder(0)
            window.alert(Object.values(errors.graphQLErrors[0].extensions.errors)[0]);
        },
    });


    let [userDetails, updateUserDetails] = useState({
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
        if (userDetails.email.trim() !== "" && userDetails.password.trim() !== "") {
            let result = await mutation({
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
                            Log-in to your account
                        </div>
                    </h2>
                    <form onSubmit={SignUp} className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="email" name="email" placeholder="E-mail address" onChange={updateUserDetail} value={userDetails.email} required />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password" onChange={updateUserDetail} value={userDetails.password} required />
                                </div>
                            </div>
                            <button type='submit' className="ui fluid large teal submit button">Login</button>
                        </div>
                        <div className="ui error message"></div>
                    </form>
                    <div className="ui message">
                        New to us? <NavLink to="/register" >Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

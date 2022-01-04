import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import PostsContainer from './PostsContainer';
import './css/Homepage.css'
import { userContext } from '../../App';

function HomePage() {
    let { state, dispatch } = useContext(userContext)
    return (
        <>
            <div className="ui vertical menu navbar">
                <i className="x icon icon" style={{ color: "white", "position": "absolute", "right": "10px", "top": "10px", "zIndex": "10000", cursor: "pointer" }}
                    onClick={() => {
                        document.getElementsByClassName('navbar')[0].style.left = '-300px'
                    }}
                ></i>
                <NavLink to="/" className="active item">Home</NavLink>
                {
                    state.user === true ? (
                        <NavLink to="/account" className=" item">Account</NavLink>
                    ) : (
                        <></>
                    )
                }
                {
                    state.user === true ? (<>
                        <span style={{ color: "white" }} className="item " onClick={() => {
                            state.logout(dispatch)
                        }}>Logout</span>
                    </>) : (
                        <>
                            <NavLink to="/login" className="item">Login</NavLink>
                        </>
                    )
                }
            </div>
            <div className="pusher" >
                <div className="ui inverted vertical masthead center aligned segment">
                    <div className="ui container">
                        <div className="ui large secondary inverted pointing menu">
                            <a className="toc item">
                                <i className="sidebar icon" style={{ color: "white" }} onClick={() => {
                                    document.getElementsByClassName('navbar')[0].style.left = '0px'
                                }}></i>

                            </a>
                            <NavLink to="/" className="active item">Home</NavLink>
                            {
                                state.user === true ? (
                                    <NavLink to="/account" className=" item">Account</NavLink>
                                ) : (
                                    <></>
                                )
                            }                            
                            <div className="right item">
                                {
                                    state.user === true ? (<>
                                        <span className="ui inverted button" onClick={() => {
                                            state.logout(dispatch)
                                        }}>Logout</span>
                                    </>) : (
                                        <>
                                            <NavLink to="/login" className="ui inverted button">Log in</NavLink>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">
                            Welcome To Socio-Social
                        </h1>
                        <h3 style={{ color: "white" }}>Write, Like, Share Posts any time.</h3>
                        <div className="ui huge primary button">
                            {
                                state.user === true ? (<>
                                    <h4 style={{ display: "inline" }}>Hello {state.username}</h4>
                                </>) : (
                                    <>
                                        <NavLink to="/register" style={{ color: "white" }}>
                                            Regiser
                                        </NavLink>
                                        <i className="right arrow icon"></i>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <PostsContainer />
                <div className="ui vertical footer " style={{ textAlign: "center", padding: "10px", color: "white", background: "#1e272e" }}>
                    ALL RIGHTS ARE RESERVED
                </div>
            </div>
        </>
    )
}

export default HomePage
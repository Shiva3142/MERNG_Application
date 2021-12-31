import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink,
    useMutation
} from "@apollo/client";
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Comment from "./Comment";
import moment from 'moment';
import { userContext } from "../../App";
import Loder from '../templates/Loder';

const FETCH_POST_QUERY = gql`
query ($id:ID!){
        getPostdetail(id:$id){
        name
        id
        email
        title
        body
        createdAt
        likes{
            name
            id
        }
        comments{
            name
            id
            body
            email
        }
        likeCount
        commentCount
        
    }
}
`
const DELETE_THE_POST = gql`
mutation deletePost(
        $id:ID!
        ){
            deletePost(
            id:$id
            )
        }
`

const CREATE_COMMENT = gql`
mutation createComment(
            $id:ID!
            $body:String
        ){
            createComment(
            id:$id
            body:$body
            ){
                name
                id
            }
        }
`

const LIKE_THE_POST = gql`
mutation likePost(
        $id:ID!
        ){
            likePost(
            id:$id
            ){
                likeCount
            }
        }
`

function PostPage(object) {
    let [showloder, updateShowLoder] = useState(0)
    let [comment, updateComment] = useState("")
    let { post_id } = useParams()
    let navigate = useNavigate()
    let { state, dispatch } = useContext(userContext)
    const { loading, error, data, refetch } = useQuery(FETCH_POST_QUERY, { variables: { id: post_id } });
    if (data) {
    }
    else {
        navigate("/")
    }
    const [mutation, { data2, loading2, error2 }] = useMutation(DELETE_THE_POST, {
        update(proxy, result) {
            navigate("/")
        },
        onError(errors) {
            console.log(errors);
        }
    });
    const [commentmutation, { data3, loading3, error3 }] = useMutation(CREATE_COMMENT, {
        update(proxy, result) {
            refetch()
        },
        onError(errors) {
            console.log(errors);
        }
    });
    const [likemutation, { data5, loading5, error5 }] = useMutation(LIKE_THE_POST, {
        update(proxy, result) {
            refetch()
        },
        onError(errors) {
            console.log(errors);
        }
    });


    async function likeThePost(event) {
        if (state.user===true) {
            updateShowLoder(1)
    
            await likemutation({
                variables: {
                    id: data.getPostdetail.id
                }
            })
            updateShowLoder(0)
            
        } else {
            window.alert("Please Login To like and Comment on Post ")
        }
    }



    async function deletePost() {
        updateShowLoder(1)
        await mutation({
            variables: {
                id: data.getPostdetail.id
            }
        })
        updateShowLoder(0)
    }
    async function createComment() {
        updateShowLoder(1)
        await commentmutation({
            variables: {
                id: data.getPostdetail.id,
                body: comment
            }
        })
        updateShowLoder(0)
        updateComment("")
    }

    return (
        <>
        {
                state.user===true && showloder === 1 ? (<>
                    <Loder />
                </>) : (
                    <></>
                )
            }
            <div className="ui container">

                <div class="ui menu">
                    <a class="active item" style={{padding:"10px 20px !impoartant"}}>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </a>
                    <div class="right menu">
                        {/* <div class="item"> */}
                            {
                                state.user === true ? (<>
                                    <span style={{ color: "white" }} className="item " onClick={() => {
                                        state.logout(dispatch)
                                    }}><NavLink to="/login" style={{ color: "black" }}>Logout</NavLink></span>
                                </>) : (
                                    <>
                                    <span className="item">
                                        <NavLink to="/login" style={{ color: "black" }}>Login</NavLink>
                                    </span>
                                    </>
                                )
                            }
                        {/* </div> */}
                    </div>
                </div>
            </div>
            {/* postpage {post_id} */}
            {
                data ? (
                <>
    
                        <div style={{ margin: "30px 0", border: "1px solid gray", padding: "10px" }} className="ui container">

                            <div className="ui divided items">

                                <div className="item">
                                    <div className="image">
                                        <img src="https://semantic-ui.com/images/avatar/large/elliot.jpg" />
                                    </div>
                                    <div className="content">
                                        <a className="header">{data.getPostdetail.title}</a>
                                        <div className="meta">
                                            <span className="cinema">{data.getPostdetail.body}</span>
                                        </div>
                                        <h5>by {data.getPostdetail.name}</h5>
                                        <div className="meta">
                                            <span className="cinema">{moment(data.getPostdetail.createdAt).fromNow()}</span>
                                        </div>
                                        <div className="extra">
                                            <div className="ui basic green button countsbtn" onClick={likeThePost}>
                                                {data.getPostdetail.likeCount} Likes </div>
                                            <div className="ui basic red button countsbtn">
                                                {data.getPostdetail.commentCount}  Comments</div>
                                            {
                                                state.user === true && state.email === data.getPostdetail.email ? (
                                                    <>
                                                        <div className="ui  red button countsbtn" onClick={deletePost}>
                                                            Delete Post</div>

                                                    </>
                                                ) : (
                                                    <>

                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            {
                                state.user === true ? (
                                    <>
                                        <div class="ui action input" style={{ margin: "20px auto", display: "flex", width: "fit-content" }}>
                                            <input type="text" placeholder="Enter Comment" value={comment} required onChange={(event) => {
                                                updateComment(event.target.value)
                                            }} />
                                            <button class="ui button" onClick={createComment}>Post</button>
                                        </div>

                                    </>
                                ) : (
                                    <>

                                    </>
                                )
                            }


                            <h2>Comments</h2>
                            {
                                data && data.getPostdetail.comments.length === 0 ? (
                                    <>

                                        <div class="ui raised segment">None of the Comments Are available for this Post .</div>

                                    </>
                                ) : (
                                    <>

                                        {
                                            data && data.getPostdetail.comments.map((value, index) => {
                                                console.log(value);
                                                return (
                                                    <Comment key={index} value={value} postid={data.getPostdetail.id} reload={refetch} />
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </>
    )
}

export default PostPage

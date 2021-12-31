import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink,
    useMutation
} from "@apollo/client";

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


function Post(object) {
    let [likecount,updatelikecount]=useState(object.value.likeCount)

    const [mutation, { data2, loading2, error2 }] = useMutation(LIKE_THE_POST, {
        update(proxy, result) {
            // console.log(proxy);
            // console.log(result);
            updatelikecount(result.data.likePost.likeCount)
        },
        onError(errors) {
            console.log(errors);
        }
    });

    
    function likeThePost(event) {
        mutation({variables:{
            id:object.value.id
        }})
    }

    return (
        <>
            <div className="card">
                <div className="content">
                    <div className="header">
                        <NavLink to={`/post/${object.value.id}`} >
                            {object.value.title}
                        </NavLink>
                    </div>
                    <div className="meta">
                        by {object.value.name}
                    </div>
                    <div className="meta">
                        {moment(object.value.createdAt).fromNow() }
                    </div>
                    <div className="description">
                        {object.value.body}
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button countsbtn" onClick={likeThePost}>
                            {likecount} Likes </div>
                        <div className="ui basic red button countsbtn">
                            {object.value.commentCount} Comments</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import {
    useMutation
} from "@apollo/client";
import {LIKE_THE_POST} from '../../Graphql/graphql.tsx'


function Post(object) {
    let [likecount,updatelikecount]=useState(object.value.likeCount)
    const [mutation] = useMutation(LIKE_THE_POST, {
        update(proxy, result) {
            updatelikecount(result.data.likePost.likeCount)
        },
        onError(errors) {
            console.log(errors);
        }
    });    
    function likeThePost() {
        mutation({variables:{
            id:parseInt(object.value.id)
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

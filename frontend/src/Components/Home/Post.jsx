import React, { useState ,useContext} from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment';
import { userContext } from '../../App';
// import {
//     useMutation
// } from "@apollo/client";
// import {LIKE_THE_POST} from '../../Graphql/graphql.tsx'
import { useLikePostMutation } from "../../Graphql/Graphql-codegen/graphql.tsx";


function Post(object) {
    let { state, dispatch } = useContext(userContext)
    let [likecount,updatelikecount]=useState(object.value.likeCount)
    // const [mutation] = useMutation(LIKE_THE_POST, {
    //     update(proxy, result) {
    //         updatelikecount(result.data.likePost.likeCount)
    //     },
    //     onError(errors) {
    //         console.log(errors);
    //     }
    // });    
    const [mutation] = useLikePostMutation({
        update(proxy, result) {
            updatelikecount(result.data.likePost.likeCount)
        },
        onError(errors) {
            console.log(errors);
        }
    });    
    function likeThePost() {
        if (state.user===true) {
            mutation({variables:{
                id:parseInt(object.value.id)
            }})
        }
        else{
            window.alert("please login to like, comment the post ")
        }
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
                        {moment(Date(object.value.createdAt)).fromNow() }
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

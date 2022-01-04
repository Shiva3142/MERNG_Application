import React, { useContext, useState } from 'react'
import {
    useMutation
} from "@apollo/client";
import {POST_THE_POST} from '../../Graphql/graphql.tsx'

function PostForm(object) {
    let [postdetail, updatePostdetails] = useState({
        title: "",
        body: ""
    })
    function updatepostdetail(event) {
        updatePostdetails({ ...postdetail, [event.target.name]: event.target.value })
    }
    const [mutation] = useMutation(POST_THE_POST, {
        update() {
        },
        onError(errors) {
            console.log(errors);
        },
    });
    async function PostThePost(event) {
        event.preventDefault()
        if (postdetail.title.trim() !== "" && postdetail.body.trim() !== "") {
            await mutation({
                variables: {
                    title: postdetail.title,
                    body: postdetail.body
                }
            })
            updatePostdetails({
                title: "",
                body: ""
            })
            object.reload()
        } else {
            window.alert("Please Fill all The details")
        }
    }
    return (
        <>
            <div className="ui container" style={{ margin: "20px 5px" }}>
                <h3 style={{ textAlign: "center" }}>Post any thoughts</h3>
                <form onSubmit={PostThePost} className="ui form">
                    <div className="field">
                        <label>Title</label>
                        <input type="text" name="title" placeholder="Enter Title" onChange={updatepostdetail} value={postdetail.title} required />
                    </div>
                    <div className="field">
                        <label>Post Body</label>
                        <textarea name='body' placeholder='Enter Post Body' onChange={updatepostdetail} value={postdetail.body} required></textarea>
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default PostForm

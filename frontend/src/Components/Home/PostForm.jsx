import React, { useContext, useState } from 'react'

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink,
    useMutation
} from "@apollo/client";

// import FETCH_POST_QUERY from '../../Graphql/graphql.jsx'


const POST_THE_POST = gql`
mutation createPost(
            $title:String
            $body:String
        ){
            createPost(
            title:$title
            body:$body
            ){
                name
                id
                title
                body
                likeCount
                commentCount
            }
        }
`

function PostForm(object) {
    let [postdetail, updatePostdetails] = useState({
        title: "",
        body: ""
    })
    function updatepostdetail(event) {
        updatePostdetails({ ...postdetail, [event.target.name]: event.target.value })
    }

    const [mutation, { data2, loading2, error2}] = useMutation(POST_THE_POST, {
        update(proxy, result) {
            // console.log(proxy);
            // console.log(result);
            // object.updatecontent()
            // let data = proxy.readQuery({
            //     query: FETCH_POST_QUERY
            // })
            // console.log(data);
            // let details = {}
            // details.getPostDetails = [ ...data.getPostDetails,result.data.createPost]
            // console.log(details);
            // proxy.writeQuery({ query: FETCH_POST_QUERY, details })
        },
        onError(errors) {
            console.log(errors);
            // console.log(Object.values(errors.graphQLErrors[0].extensions.errors)[0]);
            // window.alert(Object.values(errors.graphQLErrors[0].extensions.errors)[0]);
        },
    });
    async function PostThePost(event) {
        event.preventDefault()
        if (postdetail.title.trim() !== "" && postdetail.body.trim() !== "") {
            let result = await mutation({
                variables: {
                    title: postdetail.title,
                    body: postdetail.body
                }
            })
            // console.log(result);
            updatePostdetails({
                title: "",
                body: ""
            })
            // window.location.reload()
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

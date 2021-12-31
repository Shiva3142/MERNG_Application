import React, { useContext } from 'react'
import { userContext } from "../../App";
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
import { useNavigate } from 'react-router-dom';
const DELETE_COMMENT = gql`
mutation deleteComment(
            $postId:ID!
            $commentId:ID!
        ){
            deleteComment(
            postId:$postId
            commentId:$commentId
            )
        }
`

function Comment(object) {
    let { state, dispatch } = useContext(userContext)
    let navigate = useNavigate()
    
    const [mutation, { data2, loading2, error2 }] = useMutation(DELETE_COMMENT, {
        update(proxy, result) {
            object.reload()
        },
        onError(errors) {
            console.log(errors);
        }
    });
    
    async function deleteComment() {
        await mutation({
            variables: {
                postId:object.postid,
                commentId:object.value.id
            }
        })
    }
    return (
        <>
            <div className="ui comments">
                <div className="comment">
                    <a className="avatar">
                        <img src="https://semantic-ui.com/images/avatar2/large/elyse.png" />
                    </a>
                    <div className="content">
                        <a className="author">{object.value.name}</a>
                        <div className="metadata">
                            <div className="date">{moment(object.value.createdAt).fromNow()}</div>
                            {
                                state.user === true && state.email === object.value.email ? (
                                    <>
                                        <div className="ui basic yellow button countsbtn" onClick={deleteComment}>
                                            Delete Comment</div>
                                    </>
                                ) : (
                                    <>

                                    </>
                                )
                            }
                        </div>
                        <div className="text">
                            {object.value.body}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment

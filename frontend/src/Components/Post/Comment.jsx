import React, { useContext } from 'react'
import { userContext } from "../../App";
import moment from 'moment';
// import {DELETE_COMMENT} from '../../Graphql/graphql.tsx'
import {useDeleteCommentMutation} from '../../Graphql/Graphql-codegen/graphql.tsx'
// import {
//     useMutation
// } from "@apollo/client";

function Comment(object) {
    let { state } = useContext(userContext)
    
    // const [mutation] = useMutation(DELETE_COMMENT, {
    //     update() {
    //         object.reload()
    //     },
    //     onError(errors) {
    //         console.log(errors);
    //     }
    // });
    const [mutation] = useDeleteCommentMutation({
        update() {
            object.reload()
        },
        onError(errors) {
            console.log(errors);
        }
    });
    async function deleteComment() {
        await mutation({
            variables: {
                commentId:parseInt(object.value.id)
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
                            <div className="date">{moment(Date(object.value.createdAt)).fromNow()}</div>
                            {
                                state.user === true && state.email === object.value.email ? (
                                    <>
                                        <div className="ui basic yellow button countsbtn" onClick={deleteComment}>
                                            Delete Comment</div>
                                    </>
                                ) : (
                                    <></>
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

import React, { useContext, useEffect, useState } from 'react'
import FETCH_POST_QUERY from '../../Graphql/graphql.jsx'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink,
    useMutation
} from "@apollo/client";
import Post from './Post';
import { userContext } from '../../App';
import { NavLink } from 'react-router-dom';
import PostForm from './PostForm';
import Loder from '../templates/Loder';





function PostsContainer() {
    let [showloder, updateShowLoder] = useState(1)

    // let [contentstate,updateContentState]=useState(true)
    let { state, dispatch } = useContext(userContext)
    const { loading, error, data, refetch } = useQuery(FETCH_POST_QUERY);
    useEffect(() => {
        refetch()
        updateShowLoder(0)
    }, [])
    return (
        <>
            {
                showloder === 1 ? (<>
                    <Loder />
                </>) : (
                    <></>
                )
            }
            {
                state.user === true ? (<>
                    <PostForm reload={refetch} />
                </>) : (
                    <>
                        <NavLink to="/login" className="ui inverted button">Log in</NavLink>
                    </>
                )
            }
            <h1 style={{ textAlign: "center" }}>Some of the recent Posts</h1>
            <div className="ui cards postcontainer">


                {
                    data && data.getPostDetails.length === 0 ? (<>
                        <div class="ui raised segment">None of the Post Are available Yet .</div>
                    </>) : (<>
                        {
                            data && data.getPostDetails.map((value, index) => {
                                // console.log(value);
                                return <Post key={index} value={value} />
                            })
                        }

                    </>)
                }




            </div>
        </>
    )
}







export default PostsContainer

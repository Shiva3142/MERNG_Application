import {
    gql
} from "@apollo/client";

const FETCH_POSTs_QUERY = gql`
{
    getPostDetails{
        name
        id
        title
        body
        likeCount
        commentCount
        createdAt
    }
}
`

const REGISTER_QUERY = gql`
    mutation registerUser(
            $name:String
            $email:String
            $password:String
        ){
            registerUser(
            name:$name
            email:$email
            password:$password
            ){
                id email token name
            }
        }
`

const LOGIN_QUERY = gql`
    mutation loginUser(
            $email:String
            $password:String
        ){
            loginUser(
            email:$email
            password:$password
            ){
                id email token name
            }
        }
`

const FETCH_POST_QUERY = gql`
query ($id:Int!){
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
const GET_USERs_POST = gql`
query ($email:String){
    getUserPosts(email: $email) {
        name
        id
        title
        body
        likeCount
        commentCount
        createdAt
    }
}
`

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

const LIKE_THE_POST = gql`
mutation likePost(
        $id:Int!
        ){
            likePost(
            id:$id
            ){
                likeCount
            }
        }
`

const DELETE_COMMENT = gql`
mutation deleteComment(
            $commentId:Int!
        ){
            deleteComment(
            commentId:$commentId
            )
        }
`

const CREATE_COMMENT = gql`
mutation createComment(
            $id:Int!
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

const DELETE_THE_POST = gql`
mutation deletePost(
        $id:Int!
        ){
            deletePost(
            id:$id
            )
        }
`



export default FETCH_POSTs_QUERY
export { FETCH_POST_QUERY, REGISTER_QUERY, GET_USERs_POST, LOGIN_QUERY, LIKE_THE_POST, POST_THE_POST, CREATE_COMMENT, DELETE_COMMENT, DELETE_THE_POST }
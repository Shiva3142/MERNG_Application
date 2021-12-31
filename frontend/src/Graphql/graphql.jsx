import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    createHttpLink,
    useMutation
} from "@apollo/client";
const FETCH_POST_QUERY = gql`
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
export default FETCH_POST_QUERY
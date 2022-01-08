import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createPost?: Maybe<Postdetail>;
  deleteComment?: Maybe<Scalars['Boolean']>;
  deletePost?: Maybe<Scalars['Boolean']>;
  likePost?: Maybe<Postdetail>;
  loginUser?: Maybe<Userdetail>;
  registerUser?: Maybe<Userdetail>;
};


export type MutationCreateCommentArgs = {
  body?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  body?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationLikePostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterUserArgs = {
  createdAt?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getPostDetails?: Maybe<Array<Maybe<Postdetail>>>;
  getPostdetail?: Maybe<Postdetail>;
  getUserDetails?: Maybe<Array<Maybe<Userdetail>>>;
  getUserPosts?: Maybe<Array<Maybe<Postdetail>>>;
  hello?: Maybe<Scalars['String']>;
};


export type QueryGetPostdetailArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserPostsArgs = {
  email?: InputMaybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'comment';
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['Int']>;
};

export type Like = {
  __typename?: 'like';
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['Int']>;
};

export type Postdetail = {
  __typename?: 'postdetail';
  body?: Maybe<Scalars['String']>;
  commentCount?: Maybe<Scalars['Int']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  likeCount?: Maybe<Scalars['Int']>;
  likes?: Maybe<Array<Maybe<Like>>>;
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type Userdetail = {
  __typename?: 'userdetail';
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type GetPostDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostDetailsQuery = { __typename?: 'Query', getPostDetails?: Array<{ __typename?: 'postdetail', name?: string | null | undefined, id: string, title?: string | null | undefined, body?: string | null | undefined, likeCount?: number | null | undefined, commentCount?: number | null | undefined, createdAt?: string | null | undefined } | null | undefined> | null | undefined };

export type RegisterUserMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'userdetail', id: string, email?: string | null | undefined, token?: string | null | undefined, name?: string | null | undefined } | null | undefined };

export type LoginUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'userdetail', id: string, email?: string | null | undefined, token?: string | null | undefined, name?: string | null | undefined } | null | undefined };

export type GetPostdetailQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPostdetailQuery = { __typename?: 'Query', getPostdetail?: { __typename?: 'postdetail', name?: string | null | undefined, id: string, email?: string | null | undefined, title?: string | null | undefined, body?: string | null | undefined, createdAt?: string | null | undefined, likeCount?: number | null | undefined, commentCount?: number | null | undefined, likes?: Array<{ __typename?: 'like', name?: string | null | undefined, id: string } | null | undefined> | null | undefined, comments?: Array<{ __typename?: 'comment', name?: string | null | undefined, id: string, body?: string | null | undefined, email?: string | null | undefined, createdAt?: string | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type GetUserPostsQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type GetUserPostsQuery = { __typename?: 'Query', getUserPosts?: Array<{ __typename?: 'postdetail', name?: string | null | undefined, id: string, title?: string | null | undefined, body?: string | null | undefined, likeCount?: number | null | undefined, commentCount?: number | null | undefined, createdAt?: string | null | undefined } | null | undefined> | null | undefined };

export type CreatePostMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  body?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'postdetail', name?: string | null | undefined, id: string, title?: string | null | undefined, body?: string | null | undefined, likeCount?: number | null | undefined, commentCount?: number | null | undefined } | null | undefined };

export type LikePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'postdetail', likeCount?: number | null | undefined } | null | undefined };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment?: boolean | null | undefined };

export type CreateCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  body?: InputMaybe<Scalars['String']>;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'comment', name?: string | null | undefined, id: string } | null | undefined };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: boolean | null | undefined };


export const GetPostDetailsDocument = gql`
    query getPostDetails {
  getPostDetails {
    name
    id
    title
    body
    likeCount
    commentCount
    createdAt
  }
}
    `;

/**
 * __useGetPostDetailsQuery__
 *
 * To run a query within a React component, call `useGetPostDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostDetailsQuery, GetPostDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostDetailsQuery, GetPostDetailsQueryVariables>(GetPostDetailsDocument, options);
      }
export function useGetPostDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostDetailsQuery, GetPostDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostDetailsQuery, GetPostDetailsQueryVariables>(GetPostDetailsDocument, options);
        }
export type GetPostDetailsQueryHookResult = ReturnType<typeof useGetPostDetailsQuery>;
export type GetPostDetailsLazyQueryHookResult = ReturnType<typeof useGetPostDetailsLazyQuery>;
export type GetPostDetailsQueryResult = Apollo.QueryResult<GetPostDetailsQuery, GetPostDetailsQueryVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($name: String, $email: String, $password: String) {
  registerUser(name: $name, email: $email, password: $password) {
    id
    email
    token
    name
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($email: String, $password: String) {
  loginUser(email: $email, password: $password) {
    id
    email
    token
    name
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const GetPostdetailDocument = gql`
    query getPostdetail($id: Int!) {
  getPostdetail(id: $id) {
    name
    id
    email
    title
    body
    createdAt
    likes {
      name
      id
    }
    comments {
      name
      id
      body
      email
      createdAt
    }
    likeCount
    commentCount
  }
}
    `;

/**
 * __useGetPostdetailQuery__
 *
 * To run a query within a React component, call `useGetPostdetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostdetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostdetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostdetailQuery(baseOptions: Apollo.QueryHookOptions<GetPostdetailQuery, GetPostdetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostdetailQuery, GetPostdetailQueryVariables>(GetPostdetailDocument, options);
      }
export function useGetPostdetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostdetailQuery, GetPostdetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostdetailQuery, GetPostdetailQueryVariables>(GetPostdetailDocument, options);
        }
export type GetPostdetailQueryHookResult = ReturnType<typeof useGetPostdetailQuery>;
export type GetPostdetailLazyQueryHookResult = ReturnType<typeof useGetPostdetailLazyQuery>;
export type GetPostdetailQueryResult = Apollo.QueryResult<GetPostdetailQuery, GetPostdetailQueryVariables>;
export const GetUserPostsDocument = gql`
    query getUserPosts($email: String) {
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
    `;

/**
 * __useGetUserPostsQuery__
 *
 * To run a query within a React component, call `useGetUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPostsQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
      }
export function useGetUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, options);
        }
export type GetUserPostsQueryHookResult = ReturnType<typeof useGetUserPostsQuery>;
export type GetUserPostsLazyQueryHookResult = ReturnType<typeof useGetUserPostsLazyQuery>;
export type GetUserPostsQueryResult = Apollo.QueryResult<GetUserPostsQuery, GetUserPostsQueryVariables>;
export const CreatePostDocument = gql`
    mutation createPost($title: String, $body: String) {
  createPost(title: $title, body: $body) {
    name
    id
    title
    body
    likeCount
    commentCount
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const LikePostDocument = gql`
    mutation likePost($id: Int!) {
  likePost(id: $id) {
    likeCount
  }
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($commentId: Int!) {
  deleteComment(commentId: $commentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($id: Int!, $body: String) {
  createComment(id: $id, body: $body) {
    name
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: Int!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
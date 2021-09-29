import { gql } from "apollo-server";

export default gql`
    type User{
        id: String!,
        username: String!,
        email: String!,
        name: String,
        location: Float,
        avatarURL: String,
        githubUsername: String,
        createdAt: String!,
        updatedAt: String!,
    }
    type Query{
        seeProfile(username: String!): User
    }
    type createUserResult{
        ok: Boolean!,
        error: String
    }
    type Mutation{
        createUser(
            username: String!
            email: String!
            name: String!
            password: String!
            location: Float
            avatarURL: String
            githubUsername: String
        ): createUserResult
    }
`
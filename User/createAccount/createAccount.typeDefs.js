import { gql } from "apollo-server";

export default gql`
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
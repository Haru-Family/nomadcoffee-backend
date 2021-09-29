import client from "../client"
import bycrypt from "bcrypt"

export default {
    Mutation: {
        createUser: async(_, {username, email, name, password, location, avatarURL, githubUsername}) => {
        
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            username
                        },
                        {
                            email
                        }
                    ],
                }
            });
            if(!existingUser){
                const uglyPassword = await bycrypt.hash(password, 10)
                await client.user.create({
                    data: {
                        username, 
                        email, 
                        name, 
                        password:uglyPassword, 
                        location,
                        avatarURL,
                        githubUsername
                    }
                })
                return {
                    ok: true
                }
            }else{
                return {
                    ok: false,
                    error: "already in use"
                }
            }
        }
    }
}
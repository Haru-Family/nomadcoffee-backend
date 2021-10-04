import client from "../../client"

export default {
    Query: {
        seeFollowers: async(_, {username, page}) => {
            const ok = await client.user.findUnique({
                where: {username: username},
                select: {id: true}
            });
            if(!ok){
                return {
                    ok:false,
                    error: "User not found"
                }
            }
            //크리스티아누 호날두의 팔로우 리스트를 확인함.
            //offset pagination
            const followers = await client.user.findUnique({where: {username}}).followers({
                take: 5,
                skip: (page-1) * 5,
            });
            const totalFollowers = await client.user.count({
                where: {
                    following: {
                        some: {username}
                    }
                }
            })
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
            }
            // const bFollowers = await client.user.findMany({
            //     where: {
            //         following: {
            //             //findmany에서 some / every / none을 사용할 수 있음
            //             some: {
            //                 username,
            //             }
            //         }
            //     }
            // })
        }
    }
}
import client from "../../client";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
        //사용자 양이 적은 경우에는 아래와 같이 진행해도 상관 없음(많을 경우에는 pagination을 사용)
        //include는 관계를 나타낼때 사용함.
        include:{
          following: true,
          followers: true,
        }
      }),
  },
};
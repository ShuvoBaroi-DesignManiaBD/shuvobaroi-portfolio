
// import { TResponse } from "@/types";
// import { TVote } from "@/types/vote.type";

import { baseAPI } from "@/redux/api/baseApi";

const pageApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAPage: builder.query<
      {data: []},
      { pageName: string }
    >({
      query: ({ pageName}) => ({
        url: `/pages?filters[title][$eq]=${pageName}&populate[0]=section&populate[1]=section.sub_section.icon_or_image&populate[2]=section.sub_section.images&populate[3]=section.buttons&populate[4]=section.experience.experience_item.logo&populate[5]=section.my_approaches`,
        method: "GET",
      }),
      providesTags: ["page"],
    }),
  }),
});

export const {
    useGetAPageQuery
} = pageApi;

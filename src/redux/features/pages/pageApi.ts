
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
        url: `http://localhost:1337/api/pages?filters[title][$eq]=${pageName}&populate[0]=section&populate[1]=section.sub_section.icon_or_image&populate[2]=section.sub_section.images&populate[3]=section.buttons&populate[4]=section.experience.experience_item.logo`,
        method: "GET",
      }),
      providesTags: ["page"],
    }),
  }),
});

export const {
    useGetAPageQuery
} = pageApi;


// import { TResponse } from "@/types";
// import { TVote } from "@/types/vote.type";

import { baseAPI } from "@/redux/api/baseApi";

const projectApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAProject: builder.query<
      {data: []},
      { documentId: string }
    >({
      query: ({ documentId}) => ({
        url: `/projects??filters[documentId][$eq]=${documentId}&fields=*&populate[0]=cover&populate[1]=technologies.logo&pagination[pageSize]=3&pagination[page]=1`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    getProjects: builder.query<
      {data: []},
      { page: string , pageSize: string }    
    >({
      query: ({page, pageSize}) => ({
        url: `/projects?fields=*&populate[0]=cover&populate[1]=technologies.logo&populate[2]=live_link&populate[3]=images&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    })
  }),
});

export const {
    useGetAProjectQuery,
    useGetProjectsQuery
} = projectApi;

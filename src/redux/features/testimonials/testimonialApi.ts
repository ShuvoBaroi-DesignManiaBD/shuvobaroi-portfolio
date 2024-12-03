
// import { TResponse } from "@/types";
// import { TVote } from "@/types/vote.type";

import { baseAPI } from "@/redux/api/baseApi";

const testimonialApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query<
      {data: []},
      { page?: string , pageSize?: string }    
    >({
      query: ({page="1", pageSize="3"}) => ({
        url: `/testimonials?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
        method: "GET",
      }),
      providesTags: ["testimonials"],
    })
  }),
});

export const {
    useGetTestimonialsQuery
} = testimonialApi;

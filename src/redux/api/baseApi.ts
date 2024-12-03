import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import envConfig from "@/config";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
    baseUrl: envConfig.baseApi,
    // credentials: "include",
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      // headers.set("Authorization", `Bearer ${envConfig.access_key}`);
      return headers;
    },
})

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery: baseQuery,
  tagTypes: ['pages', 'blogs', "page", "project", "projects", "testimonials", "siteinfo"],
  endpoints: () => ({}),
});

import { baseAPI } from "@/redux/api/baseApi";

const siteInfo = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSiteInfo: builder.query<
      { data: [] },
      void
    >({
      query: () => ({
        url: `/global?populate=*`,
        method: "GET",
      }),
      providesTags: ["siteinfo"],
    }),
  }),
});

export const {
    useGetSiteInfoQuery
} = siteInfo;

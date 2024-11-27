const envConfig = {
    baseApi: process.env.NEXT_PUBLIC_BASE_API,
    siteURL: process.env.NEXT_PUBLIC_URL,
    IS_LIVE: process.env.IS_LIVE,
    access_key: process.env.NEXT_ACCESS_KEY
  };
  
  export default envConfig;
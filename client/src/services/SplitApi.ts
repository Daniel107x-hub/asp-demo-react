import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const splitApi = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${BASE_URL}/api`, 
        credentials: 'include'
    }),
    endpoints: () => ({})
});
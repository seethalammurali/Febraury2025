import { fetchBaseQuery,createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({baseUrl:'http://localhost:9000/users',credentials:"include"})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(builder)=>({}),
})
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery:fetchBaseQuery({baseUrl:'http://www.filltext.com/'}),
    endpoints:(build)=>({
        getUsers:build.query({
            query:()=>`?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
        })
    })
})

export const {useGetUsersQuery} = usersApi

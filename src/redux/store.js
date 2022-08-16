import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './userSlice'
import { usersApi } from './api';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        // [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([usersApi.middleware])
})
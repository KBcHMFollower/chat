import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user-slice";
import { apiSlice } from "./slices/api-slice";

export const rootReducer = combineReducers({
    user: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof rootReducer>;
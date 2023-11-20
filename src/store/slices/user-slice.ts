import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialType = {
    fname:string;
    lname:string;
    id:number;
}

const initialState:InitialType = {
    fname:'',
    lname:'',
    id:-1
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        SetUser: (state, action:PayloadAction<InitialType>)=>{
            state.fname = action.payload.fname;
            state.lname = action.payload.fname;
            state.id = action.payload.id;
        }
    },
})

export const {SetUser} = userSlice.actions;

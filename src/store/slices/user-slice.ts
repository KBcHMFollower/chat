import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../api/interfaces";


const initialState:IUser = {
    fname:'',
    lname:'',
    id:-1
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        SetUser: (state, action:PayloadAction<IUser>)=>{
            state.fname = action.payload.fname;
            state.lname = action.payload.lname;
            state.id = action.payload.id;
        }
    },
})

export const {SetUser} = userSlice.actions;

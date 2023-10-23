import { createSlice } from '@reduxjs/toolkit'

const initilaStateValue={name:"",id:'',image:""}

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initilaStateValue },
    reducers:{
        login:(state,action)=>{
            state.value=action.payload
        },
        updateImage: (state, action) => {
            state.value.image = action.payload;
        },
        logout:(state,action)=>{
            state.value=initilaStateValue
        }
    }
})

export const {login,logout,updateImage}=userSlice.actions;

export default userSlice.reducer;
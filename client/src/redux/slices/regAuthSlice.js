import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    setAdminTrue: false,
    logoutInit: false,
    isAuth: false
}



export const regAuth = createSlice({
    name: 'regauth',
    initialState,
    reducers: {
        adminTrueOrFalse: (state, action) => {
            state.setAdminTrue = action.payload
        },
        logoutBtnReducers: (state, action) => {
            state.logoutInit = action.payload
        },
        authorizeRed: (state, action) => {
            state.isAuth = action.payload
        }
    },
})

export const {adminTrueOrFalse, logoutBtnReducers, authorizeRed} = regAuth.actions
export default regAuth.reducer
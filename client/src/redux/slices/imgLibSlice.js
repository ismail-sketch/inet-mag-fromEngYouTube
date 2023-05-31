import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    initImgs: [],
}

export const getImgs = createAsyncThunk(
    'initImgs/getImgs',
    async () => {
        const res = await axios.get('/api/admin/sliders/images')
        return res.data
    }
)

export const deleteImgs = createAsyncThunk(
    'initIgs/deleteImgs',
    async (data) => {
        const res = await axios.post(`/api/admin/sliders/images/`, data)
        return res.data
    }
)


export const libImgs = createSlice({
    name: 'allimgs',
    initialState,
    reducers: {},

    extraReducers: {
        [getImgs.pending]: (state) => {},
        [getImgs.fulfilled]: (state, action) => {state.initImgs = action.payload},
        [getImgs.rejected]: () => {},

        [deleteImgs.pending]: (state) => {},
        [deleteImgs.fulfilled]: (state, action) => {
            state.initImgs = state.initImgs.filter(item => {return item !== action.payload.name})
        },
        [deleteImgs.rejected]: () => {}
    },

})

export default libImgs.reducer
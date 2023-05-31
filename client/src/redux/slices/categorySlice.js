import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    initCategory: [],
}

export const addCategory = createAsyncThunk(
    'initCategory/addCategory',
    async (data) => {
        const res = await axios.post('/api/categories', (data), {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res.data
    }
)
export const getCategory = createAsyncThunk(
    'initCategory/getCategory',
    async () => {
        const res = await axios.get('/api/categories')
        return res.data
    }
)

// Обновление категории
export const updateCategory = createAsyncThunk(
    'initCategory/updateCategory',
    async ({data, slideId}) => {
        const res = await axios.put(`/api/categories/${slideId}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res.data
    }
)
// Удаление категории
export const deleteCategory = createAsyncThunk(
    'initCategory/deleteCategory',
    async (data) => {
        const res = await axios.delete(`/api/categories/${data.id}/${data.name}`)
        return res.data
    }
)

export const categoriesSlice = createSlice({
    name: 'allcat',
    initialState,
    reducers: {},

    extraReducers: {
        [addCategory.pending]: (state) => {},
        [addCategory.fulfilled]: (state, action) => {state.initCategory.push(action.payload)},
        [addCategory.rejected]: () => {},

        [getCategory.pending]: (state) => {},
        [getCategory.fulfilled]: (state, action) => {state.initCategory = action.payload},
        [getCategory.rejected]: () => {},

        [updateCategory.pending]: (state) => {},
        [updateCategory.fulfilled]: (state, action) => {state.initCategory[action.payload.index] = action.payload},
        [updateCategory.rejected]: () => {},

        [deleteCategory.pending]: (state) => {}, //начинается запрос
        [deleteCategory.fulfilled]: (state, action) => {state.initCategory = state.initCategory.filter(item => item._id !== action.payload.id)
        },
        [deleteCategory.rejected]: () => {}, //вызывается, если ошибка


    },


})

export default categoriesSlice.reducer
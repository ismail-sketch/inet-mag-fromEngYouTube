import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    initProduct: [],
}

export const addProduct = createAsyncThunk(
    'initProduct/addProduct',
    async (data) => {
        const res = await axios.post('/api/products', (data), {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res.data
    }
)

export const getProduct = createAsyncThunk(
    'initProduct/getProduct',
    async () => {
        const res = await axios.get('/api/products')
        return res.data
    }
)

// Обновление продукта
export const updateProduct = createAsyncThunk(
    'initProduct/updateProduct',
    async ({data, slideId}) => {
        const res = await axios.put(`/api/products/${slideId}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res.data
    }
)

// Удаление прдукта
export const deleteProduct = createAsyncThunk(
    'initCategory/deleteProduct',
    async (data) => {
        const res = await axios.delete(`/api/products/${data.id}/${data.name}`)
        return res.data
    }
)

export const productsSlice = createSlice({
    name: 'allcat',
    initialState,
    reducers: {},

    extraReducers: {
        [addProduct.pending]: () => {},
        [addProduct.fulfilled]: (state, action) => {state.initProduct.push(action.payload)},
        [addProduct.rejected]: () => {},

        [getProduct.pending]: () => {},
        [getProduct.fulfilled]: (state, action) => {state.initProduct = action.payload},
        [getProduct.rejected]: () => {},

        [updateProduct.pending]: (state) => {},
        [updateProduct.fulfilled]: (state, action) => {state.initProduct[action.payload.index] = action.payload},
        [updateProduct.rejected]: () => {},

        [deleteProduct.pending]: (state) => {}, //начинается запрос
        [deleteProduct.fulfilled]: (state, action) => {state.initProduct = state.initProduct.filter(item =>  item._id !== action.payload.id)
        },
        [deleteProduct.rejected]: () => {}, //вызывается, если ошибка
    },

})

export default productsSlice.reducer
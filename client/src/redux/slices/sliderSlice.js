import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    sliderMain: [],
}

export const addToMainSlide = createAsyncThunk(
    'sliderMain/addToMainSlide',
    async (data, thunkAPI) => {
        const res = await axios.post('/api/admin/sliders', (data), {
            headers: { "Content-Type": "multipart/form-data" }
        })
        console.log(res.data);
        return res.data
    }
)

export const getMainSlide = createAsyncThunk(
    'sliderMain/getMainSlide',
    async () => {
        const res = await axios.get('/api/admin/sliders')
        return res.data
    }
)

// Обновление слайда
export const updateSlideRed = createAsyncThunk(
    'sliderMain/updateSlide',
    async ({data, slideId}) => {
        const res = await axios.put(`http://localhost:5000/api/admin/sliders/${slideId}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return res.data
    }
)

// Удаление слайда
export const deleteSlide = createAsyncThunk(
    'sliderMain/deleteSlide',
    async (data) => {
        const res = await axios.delete(`http://localhost:5000/api/admin/sliders/${data.id}/${data.name}`)
        return res.data
    }
)

// Удаление файла (картики и т.п.)
export const deleteFileRed = createAsyncThunk(
    'sliderMain/deleteFile',
    async (name) => {
        const res = await axios.delete(`/api/admin/sliders/${name}`)
        return res.data
    }
)


export const mainSlider = createSlice({
    name: 'mainslide',
    initialState,
    reducers: {},

    extraReducers: {
        [addToMainSlide.pending]: (state) => {}, //начинается запрос
        [addToMainSlide.fulfilled]: (state, action) => {state.sliderMain.push(action.payload)},
        [addToMainSlide.rejected]: () => console.log('rejected'), //вызывается, если ошибка

        [getMainSlide.pending]: (state) => {}, //начинается запрос
        [getMainSlide.fulfilled]: (state, action) => {state.sliderMain = action.payload},
        [getMainSlide.rejected]: () => {}, //вызывается, если ошибка

        [updateSlideRed.pending]: (state) => {},
        [updateSlideRed.fulfilled]: (state, action) => {state.sliderMain[action.payload.index] = action.payload},
        [updateSlideRed.rejected]: () => {}, //вызывается, если ошибка

        [deleteSlide.pending]: (state) => {}, //начинается запрос
        [deleteSlide.fulfilled]: (state, action) => {state.sliderMain = state.sliderMain.filter(item =>  item._id !== action.payload.id)},
        [deleteSlide.rejected]: () => {}, //вызывается, если ошибка

        [deleteFileRed.pending]: (state) => {}, //начинается запрос
        [deleteFileRed.fulfilled]: (state, action) => {
            console.log(state);
            // state.sliderMain =
        },
        [deleteFileRed.rejected]: () => {}, //вызывается, если ошибка

    },

})

// export const {} = mainSlider.actions
export default mainSlider.reducer
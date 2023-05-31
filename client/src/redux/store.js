import { configureStore } from '@reduxjs/toolkit'
import mainSlider  from './slices/sliderSlice'
import regAuth  from './slices/regAuthSlice'
import libImgs  from './slices/imgLibSlice'
import categoriesSlice from './slices/categorySlice'
import productsSlice from './slices/productsSlice'

export const store = configureStore({
    reducer: {
        mainSlider,
        regAuth,
        libImgs,
        categoriesSlice,
        productsSlice
    }
})
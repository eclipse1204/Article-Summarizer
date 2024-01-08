import { configureStore } from "@reduxjs/toolkit";
import {articleSlice} from './Slices/articleSlice.js';

export const store=configureStore({
    reducer:{
        article:articleSlice.reducer
    }
})
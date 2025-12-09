import { configureStore } from "@reduxjs/toolkit";
import genreSlice from "./genreSlice"
import movieSlice from "./movieSlice"

const store = configureStore({
    reducer: {
        genre: genreSlice,
        movie: movieSlice
    }
})

export default store
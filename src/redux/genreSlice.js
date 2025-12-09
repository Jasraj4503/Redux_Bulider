import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../Layout/Api";
// import { data } from "react-router-dom";


export const GenreList = createAsyncThunk("LIST_GENRE", async () => {
    const result = await Api.get("/genre");
    return result.data;
})

export const GenreAdd = createAsyncThunk("ADD_GENRE", async (data) => {
    const result = await Api.post("/genre", data);
    return result.data;
})

export const GenreDelete = createAsyncThunk("DeleteGenre", async (id) => {
    // console.log("id", id)
    await Api.delete(`/genre/${id}`);
    // console.log("id", id)
    return id
})

export const GenreUpdate = createAsyncThunk("UpdateGenre", async (data) => {
    const {id} = data;
    const result = await Api.put(`/genre/${id}`, data)
    return result.data
})


const genreSlice = createSlice({
    name: "genre",
    initialState: {
        genres: [],
        errors: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GenreAdd.fulfilled, (state, action) => {
                state.genres.push(action.payload);
            })

            .addCase(GenreList.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addCase(GenreDelete.fulfilled, (state, action) => {
                // console.log("action.payload", action.payload)
                state.genres = state.genres.filter((g) => g.id !== action.payload);
                // console.log("state.genres after delete", state.genres)
            })
            .addCase(GenreUpdate.fulfilled, (state, action) => {
                const { id } = action.payload
                const index = state.genres.findIndex((g) => g.id == id)
                if (index != -1) {
                    state.genres[index] = action.payload
                    // console.log(id);
                }
            })
    },

})


export default genreSlice.reducer;



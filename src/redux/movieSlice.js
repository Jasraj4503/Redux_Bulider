import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../Layout/Api";


export const MovieAdd = createAsyncThunk("AddMovie", async(data) =>{
    const res = await Api.post("/movies", data)
    return res.data
})

export const MovieList = createAsyncThunk("GetMovie", async() =>{
    const res = await Api.get("/movies")
    return res.data
})

export const MovieDelete = createAsyncThunk("DeleteMovie", async(id) =>{
    await Api.delete(`/movies/${id}`)
    return id
})

export const MovieUpdate = createAsyncThunk("UpdateMovie", async(data) =>{
    const {id} = data
    const res = await Api.put(`/movies/${id}`, data)
    return res.data
})

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: []
    },
    reducers: {}, 
    extraReducers: (poster) =>{
        poster
        .addCase(MovieAdd.fulfilled, (state, action)=>{
            state.movies.push(action.payload)
        })
        .addCase(MovieList.fulfilled, (state, action)=>{
            state.movies = action.payload
        })
        .addCase(MovieDelete.fulfilled, (state, action)=>{
            state.movies = state.movies.filter((m)=> m.id !== action.payload)
        })
        .addCase(MovieUpdate.fulfilled, (state, action)=>{
            const {id} = action.payload
            const index = state.movies.findIndex((m) => m.id==id)
            if(index != -1){
                state.movies[index] = action.payload
            }
        })
    }
})

export default movieSlice.reducer
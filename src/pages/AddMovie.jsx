import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { MovieAdd, MovieList, MovieUpdate } from "../redux/movieSlice"

const MovieForm = () => {

  const { register, handleSubmit, reset } = useForm()
  const {genres} = useSelector((state)=> state.genre)
  const {movies} = useSelector((state)=> state.movie)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams()

  
  async function onSubmit(data) {
    if (id) {
      dispatch(MovieUpdate(data))
      alert("Movie Updated")
    }
    else {
     
      dispatch(MovieAdd(data))
      toast.success("Movie added");
    }
    reset()
    navigate("/")
  }

  useEffect(() => {
    if(id){
      dispatch(MovieList())
    }
    const singleMovie = movies.find(movie => movie.id == id)
    reset(singleMovie)
  }, [dispatch, reset, id])

  return (
    <>
      <div className="container-box m-5 bg-white">
        <div className="card">
          <div className="card-body">
            <h3 className="text-center">
              {id ? "Edit Movie" : "Add Movie"}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="mt-3">
                <label className="form-label">Movie Poster URL</label>
                <input
                  type="url"
                  {...register('poster', { required: true })}
                  className="form-control"
                  placeholder="Enter movie poster URL"
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Movie Title</label>
                <input
                  type="text"
                  {...register('title', { required: true })}
                  className="form-control"
                  placeholder="Enter movie title"
                   onInput={(e) => e.target.value = e.target.value.toUpperCase()}
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Release Year</label>
                <input
                  type="date"
                  {...register('year', { required: true })}
                  className="form-control"
                  placeholder="Enter release year"
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Genre</label>
                <select type="text" {...register('genre_cat',{ required: true })} className="form-select" placeholder="Enter genre" >
                  <option value="" >Select Genre</option>
                  {genres.map((m) => (<option key={m.id} value={m.id}>{m.title}</option>))}
                </select>
              </div>

              <div className="mt-3">
                <label className="form-label">Rating (IMDB)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register('rating',{ required: true })}
                  className="form-control"
                  placeholder="Enter rating (0 to 10)"
                />
              </div>

              <div className="mt-3">
                <label className="form-label">Description</label>
                <textarea
                  {...register('description',{ required: true })}
                  className="form-control"
                  placeholder="Enter movie description"
                  rows="3"
                ></textarea>
              </div>

              <div className="mt-4 text-center">
                <button className="btn btn-success">
                  {id ? "Update Movie" : "Add Movie"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </>
  )
}

export default MovieForm

import { lazy } from "react"

const GenreList = lazy(()=> import('../pages/GenreList'))
const Home = lazy(()=>import('../pages/MovieList'))
const Genre = lazy(()=>import('../pages/AddGenre'))
const MovieForm = lazy(()=>import('../pages/AddMovie'))

const Routing = [
    {
        path:"/",
        element:Home
    },
    {
        path:"/add-category",
        element:Genre
    },
    {
        path:"/genre-list",
        element:GenreList
    },
    {
        path:"/edit-genre/:id",
        element:Genre
    },
    {
        path:"/add-movie",
        element:MovieForm
    },
    {
        path:"/add-movie/:id",
        element:MovieForm
    },
]

export default Routing
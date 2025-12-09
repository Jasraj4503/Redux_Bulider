import { useEffect } from "react"
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit, FaStar } from "react-icons/fa";
import "../assets/css/Movie.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MovieDelete, MovieList } from "../redux/movieSlice";
import Swal from "sweetalert2";
import { GenreList } from "../redux/genreSlice";

const Home = () => {

  const dispatch = useDispatch()
  const { movies } = useSelector((state) => state.movie)
  const { genres } = useSelector((state) => state.genre)
  const navigate = useNavigate()

  const deleteMovie = (id) => {
    Swal.fire({
      title: "Delete Movie?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(MovieDelete(id));
          Swal.fire("Deleted!", "The movie has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error", "Failed to delete movie", "error");
        }
      }
    });
  };


  function editMovie(id) {
    navigate(`/add-movie/${id}`)
  }

  useEffect(() => {
    dispatch(MovieList())
    dispatch(GenreList())
  }, [dispatch])

  return (
    <>
      <div className="container py-4">
        <div className="row g-4">

          {
            movies && movies.map((m) => (
              <div className="col-lg-4 col-md-6" key={m.id}>
                <div className="movie-card card border-0 shadow-lg rounded-4 overflow-hidden">

                  {/* Movie Image */}
                  <div className="movie-img-box">
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="movie-img img-fluid"
                    />
                    <span className="year-badge">{m.year}</span>
                  </div>

                  <div className="card-body">

                    {/* Movie Title */}
                    <h5 className="fw-bold mb-1">{m.title}</h5>

                    {/* Rating */}
                    <div className="rating d-flex align-items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={star <= m.rating ? "text-warning" : "text-secondary"}
                        />
                      ))}
                      <span className="ms-2 text-muted">({m.rating})</span>
                    </div>

                    {/* Genre */}
                    <span className="badge bg-primary mb-2">{m.genre_cat}</span>

                    {/* Description */}
                    <p className="text-muted small">{m.description}</p>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                        onClick={() => editMovie(m.id)}
                      >
                        <FaEdit /> Edit
                      </button>

                      <button className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteMovie(m.id)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))
          }

        </div>
      </div>
    </>
  )
}

export default Home

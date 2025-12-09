import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GenreAdd, GenreList, GenreUpdate } from "../redux/genreSlice";

const GenreForm = () => {

    const { register, handleSubmit, reset } = useForm();
    const { genres } = useSelector((state) => state.genre); 
    const navigate = useNavigate();
    const { id } = useParams();   
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(GenreList());
        }
        const singledata = genres.find(genre => genre.id == id)
        // console.log(singledata)
        reset(singledata) 

    }, [dispatch, reset, id]);
    // console.log(genres)

    // ADD or UPDATE handler
    async function onSubmit(data) {
        if (id) {
            dispatch(GenreUpdate(data))
            alert("Genre Updated!");
        } else {
            dispatch(GenreAdd(data))
            alert("Genre Added!");
        }

        reset();
        navigate("/genre-list");
    }

    return (
        <div className="container-box m-5 bg-white">
            <div className="card">
                <div className="card-body">
                    <h3 className="text-center">
                        {id ? "Edit Genre" : "Add Genre"}
                    </h3>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="mt-3">
                            <label className="form-label">Genre</label>
                            <input
                                type="text"
                                {...register('title', { required: true })}
                                className="form-control"
                                placeholder="Enter Genre Name"
                            />
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Status</label>
                            <select {...register('status')} className="form-select">
                                <option value="1">Active</option>
                                <option value="2">DeActivate</option>
                            </select>
                        </div>

                        <div className="mt-4 text-center">
                            <button className="btn btn-success">
                                {id ? "Update Genre" : "Add Genre"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default GenreForm;

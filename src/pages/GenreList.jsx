import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GenreList, GenreDelete } from "../redux/genreSlice";

const GenreManagement = () => {

    const dispatch = useDispatch();
    const { genres } = useSelector((state) => state.genre); 
     

    // Fetch all genre on page load
    useEffect(() => {
        dispatch(GenreList());
    }, [dispatch]);

    // Delete item handler
    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(GenreDelete(id));
            alert("Genre Deleted!");
            dispatch(GenreList()); 
        }
    };

    return (
        <div className="container my-5">

            <div className="d-flex justify-content-between align-items-center">
                <h3>Genre List</h3>

                <Link to="/add-category" className="btn btn-primary">
                    Add Genre
                </Link>
            </div>

            <table className="table table-bordered table-hover mt-4">
                <thead className="table-dark text-center">
                    <tr>
                        <th>#</th>
                        <th>Genre Title</th>
                        <th>Status</th>
                        <th width="180px">Action</th>
                    </tr>
                </thead>

                <tbody className="text-center">
                    {
                        genres?.length > 0 ? (
                            genres.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.status == 1 ? "Active" : "Deactivate"}</td>
                                    <td>
                                        <Link
                                            to={`/edit-genre/${item.id}`}
                                            className="btn btn-sm btn-warning me-2"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Data Found</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

        </div>
    );
};

export default GenreManagement;

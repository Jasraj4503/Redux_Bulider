import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import "../assets/css/Sidebar.css"

const Sidebar = () => {
    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-white shadow"
            style={{ width: "260px", height: "100%", position: "fixed" }}
        >
            <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
            >
                <img src={Logo} alt="" height={55} className="me-2" />
                <span className="fs-5 fw-bold">Movie<br />Management</span>
            </a>

            <hr />

            <ul className="nav nav-pills flex-column mb-auto">

                <li className="nav-item">
                    <NavLink
                        to="/"
                        className="nav-link text-dark"

                        style={{ fontSize: "18px" }}
                    >
                        Movie Management
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/genre-list"
                        className="nav-link text-dark"
                        style={{ fontSize: "18px" }}
                    >
                        Genre Management
                    </NavLink>
                </li>

                <li className="nav-item mt-2">
                    <NavLink
                        to="/add-category"
                        className="nav-link text-dark"
                        style={{ fontSize: "18px" }}
                    >

                        List Your Genre
                    </NavLink>
                </li>

                <li className="nav-item mt-2">
                    <NavLink
                        to="/add-movie"
                        className="nav-link text-dark"
                        style={{ fontSize: "18px" }}
                    >
                        List Your Movie
                    </NavLink>
                </li>

            </ul>

            <hr />

            <div className="text-muted small">© 2025</div>
        </div>
    );
};

export default Sidebar;

import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">MyApp</Link>

                <div className="ml-auto d-flex gap-2">
                    <Link to="/login">
                        <button className="btn btn-outline-primary me-2">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn btn-primary">Sign Up</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="container my-4">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [data, setData] = useState(null);
    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchPrivate = async () => {
            try {
                const res = await fetch(`${backendUrl}/api/private`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }

                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching private data:", error);
            }
        };

        fetchPrivate();
    }, []);

    return (
        <div>
            <h1>Private Page</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
        </div>
    );
};

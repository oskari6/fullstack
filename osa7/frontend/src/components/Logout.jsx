import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../store";

export const Logout = () => {
    const navigate = useNavigate();
    const { reset } = useAuthActions();

    const handleLogout = async (event) => {
        event.preventDefault();
        await reset();
        navigate("/blogs");
    };

    return (
        <p style={{ padding: 5 }}>
            <Button type="button" onClick={handleLogout}>
                logout
            </Button>
        </p>
    );
};

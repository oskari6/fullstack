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
        <Button color="inherit" type="button" onClick={handleLogout}>
            logout
        </Button>
    );
};

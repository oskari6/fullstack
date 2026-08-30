import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
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

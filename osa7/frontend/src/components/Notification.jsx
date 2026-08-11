import { Alert } from "@mui/material";
import { useNotifications } from "../store";

const Notification = () => {
    const { message, type } = useNotifications();

    if (message === "" || type === "") {
        return null;
    }

    return (
        <Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}>
            {message}
        </Alert>
    );
};

export default Notification;

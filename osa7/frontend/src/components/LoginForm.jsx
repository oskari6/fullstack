import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Logout } from "../components/Logout";
import { useField } from "../hooks/useField";
import loginService from "../services/login";
import { useAuth, useAuthActions, useNotificationActions } from "../store";

export const LoginForm = () => {
    const { create } = useNotificationActions();
    const { create: createAuth } = useAuthActions();
    const { username: storedUsername, name: storedName } = useAuth();
    const username = useField("text");
    const password = useField("password");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username: username.input.value, password: password.input.value });
            await createAuth(user.name, user.token, user.username);
            create("Login success", "success");
            navigate("/blogs");
        } catch {
            create("wrong username or password", "error");
        }
    };

    return (
        <>
            {storedUsername ? (
                <div>
                    {storedName} logged in
                    <Logout />
                </div>
            ) : (
                <>
                    <h2>Login</h2>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 150,
                            gap: 2
                        }}
                    >
                        <TextField placeholder="username" {...username.input} />
                        <TextField placeholder="password" {...password.input} />
                        <Button style={{ backgroundColor: "blue" }} onClick={handleLogin}>
                            login
                        </Button>
                    </form>
                </>
            )}
        </>
    );
};

import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Blog } from "./components/Blog";
import { BlogForm } from "./components/BlogForm";
import { BlogList } from "./components/BlogList";
import ErrorBoundary from "./components/ErrorBoundary";
import { Home } from "./components/Home";
import { LoginForm } from "./components/LoginForm";
import { Logout } from "./components/Logout";
import { NotFound } from "./components/NotFound";
import Notification from "./components/Notification";
import { User } from "./components/User";
import { UserList } from "./components/UserList";
import { useAuth, useBlogActions } from "./store";

const App = () => {
    const { initialize } = useBlogActions();
    const { username } = useAuth();

    useEffect(() => {
        initialize();
    }, [initialize]);

    return (
        <Container style={{ fontFamily: "Arial, sans-serif" }}>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <h1>Blog app</h1>
                        <Box sx={{ marginLeft: "auto" }}>
                            <Button color="inherit" component={Link} to="/">
                                home
                            </Button>
                            <Button color="inherit" component={Link} to="/users">
                                users
                            </Button>
                            <Button color="inherit" component={Link} to="/blogs">
                                blogs
                            </Button>
                            <Button color="inherit" component={Link} to="/create">
                                new blog
                            </Button>
                            {!username && (
                                <Button color="inherit" component={Link} to="/login">
                                    login
                                </Button>
                            )}
                            {username && <Logout />}
                        </Box>
                    </Toolbar>
                </AppBar>

                <Notification />

                <ErrorBoundary>
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/users/:id" element={<User />} />
                        <Route path="/blogs/:id" element={<Blog />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/blogs" element={<BlogList />} />
                        <Route path="/create" element={username ? <BlogForm /> : <Navigate replace to="/login" />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </ErrorBoundary>
            </Router>
        </Container>
    );
};

export default App;

import { Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUsers";

export const User = () => {
    const id = useParams().id;
    const { user } = useUser(id);
    if (!user) {
        return <p>User not found</p>;
    }
    console.log(user.blogs);

    return (
        <>
            <Container data-testid="blog">
                <Box
                    sx={{
                        boxShadow: 3,
                        borderRadius: 1,
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >
                    <h2>{user.name}</h2>
                    {user.blogs.length > 0 ? (
                        <>
                            <span style={{ color: "grey " }}>added blogs</span>
                            <ul>
                                {user.blogs.map((b) => (
                                    <li>{b.title}</li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>No blogs</p>
                    )}
                </Box>
            </Container>
        </>
    );
};

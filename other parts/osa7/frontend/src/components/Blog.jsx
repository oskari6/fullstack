import { Box, Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useField } from "../hooks/useField";
import { useAuth, useBlog, useBlogActions, useNotificationActions } from "../store";

export const Blog = () => {
    const id = useParams().id;
    const blog = useBlog(id);
    const comment = useField("text");

    const { create } = useNotificationActions();
    const { update, remove } = useBlogActions();

    const [visible, setVisible] = useState(false);
    const { username } = useAuth();

    const navigate = useNavigate();

    const handleLikeBlog = async () => {
        try {
            await update(id, { ...blog, likes: blog.likes + 1 });
        } catch {
            create("liking blog failed", "error");
        }
    };

    const handleComment = async () => {
        try {
            await update(id, { ...blog, comments: [...blog.comments, comment.input.value] });
        } catch {
            create("commenting blog failed", "error");
        }
    };

    const handleRemoveBlog = async () => {
        if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            return;
        }
        try {
            await remove(id);
            navigate("/blogs");
            create("blog removed successfully", "success");
        } catch {
            create("removing blog failed", "error");
        }
    };

    if (!blog) {
        return null;
    }

    const isOwned = username ? blog.creator?.username === username : false;

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
                    <h2>{blog.title}</h2>
                    <span style={{ color: "grey " }}>by {blog.author}</span>
                    {visible && (
                        <>
                            <a href={blog.url}>{blog.url}</a>
                            <span style={{ color: "grey" }}>Added by {blog.creator.name}</span>
                            <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                {blog.likes} like{blog.likes === 1 ? "" : "s"}
                                {username && (
                                    <Button
                                        style={{
                                            borderColor: "blue",
                                            borderWidth: "0.5px"
                                        }}
                                        onClick={handleLikeBlog}
                                    >
                                        like
                                    </Button>
                                )}
                                {isOwned && (
                                    <Button
                                        style={{
                                            color: "red",
                                            width: 75,
                                            borderColor: "red",
                                            borderWidth: "0.5px"
                                        }}
                                        onClick={handleRemoveBlog}
                                    >
                                        remove
                                    </Button>
                                )}
                            </span>
                            <Box sx={{ mt: 2 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        alignItems: "center",
                                        mb: 2
                                    }}
                                >
                                    <TextField placeholder="Add a comment" size="small" {...comment.input} />

                                    <Button variant="contained" onClick={handleComment} sx={{ whiteSpace: "nowrap" }}>
                                        Add comment
                                    </Button>
                                </Box>
                                <ul>{blog.comments.length > 0 && blog.comments.map((c) => <li>{c}</li>)}</ul>
                            </Box>
                        </>
                    )}
                    <Button
                        style={{
                            width: 75,
                            color: "gray",
                            borderWidth: "0.5px"
                        }}
                        onClick={() => setVisible((prev) => !prev)}
                    >
                        {visible ? "hide" : "view"}
                    </Button>
                </Box>
            </Container>
        </>
    );
};

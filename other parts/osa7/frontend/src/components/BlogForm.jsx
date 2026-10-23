import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";
import { useBlogActions, useNotificationActions } from "../store";

export const BlogForm = () => {
    const { create } = useNotificationActions();
    const { create: createBlog } = useBlogActions();

    const title = useField("text");
    const author = useField("text");
    const url = useField("text");

    const [formVisible, setFormVisible] = useState(false);
    const navigate = useNavigate();

    const handleCreateBlog = async (event) => {
        event.preventDefault();
        try {
            await createBlog({
                title: title.input.value,
                author: author.input.value,
                url: url.input.url
            });
            navigate("/blogs");
            create(`Note '${title.input.value}' added!`, "success");
        } catch {
            create("creating blog failed", "error");
        }
    };

    return (
        <>
            <h2>Create new</h2>
            {formVisible ? (
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "150px",
                        gap: 2
                    }}
                >
                    <TextField placeholder="title" {...title.input} />
                    <TextField placeholder="author" {...title.author} />
                    <TextField placeholder="url" {...title.url} />
                    <Button onClick={handleCreateBlog} variant="contained" style={{ marginTop: 10 }}>
                        create
                    </Button>
                    <Button onClick={() => setFormVisible(false)} type="button">
                        cancel
                    </Button>
                </form>
            ) : (
                <Button type="button" onClick={() => setFormVisible(true)}>
                    create new blog
                </Button>
            )}
        </>
    );
};

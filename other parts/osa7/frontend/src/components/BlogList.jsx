import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { useBlogs } from "../store";

export const BlogList = () => {
    const blogs = useBlogs();
    return (
        <>
            <h2>blogs</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>blog</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.map((blog) => (
                            <TableRow key={blog.id}>
                                <TableCell>
                                    <Link to={`/blogs/${blog.id}`}>
                                        {blog.title} {blog.author}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

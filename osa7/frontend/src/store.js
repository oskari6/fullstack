import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import blogService from "./services/blogs";
import { getUser, removeUser, saveUser } from "./services/persistentUser";

const savedUser = getUser();

const logger = (config) => (set, get) =>
    config((...args) => {
        console.log("prev state", get());
        set(...args);
        console.log("next state", get());
    }, get);

const useAuthStore = create(
    logger((set) => ({
        name: savedUser?.name ?? "",
        token: savedUser?.token ?? "",
        username: savedUser?.username ?? "",
        actions: {
            create: async (name, token, username) => {
                set(() => ({ name }));
                set(() => ({ token }));
                set(() => ({ username }));
                saveUser({ name, token, username });
            },
            reset: async () => {
                set(() => ({ name: "" }));
                set(() => ({ token: "" }));
                set(() => ({ username: "" }));
                removeUser();
            }
        }
    }))
);

const useNotificationStore = create(
    logger((set) => ({
        message: "",
        type: "",
        actions: {
            create: async (content, type) => {
                set(() => ({ message: content }));
                set(() => ({ type }));
                setTimeout(() => {
                    set(() => ({ message: "" }));
                    set(() => ({ type: "" }));
                }, 5000);
            }
        }
    }))
);

const sortByLikes = (blogs) => [...blogs].sort((a, b) => b.likes - a.likes);

export const useBlogStore = create(
    logger((set) => ({
        blogs: [],
        actions: {
            add: async (content) => {
                const newBlog = await blogService.createNew(content);
                set((state) => ({ blogs: sortByLikes(state.blogs.concat(newBlog)) }));
            },
            initialize: async () => {
                const blogs = await blogService.getAll();
                set(() => ({ blogs: sortByLikes(blogs) }));
            },
            update: async (id, updatedBlog) => {
                const updated = await blogService.update(updatedBlog);
                set((state) => ({
                    blogs: sortByLikes(
                        state.blogs.map((n) =>
                            n.id === id
                                ? {
                                      ...updated,
                                      creator: n.creator
                                  }
                                : n
                        )
                    )
                }));
            },
            remove: async (id) => {
                const blog = useBlogStore.getState().blogs.find((n) => n.id === id);
                await blogService.remove(blog.id);
                set((state) => ({
                    blogs: sortByLikes(state.blogs.filter((n) => n.id !== id))
                }));
            }
        }
    }))
);

export const useBlogs = () => useBlogStore((state) => state.blogs);
export const useBlog = (id) => useBlogStore((state) => state.blogs.find((blog) => blog.id === id));
export const useBlogActions = () => useBlogStore((state) => state.actions);
export const useNotifications = () =>
    useNotificationStore(
        useShallow((state) => ({
            message: state.message,
            type: state.type
        }))
    );
export const useNotificationActions = () => useNotificationStore((state) => state.actions);
export const useAuth = () =>
    useAuthStore(
        useShallow((state) => ({
            name: state.name,
            token: state.token,
            username: state.username
        }))
    );
export const useAuthActions = () => useAuthStore((state) => state.actions);

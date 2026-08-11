export const getUser = () => {
    return window.localStorage.getItem("loggedBlogappUser");
};
export const saveUser = (user) => {
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
};
export const removeUser = () => {
    window.localStorage.removeItem("loggedBlogappUser");
};

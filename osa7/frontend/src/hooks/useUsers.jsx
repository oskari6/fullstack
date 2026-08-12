import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

export const useUsers = () => {
    const result = useQuery({
        queryKey: ["users"],
        queryFn: userService.getAll,
        refetchOnWindowFocus: false,
        retry: false
    });
    return {
        users: result.data
    };
};

export const useUser = (id) => {
    const result = useQuery({
        queryKey: ["users", `users-${id}`],
        queryFn: () => userService.getById(id),
        refetchOnWindowFocus: false,
        retry: false
    });
    console.log(result);
    return {
        user: result.data
    };
};

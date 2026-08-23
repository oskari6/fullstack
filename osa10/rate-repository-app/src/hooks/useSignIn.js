import { useMutation } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

export const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);

    return data;
  };

  return [signIn, result];
};

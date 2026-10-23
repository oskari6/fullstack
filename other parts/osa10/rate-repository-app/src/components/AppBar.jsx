import { useApolloClient, useQuery } from "@apollo/client/react";
import Constants from "expo-constants";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import { GET_ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  if (!data) {
    return;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Link to={"/"}>
          <Text style={{ color: "white" }}>Repositories</Text>
        </Link>

        {data.me ? (
          <>
            <Link to={"/create-review"}>
              <Text style={{ color: "white" }}>Create a review</Text>
            </Link>
            <Link to={"/my-reviews"}>
              <Text style={{ color: "white" }}>My reviews</Text>
            </Link>
            <Pressable onPress={logout}>
              <Text style={{ color: "white" }}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to={"/sign-in"}>
              <Text style={{ color: "white" }}>Sign In</Text>
            </Link>
            <Link to={"/sign-up"}>
              <Text style={{ color: "white" }}>Sign Up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

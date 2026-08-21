import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={{ flexDirection: "row" }}>
        <Link to={"/"}>
          <Text style={{ color: "white" }}>Respositories</Text>
        </Link>
        <Link to={"/sign-in"}>
          <Text style={{ color: "white" }}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;

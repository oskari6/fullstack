import { StyleSheet, View } from "react-native";
import { Navigate, Route, Routes } from "react-router-native";
import AppBar from "./AppBar";
import { RepositoryList } from "./RepositoryList";
import { RepositoryView } from "./RepositoryView";
import { ReviewForm } from "./ReviewForm";
import { ReviewView } from "./ReviewView";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUpForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/create-review" element={<ReviewForm />} />
        <Route path="/my-reviews" element={<ReviewView />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;

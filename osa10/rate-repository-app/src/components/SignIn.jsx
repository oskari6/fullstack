import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import Text from "./Text";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const SignIn = () => {
  const onSubmit = () => {
    console.log("ok");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const styles = StyleSheet.create({
    inputStyle: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      padding: 10,
    },
  });

  return (
    <View style={{ backgroundColor: "white", padding: 5, gap: 5 }}>
      <TextInput
        onBlur={formik.handleBlur("username")}
        style={[
          styles.inputStyle,
          formik.touched.username &&
            formik.errors.username && {
              borderColor: "red",
            },
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        onBlur={formik.handleBlur("password")}
        style={[
          styles.inputStyle,
          formik.touched.password &&
            formik.errors.password && {
              borderColor: "red",
            },
        ]}
        placeholder="Password"
        type="password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 5,
        }}
        onPress={formik.handleSubmit}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

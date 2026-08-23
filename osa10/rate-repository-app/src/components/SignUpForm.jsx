import { useApolloClient, useMutation } from "@apollo/client/react";
import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import { CREATE_USER } from "../graphql/mutations";
import { useSignIn } from "../hooks/useSignIn";
import Text from "./Text";

const initialValues = {
  username: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(5, "username must be atleast 5 chars long")
    .max(30, "username must less than 30 chars long"),
  password: yup.string().required("password is required"),
  passwordConfirm: yup
    .string()
    .required("password confirmation is required")
    .oneOf([yup.ref("password")], "passwords must match"),
});

export const SignUpContainer = ({ onSubmit }) => {
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
      <TextInput
        onBlur={formik.handleBlur("passwordConfirm")}
        style={[
          styles.inputStyle,
          formik.touched.passwordConfirm &&
            formik.errors.passwordConfirm && {
              borderColor: "red",
            },
        ]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirma}
        onChangeText={formik.handleChange("passwordConfirm")}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: "red" }}>{formik.errors.passwordConfirm}</Text>
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
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export const SignUp = () => {
  const [signIn] = useSignIn();
  const [createUser] = useMutation(CREATE_USER);

  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      await signIn({ username, password });
      await apolloClient.resetStore();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

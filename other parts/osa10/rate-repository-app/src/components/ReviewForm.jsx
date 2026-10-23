import { useApolloClient, useMutation } from "@apollo/client/react";
import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as yup from "yup";
import { CREATE_REVIEW } from "../graphql/mutations";
import Text from "./Text";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: 0,
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("owner name is required"),
  repositoryName: yup.string().required("repository name is required"),
  rating: yup
    .number()
    .required("rating is required")
    .min(0, "rating must be at least 0")
    .max(100, "rating must be at most 100"),
});

export const ReviewFormContainer = ({ onSubmit }) => {
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
        onBlur={formik.handleBlur("ownerName")}
        style={[
          styles.inputStyle,
          formik.touched.ownerName &&
            formik.errors.ownerName && {
              borderColor: "red",
            },
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: "red" }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        onBlur={formik.handleBlur("repositoryName")}
        style={[
          styles.inputStyle,
          formik.touched.repositoryName &&
            formik.errors.repositoryName && {
              borderColor: "red",
            },
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />
      <TextInput
        onBlur={formik.handleBlur("rating")}
        style={[
          styles.inputStyle,
          formik.touched.rating &&
            formik.errors.rating && {
              borderColor: "red",
            },
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />
      <TextInput
        style={[styles.inputStyle]}
        placeholder="Review"
        multiline
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
      />
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
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);

  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      });
      await apolloClient.resetStore();
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

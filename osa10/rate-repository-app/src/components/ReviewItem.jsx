import { useMutation } from "@apollo/client/react";
import { Alert, Linking, Pressable, View } from "react-native";
import { DELETE_REVIEW, GET_ME } from "../graphql/mutations";
import Text from "./Text";

export const ReviewItem = ({ review, myReview }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = async () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview({
                variables: {
                  id: review.id,
                },
                refetchQueries: [
                  {
                    query: GET_ME,
                    variables: {
                      includeReviews: true,
                    },
                  },
                ],
              });
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          padding: 15,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderWidth: 2,
            borderColor: "#0366d6",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Text
            style={{
              color: "#0366d6",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {review.rating}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {review.user.username}
          </Text>
          <Text
            style={{
              color: "grey",
              marginBottom: 5,
            }}
          >
            {formatDate(review.createdAt)}
          </Text>
          <Text
            style={{
              flexShrink: 1,
            }}
          >
            {review.text}
          </Text>
        </View>
      </View>
      {myReview && (
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            backgroundColor: "white",
            padding: 5,
            gap: 5,
          }}
        >
          <Pressable
            style={{
              padding: 5,
              borderRadius: 4,
              backgroundColor: "#0366d6",
              color: "white",
            }}
            onPress={() => Linking.openURL(review.repository.url)}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              View repository
            </Text>
          </Pressable>
          <Pressable
            style={{
              padding: 5,
              borderRadius: 4,
              backgroundColor: "red",
              color: "white",
            }}
            onPress={handleDelete}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

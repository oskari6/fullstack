import { FlatList, StyleSheet, View } from "react-native";
import { ReviewItem } from "./ReviewItem";
import Text from "./Text";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewListContainer = ({ reviews, myReviews, onEndReach }) => {
  const renderItem = ({ item }) => (
    <ReviewItem myReview={myReviews} review={item} />
  );
  return (
    <>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={renderItem}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <Text>No reviews</Text>
      )}
    </>
  );
};

export const ReviewList = ({ reviews, myReviews, onEndReach }) => {
  return (
    <ReviewListContainer
      reviews={reviews}
      myReviews={myReviews}
      onEndReach={onEndReach}
    />
  );
};

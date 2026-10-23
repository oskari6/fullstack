import { GET_ME } from "../graphql/queries";
import useReviews from "../hooks/useReviews";
import { ReviewList } from "./ReviewList";

export const ReviewView = () => {
  const { data, fetchMore } = useReviews(GET_ME, {
    includeReviews: true,
    first: 4,
  });

  if (!data) {
    return;
  }

  return (
    <ReviewList
      myReviews={true}
      reviews={data.me.reviews.edges.map((edge) => edge.node)}
      onEndReach={fetchMore}
    />
  );
};

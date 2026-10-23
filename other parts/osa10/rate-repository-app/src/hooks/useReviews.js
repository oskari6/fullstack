import { useQuery } from "@apollo/client/react";
import { useRef } from "react";

const useReviews = (query, variables) => {
  const fetchingMore = useRef(false);
  const { data, loading, fetchMore, ...result } = useQuery(query, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const reviews = data?.repository?.reviews ?? data?.me?.reviews;

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && !fetchingMore.current && reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchingMore.current = true;
    return fetchMore({
      variables: {
        after: reviews.pageInfo.endCursor,
        ...variables,
      },
    }).finally(() => {
      fetchingMore.current = false;
    });
  };

  return {
    data,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useReviews;

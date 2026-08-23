import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import useReviews from "../hooks/useReviews";
import { RepositoryItem } from "./RepositoryItem";

export const RepositoryViewContainer = ({ data, onEndReach }) => {
  if (!data) {
    return;
  }

  return (
    <RepositoryItem
      repository={data?.repository}
      showDetails={true}
      onEndReach={onEndReach}
    />
  );
};

export const RepositoryView = () => {
  const { id } = useParams();

  const { data, fetchMore } = useReviews(GET_REPOSITORY, { id, first: 4 });

  return <RepositoryViewContainer data={data} onEndReach={fetchMore} />;
};

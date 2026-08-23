import { useNavigate, useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import useReviews from "../hooks/useReviews";
import { RepositoryItem } from "./RepositoryItem";

export const RepositoryViewContainer = ({ data, onEndReach, onNavigate }) => {
  return (
    <RepositoryItem
      onNavigate={onNavigate}
      repository={data?.repository}
      showDetails={true}
      onEndReach={onEndReach}
    />
  );
};

export const RepositoryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, fetchMore } = useReviews(GET_REPOSITORY, { id, first: 4 });

  if (!data) {
    return;
  }

  const onNavigate = () => {
    navigate(`/repository/${data?.repository.id}`);
  };

  return (
    <RepositoryViewContainer
      onNavigate={onNavigate}
      data={data}
      onEndReach={fetchMore}
    />
  );
};

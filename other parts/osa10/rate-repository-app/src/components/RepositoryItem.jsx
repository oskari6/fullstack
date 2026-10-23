import { Image, Linking, Pressable, View } from "react-native";
import { ReviewList } from "./ReviewList";
import Text from "./Text";

export const RepositoryItem = ({
  onNavigate,
  repository,
  showDetails,
  onEndReach,
}) => {
  const formatCount = (count) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
  };

  return (
    <>
      <Pressable onPress={onNavigate}>
        <View
          testID="repositoryItem"
          style={{ padding: 15, backgroundColor: "white" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 4,
                marginRight: 15,
              }}
              source={repository.ownerAvatarUrl}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{repository.fullName}</Text>
              <Text style={{ color: "grey" }}>{repository.description}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    padding: 5,
                    borderRadius: 4,
                    backgroundColor: "#0366d6",
                    color: "white",
                  }}
                >
                  {repository.language}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "between",
              marginTop: 15,
              gap: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>
                {formatCount(repository.stargazersCount)}
              </Text>
              <Text>Stars</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>
                {formatCount(repository.forksCount)}
              </Text>
              <Text>Forks</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>
                {formatCount(repository.reviewCount)}
              </Text>
              <Text>Reviews</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>
                {formatCount(repository.ratingAverage)}
              </Text>
              <Text>Rating</Text>
            </View>
          </View>
          {showDetails && (
            <View>
              <Pressable
                style={{
                  padding: 5,
                  borderRadius: 4,
                  backgroundColor: "#0366d6",
                  color: "white",
                }}
                onPress={() => Linking.openURL(repository.url)}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Open in GitHub
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Pressable>
      {showDetails && (
        <ReviewList
          myReviews={false}
          reviews={repository.reviews.edges.map((edge) => edge.node)}
          onEndReach={onEndReach}
        />
      )}
    </>
  );
};

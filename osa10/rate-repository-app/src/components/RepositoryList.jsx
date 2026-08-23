import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { Picker } from "react-native-web";
import { useDebounce } from "use-debounce";
import { GET_REPOSITORIES } from "../graphql/queries";
import { RepositoryItem } from "./RepositoryItem";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  data,
  sortOption,
  setSortOption,
  setSearchKeyword,
  searchKeyword,
}) => {
  const repositoryNodes = data?.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <RepositoryItem repository={item} showDetails={false} />
  );
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={
        <>
          <TextInput
            style={{
              backgroundColor: "#f5effa",
              borderRadius: 30,
              paddingVertical: 14,
              paddingHorizontal: 20,
              margin: 10,
              fontSize: 18,
            }}
            value={searchKeyword}
            placeholder="Search"
            onChangeText={(value) => setSearchKeyword(value)}
          />
          <Picker
            selectedValue={sortOption}
            onValueChange={(value) => setSortOption(value)}
          >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest" />
            <Picker.Item label="Lowest rated repositories" value="lowest" />
          </Picker>
        </>
      }
    />
  );
};

export const RepositoryList = () => {
  const [sortOption, setSortOption] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const orderDirection = sortOption === "lowest" ? "ASC" : "DESC";
  const orderBy = sortOption === "latest" ? "CREATED_AT" : "RATING_AVERAGE";

  const { data } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderDirection,
      orderBy,
      searchKeyword: debouncedSearchKeyword,
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <RepositoryListContainer
      data={data}
      sortOption={sortOption}
      setSortOption={setSortOption}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

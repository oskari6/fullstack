import { useQuery } from "@apollo/client/react";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
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
  const [pickerVisible, setPickerVisible] = useState(false);

  const repositoryNodes = data?.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <RepositoryItem repository={item} showDetails={false} />
  );

  const sortLabels = {
  latest: "Latest repositories",
  highest: "Highest rated repositories",
  lowest: "Lowest rated repositories",
  };
  
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
          <Pressable onPress={() => setPickerVisible(true)}>
            <Text>{sortLabels[sortOption]} ▼</Text>
          </Pressable>

          <Modal
            visible={pickerVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setPickerVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
            >
              <View style={{ backgroundColor: "white" }}>
                <Picker
                  selectedValue={sortOption}
                  onValueChange={(value) => setSortOption(value)}
                >
                  <Picker.Item label="Latest repositories" value="latest" />
                  <Picker.Item label="Highest rated repositories" value="highest" />
                  <Picker.Item label="Lowest rated repositories" value="lowest" />
                </Picker>

                <Pressable
                  onPress={() => setPickerVisible(false)}
                  style={{ padding: 16, alignItems: "center" }}
                >
                  <Text>Done</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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

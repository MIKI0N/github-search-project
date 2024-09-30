import { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import debounce from "lodash.debounce";

import { gql, useLazyQuery } from "@apollo/client";
import { ApolloResponse } from "@/app/(tabs)/users";

export const SEARCH_GITHUB = gql`
  query searchGithub($query: String!, $type: SearchType!) {
    search(query: $query, type: $type, first: 80) {
      edges {
        node {
          ... on User {
            id
            login
            avatarUrl
            userName: name
            url
          }
          ... on Repository {
            id
            name
            owner {
              login
              avatarUrl
            }
            description
            stargazerCount
            url
          }
        }
      }
    }
  }
`;

interface SearchComponentProps {
  sendDataToParent: (data: ApolloResponse) => void;
  imageBg: NodeRequire;
  searchType: "USER" | "REPOSITORY";
}

export default function SearchComponent({
  sendDataToParent,
  imageBg,
  searchType,
}: Readonly<SearchComponentProps>) {
  const [searchText, setSearchText] = useState("");
  const [searchUsers, { data, loading, error }] = useLazyQuery(SEARCH_GITHUB);

  const handleSearch = useCallback(
    debounce((text) => {
      if (text.length > 0)
        searchUsers({ variables: { query: text, type: searchType } });
    }, 500),
    []
  );

  const onChangeSearch = (text: string) => {
    setSearchText(text);
    handleSearch(text);
  };

  useEffect(() => {
    sendDataToParent({ data, loading, error });
  }, [data, loading, error]);

  return (
    <ImageBackground style={styles.imageRootContainer} source={imageBg as any}>
      <View style={styles.absoluteView} />

      <View style={styles.titleContainer}>
        <Text style={styles.titleRootText}>
          {searchType === "USER" ? "Users" : "Repositories"}
        </Text>

        <TextInput
          style={styles.textInputStyle}
          value={searchText}
          onChangeText={onChangeSearch}
          placeholder="Type here"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleRootText: { fontSize: 30, fontWeight: "bold", color: "white" },
  imageRootContainer: { flex: 0.35 },
  absoluteView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  textInputStyle: {
    width: "65%",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 25,
    color: "white",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

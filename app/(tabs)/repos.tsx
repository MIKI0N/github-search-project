import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SearchComponent from "@/components/SearchComponent";
import { useThemeColor } from "@/hooks/useThemeColor";

import { ApolloResponse } from "./users";

export default function UsersScreen() {
  const textColor = useThemeColor({ light: "black", dark: "white" }, "text");
  const bgColor = useThemeColor(
    { light: "coal", dark: "lightgray" },
    "background"
  );

  const [{ data, loading, error }, setDataFromAPI] = useState<ApolloResponse>({
    data: null,
    loading: false,
    error: undefined,
  });

  const handleDataFromChild = (dataReceived: ApolloResponse) => {
    setDataFromAPI(dataReceived);
  };

  return (
    <ThemedView style={styles.container}>
      <SearchComponent
        sendDataToParent={handleDataFromChild}
        imageBg={require("@/assets/images/reposBg.jpg")}
        searchType="REPOSITORY"
      />

      <View style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <ThemedText type="title">😨</ThemedText>
            <ThemedText style={styles.errorContainerTextStyle}>
              Something went wrong when trying to contact the GitHub API, please
              try again later
            </ThemedText>

            <ThemedText style={styles.errorContainerTextStyle}>
              Have you set your GitHub API token?
            </ThemedText>
          </View>
        )}

        {loading && (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color={textColor} />
            <ThemedText>Loading...</ThemedText>
          </View>
        )}

        {!loading && data && (
          <FlatList
            data={data.search.edges}
            keyExtractor={(item, index) => item.node.id ?? index.toString()}
            renderItem={({ item }) => {
              if (item.node.__typename !== "Repository") return null;

              return (
                <TouchableOpacity>
                  <View
                    style={[styles.itemContainer, { borderColor: bgColor }]}
                  >
                    <ThemedText type="subtitle" style={styles.itemTitleRepo}>
                      {item.node.name}
                    </ThemedText>
                    <View style={styles.itemHorizontalContainer}>
                      <View style={styles.itemOwnerContainer}>
                        <ThemedText type="defaultSemiBold">Owner</ThemedText>
                        <Image
                          source={{ uri: item.node.owner?.avatarUrl }}
                          style={styles.itemOwnerAvatar}
                        />
                        <ThemedText>{item.node.owner?.login}</ThemedText>
                      </View>

                      <View style={styles.itemRepoStarsContainer}>
                        <ThemedText type="defaultSemiBold">Stars</ThemedText>
                        <ThemedText type="subtitle">⭐</ThemedText>
                        <ThemedText>{item.node.stargazerCount}</ThemedText>
                      </View>
                    </View>

                    <ThemedText
                      darkColor="darkgray"
                      style={styles.errorContainerTextStyle}
                    >
                      {item.node.url}
                    </ThemedText>
                    <ThemedText
                      numberOfLines={3}
                      style={styles.errorContainerTextStyle}
                    >
                      {item.node.description}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => (
              <ThemedView
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <ThemedText type="subtitle">No results found!</ThemedText>
                <ThemedText>Try searching something else</ThemedText>
              </ThemedView>
            )}
          />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 20,
  },
  errorContainerTextStyle: { textAlign: "center" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  itemContainer: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1.5,
    margin: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    gap: 10,
  },
  itemTitleRepo: { fontWeight: "bold" },
  itemHorizontalContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  itemOwnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemOwnerAvatar: { width: 50, height: 50, borderRadius: 25 },
  itemRepoStarsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

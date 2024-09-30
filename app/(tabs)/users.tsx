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
import { ApolloError } from "@apollo/client";
import SearchComponent from "@/components/SearchComponent";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ApolloResponse = {
  data: any;
  loading: boolean;
  error: ApolloError | undefined;
};

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
    <ThemedView style={styles.containter}>
      <SearchComponent
        sendDataToParent={handleDataFromChild}
        imageBg={require("@/assets/images/usersBg.jpg")}
        searchType="USER"
      />

      <View style={styles.containter}>
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
              /*
               * Possible bug from the GitHub API, sometimes it returns empty nodes
               * because they're related to other type of results we never asked for
               */
              if (item.node.__typename !== "User") return null;

              return (
                <TouchableOpacity>
                  <View
                    style={[styles.itemContainer, { borderColor: bgColor }]}
                  >
                    <Image
                      source={{ uri: item.node.avatarUrl }}
                      style={styles.itemOwnerAvatar}
                    />
                    <View style={styles.itemOwnerNameContainer}>
                      <ThemedText style={styles.itemOwnerNameText}>
                        {item.node.userName || item.node.login}
                      </ThemedText>
                      <ThemedText>{item.node.url}</ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={() => (
              <ThemedView style={styles.emptyContainer}>
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
  containter: { flex: 1 },
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
    flexDirection: "row",
    paddingVertical: 10,
    borderWidth: 1.5,
    margin: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemOwnerAvatar: { width: 50, height: 50, borderRadius: 25 },
  itemOwnerNameContainer: { marginLeft: 10 },
  itemOwnerNameText: { fontWeight: "bold" },
});

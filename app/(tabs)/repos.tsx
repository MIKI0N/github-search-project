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
import { useState } from "react";
import SearchComponent from "@/components/SearchComponent";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tw } from "./users";

export default function UsersScreen() {
  const textColor = useThemeColor({ light: "black", dark: "white" }, "text");
  const bgColor = useThemeColor(
    { light: "coal", dark: "lightgray" },
    "background"
  );

  const [{ data, loading, error }, setDataFromAPI] = useState<Tw>({
    data: null,
    loading: false,
    error: undefined,
  });

  const handleDataFromChild = (dataReceived: Tw) => {
    setDataFromAPI(dataReceived);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <SearchComponent
        sendDataToParent={handleDataFromChild}
        imageBg={require("@/assets/images/reposBg.jpg")}
        searchType="REPOSITORY"
      />

      <View style={{ paddingLeft: 0, paddingTop: 0, flex: 1 }}>
        {error && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginHorizontal: 20,
            }}
          >
            <ThemedText type="subtitle">😨</ThemedText>
            <ThemedText style={{ textAlign: "center" }}>
              Something went wrong when trying to contact the GitHub API, please
              try again later
            </ThemedText>
          </View>
        )}

        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
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
              if (item.node.__typename !== "Repository") return null;

              return (
                <TouchableOpacity
                  onPress={() => {
                    /* Open repository page */
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      borderWidth: 1.5,
                      margin: 5,
                      paddingHorizontal: 10,
                      borderColor: bgColor,
                      borderRadius: 5,
                      gap: 10,
                    }}
                  >
                    <ThemedText type="subtitle" style={{ fontWeight: "bold" }}>
                      {item.node.name}
                    </ThemedText>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "stretch",
                      }}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ThemedText type="defaultSemiBold">Owner</ThemedText>
                        <Image
                          source={{ uri: item.node.owner?.avatarUrl }}
                          style={{ width: 50, height: 50, borderRadius: 25 }}
                        />
                        <ThemedText>{item.node.owner?.login}</ThemedText>
                      </View>

                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ThemedText type="defaultSemiBold">Stars</ThemedText>
                        <ThemedText type="subtitle">⭐</ThemedText>
                        <ThemedText>{item.node.stargazerCount}</ThemedText>
                      </View>
                    </View>

                    <ThemedText darkColor="darkgray" style={{textAlign: 'center'}}>{item.node.url}</ThemedText>
                    <ThemedText numberOfLines={3} style={{textAlign: 'center'}}>
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

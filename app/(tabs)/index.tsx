import { StyleSheet, ImageBackground, View, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ImageBackground
        style={styles.imageBg}
        source={require("@/assets/images/codeBg.gif")}
      >
        <View style={styles.absoluteView} />

        <View style={styles.titleContainer}>
          <Text style={styles.titleRootText}>GitHub Search</Text>
          <Text style={styles.titleRootSubText}>Ready to get inspired?</Text>
        </View>
      </ImageBackground>

      <View style={styles.innerContainer}>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>
            Find the GitHub repositories and users of your choice. You'll surely
            find something interesting!
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Users</ThemedText>
          <ThemedText>
            Search for users by typing in the search bar. Tap on a user to see
            their details.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Repos</ThemedText>
          <ThemedText>
            Search for repositories by typing in the search bar. Tap on a
            repository to see its details.
          </ThemedText>
        </ThemedView>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBg: { flex: 0.35 },
  absoluteView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 25,
    color: "white",
  },
  innerContainer: { marginHorizontal: 20, marginTop: 30 },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleRootText: { fontSize: 30, fontWeight: "bold", color: "white" },
  titleRootSubText: { fontSize: 20, fontWeight: "bold", color: "white" },
});

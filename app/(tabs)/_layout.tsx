import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name={"logo-github"} color={color} />
          ),
          tabBarLabelStyle: styles.gitHubTabLabelStyle,
          tabBarItemStyle: [
            styles.gitHubTabItemStyle,
            {
              backgroundColor: Colors[colorScheme ?? "light"].gitHubIconBg,
            },
          ],
          tabBarIconStyle: styles.gitHubTabIconStyle,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people-circle" : "people-circle-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="repos"
        options={{
          title: "Repos",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "server" : "server-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  gitHubTabLabelStyle: { display: "none" },
  gitHubTabItemStyle: { flex: 0.45 },
  gitHubTabIconStyle: { bottom: 2 },
});

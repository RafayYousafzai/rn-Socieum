import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useBlogContext } from "@/context/BlogContext";
import { Platform } from "react-native";

export default function TabLayout() {
  const { setPage } = useBlogContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 65,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "barcode" : "barcode-outline"}
              color={color}
            />
          ),
          href: Platform.OS === "web" ? null : undefined,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "time" : "time-outline"}
              color={color}
            />
          ),
          href: Platform.OS === "web" ? null : undefined,
        }}
        listeners={() => ({
          tabPress: () => {
            setPage("AllBlogs");
          },
        })}
      />

      <Tabs.Screen
        name="listBlog"
        options={{
          title: "Blog",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
            />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            setPage("AllBlogs");
          },
        })}
      />
    </Tabs>
  );
}

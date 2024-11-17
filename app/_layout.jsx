import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import BlogProvider from "@/context/BlogContext";
import { Image, View } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAppReady(true), 2000);
  }, []);

  if (!isAppReady) {
    return (
      <View>
        <Image
          source={require("@/assets/app/splash.png")}
          className="w-[100%] h-[100%] bg-black"
        />
      </View>
    );
  }

  return (
    <BlogProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </BlogProvider>
  );
}

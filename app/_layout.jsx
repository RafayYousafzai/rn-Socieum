import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { showToast } from "@/helper/endpoints";
import BlogProvider from "@/context/BlogContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    let timer;
    let splashTimeout;

    if (loaded) {
      // Show toast every 10 seconds
      timer = setInterval(() => {
        showToast("Final Prototype: This build is for testing only.");
      }, 10000);

      // Delay hiding the splash screen for at least 1.5 seconds
      splashTimeout = setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 1500);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(splashTimeout);
    };
  }, [loaded]);

  return (
    <BlogProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </BlogProvider>
  );
}

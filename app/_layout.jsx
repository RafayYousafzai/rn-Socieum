import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback, useState } from "react"; // Added useCallback and useState
import "react-native-reanimated";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import BlogProvider from "@/context/BlogContext";
import { Image, View } from "react-native";

// Prevent auto-hide immediately
SplashScreen.preventAutoHideAsync().catch(() => {
  /* Handling any potential errors in case app reloads */
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => setIsAppReady(true), 2000);
    }
  }, [loaded]);

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
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </BlogProvider>
  );
}

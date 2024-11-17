import React, { useEffect } from "react";
import { Text, View, Platform } from "react-native";
import { useBlogContext } from "@/context/BlogContext";
import { showToast } from "@/helper/endpoints";
import { router } from "expo-router";

export default function BarcodeScanner() {
  if (Platform.OS !== "web") {
    return (
      <Text className="text-center p-4 text-red-600 font-bold">WEB ONLY</Text>
    );
  }

  const { setPage, blogs, setViewBlog, loading } = useBlogContext();

  useEffect(() => {
    if (!blogs) {
      showToast("Sorry there are no blogs!");
      return;
    }

    if (loading) {
      return;
    }

    try {
      const pathname = window.location.pathname;

      const code = pathname.slice(1);

      const response = blogs.find((blog) => blog.qrCodeUniqueString === code);

      if (!response) {
        showToast("No Contribution found against this QR code.");
        return;
      }

      setViewBlog(response._id);
      setPage("Details");
      router.navigate("listBlog");
    } catch (error) {
      console.error("Failed to fetch blog by QR Code:", error);
      showToast("An error occurred while scanning QR Code.");
    }
  }, [blogs, loading]);

  return <View></View>;
}

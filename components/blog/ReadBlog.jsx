import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBlogContext } from "@/context/BlogContext";
import { showToast } from "@/helper/endpoints";

const ReadBlog = ({ setPage }) => {
  const { selectedBlogs } = useBlogContext();
  const { width } = Dimensions.get("window");

  const blog = selectedBlogs?.childStory?.[0];

  if (!blog) {
    showToast("No Contribution.");
    setPage("OverView");
    return null;
  }

  const handleBackPress = () => {
    setPage("OverView");
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {blog.title
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{blog.title}</Text>
            <Text style={styles.title}>Regional Charity Manager</Text>
          </View>
        </View>

        {/* Large Image */}
        <Image
          source={{
            uri: `https://younite.uk/images/${blog.imagePath}`,
          }}
          style={[styles.largeImage, { width }]}
          resizeMode="contain"
        />

        {/* Message Content */}
        <View style={styles.messageContainer}>
          <Text style={styles.paragraph}>{blog.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "black",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute", // Keeps it fixed at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  scrollContent: {
    paddingTop: 80, // To avoid overlapping with the fixed header
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  profileInfo: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    color: "#666",
    fontSize: 14,
  },
  largeImage: {
    height: 200,
    marginVertical: 16,
  },
  messageContainer: {
    padding: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    marginBottom: 16,
  },
});

export default ReadBlog;

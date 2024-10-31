import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBlogContext } from "@/context/BlogContext";
import { showToast } from "@/helper/endpoints";
import Player from "./Player";

function formatDateToCustomString(isoDateString) {
  const date = new Date(isoDateString);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(/,/g, "");
}

const ReadBlog = ({ setPage }) => {
  const { selectedBlog } = useBlogContext();
  const { width } = Dimensions.get("window");

  const blogs = selectedBlog?.childStory;

  if (!blogs || blogs.length === 0) {
    showToast("No Contribution.");
    setPage("OverView");
    return null;
  }

  const handleBackPress = () => {
    setPage("OverView");
  };

  const renderItem = ({ item }) => (
    <View style={styles.blogContainer}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {item.title
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .filter((char) => /[a-zA-Z]/.test(char))
              .join("")}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.title}>Regional Charity Manager</Text>
        </View>
        <Player url={item.voicePath} />
      </View>

      {/* Blog Image */}
      <Image
        source={{ uri: `https://younite.uk/images/${item.imagePath}` }}
        style={styles.largeImage}
        resizeMode="contain"
      />

      {/* Blog Description */}
      <View style={styles.messageContainer}>
        <Text style={styles.paragraph}>{item.description}</Text>
      </View>

      {/* Blog Date */}
      <Text style={[styles.paragraph, { marginHorizontal: 20 }]}>
        {formatDateToCustomString(item.updatedAt)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList Content */}
      <FlatList
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={<View style={{ height: 80 }} />}
      />
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
    position: "absolute",
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
    paddingBottom: 80,
  },
  blogContainer: {
    marginBottom: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "95%",
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
    height: 400,
    marginVertical: 16,
    width: "100%",
    objectFit: "cover",
  },
  messageContainer: {
    padding: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});

export default ReadBlog;

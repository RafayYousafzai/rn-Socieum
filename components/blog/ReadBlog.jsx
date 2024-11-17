import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBlogContext } from "@/context/BlogContext";
import { showToast } from "@/helper/endpoints";
import { Card, Paragraph } from "react-native-paper";
import Player from "./Player";

// Get the device's screen width
const { width } = Dimensions.get("window");
const isLargeScreen = width > 800;

function formatDateToCustomString(isoDateString) {
  const date = new Date(isoDateString);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options).replace(/,/g, "");
}

const ReadBlog = ({ setPage }) => {
  const { selectedBlog } = useBlogContext();
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
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{item.title}</Text>
        </View>
      </View>

      {/* Blog Image */}
      <Image
        source={{
          uri: `https://younite.uk/images/${item.imagePath}`,
        }}
        style={[
          styles.largeImage,
          item.imagePath === "/myFile_1637079444347.png" && { height: 200 },
        ]}
        resizeMode="cover"
      />

      {/* Blog Description */}
      <View style={styles.messageContainer}>
        <Paragraph style={styles.paragraph}>{item.description}</Paragraph>
      </View>

      {/* Blog Date */}
      <Text style={[styles.paragraph, { marginHorizontal: 20 }]}>
        {formatDateToCustomString(item.updatedAt)}
      </Text>
      <Player url={item.voicePath} />
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
    paddingTop: Platform.OS !== "web" && 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "white",
    marginLeft: 8,
    fontSize: 18,
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 80,
    maxWidth: 450,
    marginHorizontal: "auto",
  },
  blogContainer: {
    marginBottom: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginHorizontal: isLargeScreen ? 16 : 0,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
  },
  name: {
    fontSize: isLargeScreen ? 18 : 16,
    fontWeight: "500",
    paddingRight: 27,
  },
  largeImage: {
    height: isLargeScreen ? 320 : 320,
    marginVertical: 6,
    width: "100%",
    objectFit: "cover",
  },
  messageContainer: {
    paddingHorizontal: 16,
  },
  paragraph: {
    fontSize: isLargeScreen ? 18 : 16,
    lineHeight: 24,
    color: "#333",
  },
});

export default ReadBlog;

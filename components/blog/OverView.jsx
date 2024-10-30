import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "@/components/Header";
import BlogCard from "./cards/BlogCard";
import { Ionicons } from "@expo/vector-icons";

const OverView = ({ setPage, blog }) => {
  return (
    <View style={styles.flexContainer}>
      <Header
        text={"Blog Overview"}
        desc={
          "View a summary of your contribution and see how you have helped to change lives"
        }
      />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <BlogCard
              key={blog._id}
              title={blog?.title || ""}
              description={blog?.description || ""}
              donorDescription={blog?.donorDescription || ""}
              imagePath={blog?.imagePath || ""}
              updatedAt={blog?.updatedAt || ""}
              donorName={blog?.donorName || ""}
              _id={blog?._id || ""}
              onPress={() => console.log(blog._id)}
            />
          </View>

          <View style={styles.card}>
            <TouchableOpacity>
              <View style={styles.contributorContainer}>
                <Text style={styles.contributorText}>Contributor</Text>
                <Text style={styles.text}>Y</Text>
              </View>
              <Text style={styles.aboutText}>
                About Contributor : Y wanted to help children and families
                affected by the lockdown
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.seeDetailsButton}>
              <Text style={styles.buttonText}>See Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setPage("Details")}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPage("Read")}
              style={styles.readBlogButton}
            >
              <View style={styles.readBlogContent}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color="white"
                  style={styles.bookIcon}
                />
                <Text style={styles.readBlogText}>Read The Blog</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  card: {
    marginTop: 6,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contributorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contributorText: {
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    fontSize: 14,
    color: "#666",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  aboutText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  seeDetailsButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  backButton: {
    backgroundColor: "#000",
    padding: 12,
    width: 90,
    alignItems: "center",
  },
  readBlogButton: {
    backgroundColor: "#000",
    flex: 1,
    marginLeft: 12,
    padding: 12,
  },
  readBlogContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bookIcon: {
    marginRight: 8,
  },
  readBlogText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default OverView;

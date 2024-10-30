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
    <View>
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
                <Text style={styles.text}>Anonymous-blockchain supporter</Text>
              </View>
              <Text style={styles.text}>
                About Contributor: The individual supports and advises
                blockchain projects tackling social issues
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>See Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setPage("Details")}
              style={styles.overviewButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPage("Read")}
              style={[styles.overviewButton, styles.wideButton]}
            >
              <Text style={styles.overviewButtonText}>Read Blog</Text>
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
    marginHorizontal: 10,
  },
  card: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android
  },
  button: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 3,
    backgroundColor: "#000",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  overviewButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 3,
    backgroundColor: "#000",
    alignItems: "center",
  },
  overviewButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    marginBottom: 8,
  },
  contributorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contributorText: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: "#e0e0e0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
  wideButton: {
    width: "80%",
  },
});

export default OverView;

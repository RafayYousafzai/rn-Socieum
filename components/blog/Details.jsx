import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Header from "@/components/Header";
import BlogCard from "./cards/BlogCard";

const Details = ({ setPage, blog }) => {
  return (
    <View  className="flex-1">
      <Header
        text={"Scan Your QR Code"}
        desc={
          "Scan your QR code or use your 6 digit code to see how your contribution is progressing"
        }
      />
      <View className="flex-1" style={styles.container}>
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
            // Uncomment the line below to enable onPress functionality
            // onPress={() => setViewBlog(blog._id)}
          />
        </View>

        <View style={styles.card}>
          <TouchableOpacity>
            <Text style={styles.text}>
              View your Contribution on the blockchain
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Blockchain</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => setPage("OverView")}
          style={styles.overviewButton}
        >
          <Text style={styles.overviewButtonText}>Blog Overview</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
      width: 15,
      height: 15,
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
    marginBottom: 16,
  },
});

export default Details;

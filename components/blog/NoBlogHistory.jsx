import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const NoBlogHistory = ({ onAddBlog }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/no_blog.png")}
        style={styles.image}
      />
      <Text style={styles.title}>No Blog History</Text>
      <Text style={styles.message}>
        It looks like you haven’t created any blogs yet. Start sharing your
        thoughts and ideas!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate("listBlog")}
      >
        <Text style={styles.buttonText}>Read All Blogs</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NoBlogHistory;

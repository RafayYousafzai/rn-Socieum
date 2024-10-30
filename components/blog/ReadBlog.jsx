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

const ReadBlog = ({ setPage }) => {
  const { width } = Dimensions.get("window");

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
            <Text style={styles.avatarText}>MW</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Michelle Williamson - Regional</Text>
            <Text style={styles.title}>Charity Manager</Text>
          </View>
        </View>

        {/* Large Image */}
        <Image
          source={{
            uri: "https://skydivenorthwest.co.uk/wp-content/uploads/2014/02/Cash-for-kids-logo.png",
          }}
          style={[styles.largeImage, { width }]}
          resizeMode="contain"
        />

        {/* Message Content */}
        <View style={styles.messageContainer}>
          <Text style={styles.paragraph}>
            On behalf of Hits Radio Cash for Kids, I would like to offer you a
            sincere thank you for your incredible donation of £500 to our
            charity. Here at Hits Radio Cash for Kids, our mission is to improve
            the lives of disadvantaged children and young people living in
            Greater Manchester who are affected by poverty, illness, neglect or
            have additional needs. We believe that all children should be able
            to express their individuality, achieve their potential and live
            life to the max. We help local grassroots organisations that aim to
            make a difference to young lives, directly supporting families who
            often have nowhere else to go. It breaks our hearts that 1 in 3
            children in the UK are living in poverty and an ever-growing
            hardship more than ever before. Covid-19 is directly affecting the
            unemployment levels and heightened incomes and having devastating
            effects on families. As a small team, we rely on the incredible help
            of wonderful supporters like you so we can give a helping hand to as
            many local disadvantaged children as we can during these
            unprecedented times. On behalf of these kids at Hits Radio Cash for
            Kids, thank you so much from the bottom of our hearts.
          </Text>
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

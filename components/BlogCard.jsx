import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Card, Avatar } from "react-native-paper";

export default function BlogCard({
  title = "Cash For Kids",
  description = "Helping families and children hit hardest by the pandemic",
  contribution = "500 YNT",
  date = "28-10-2021",
  location = "Manchester",
  image = "https://via.placeholder.com/300x150.png?text=Cash+For+Kids",
}) {
  return (
    <View>
      <Card style={styles.card}>
        {/* Image Background */}
        <ImageBackground
          source={{ uri: image }}
          style={styles.imageBackground}
          imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        >
          <Text style={styles.titleOverlay}>{title}</Text>
          <View style={styles.infoRow}>
            {/* Contribution Section */}
            <View style={styles.infoItem}>
              <Avatar.Icon
                color="#3B82F6"
                size={40}
                icon="account-circle"
                style={{ backgroundColor: "#fff" }} // Blue
              />
              <Text style={styles.infoText}>Contribution</Text>
              <Text style={styles.infoValue}>{contribution}</Text>
            </View>

            {/* Contribution Date Section */}
            <View style={styles.infoItem}>
              <Avatar.Icon
                color="#10B981"
                size={40}
                icon="calendar-today"
                style={{ backgroundColor: "#fff" }} // Green
              />
              <Text style={styles.infoText}>Contribution Date</Text>
              <Text style={styles.infoValue}>{date}</Text>
            </View>

            {/* Location Section */}
            <View style={styles.infoItem}>
              <Avatar.Icon
                color="#EF4444"
                size={40}
                // icon="location-pin"
                style={{ backgroundColor: "#fff" }} // Red
              />
              <Text style={styles.infoText}>Location</Text>
              <Text style={styles.infoValue}>{location}</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Title and Description Section */}
        <Card.Content style={styles.content}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: "#fff",
  },
  imageBackground: {
    padding: 16,
    height: 200, // Adjust height based on design
    justifyContent: "center",
    borderRadius: 12,
  },
  titleOverlay: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    color: "#D1D5DB",
    fontSize: 10,
    marginTop: -10,
  },
  infoValue: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  content: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    color: "#1F2937",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
});

// BlogCard.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Card, Avatar } from "react-native-paper";
import { limitString } from "../../common/limitString";
import { useBlogContext } from "@/context/BlogContext";

export default function BlogCard({
  title,
  description,
  donorDescription,
  imagePath,
  updatedAt,
  donorName,
  _id,
  onPress,
}) {
  const placeholderImg =
    "https://via.placeholder.com/300x150.png?text=Blog+Image";

  // Creating a dynamic image URL
  const imageUrl = imagePath
    ? `https://yourserver.com${imagePath}`
    : placeholderImg;

  // Formatting the contribution and date
  const contribution = donorDescription || "N/A";
  const date = updatedAt ? new Date(updatedAt).toLocaleDateString() : "Unknown";
  const location = donorName || "Unknown";

  return (
    <TouchableOpacity onPress={() => onPress(_id)} activeOpacity={0.9}>
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageBackground}
          imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        >
          <Text style={styles.titleOverlay}>{limitString(title, 25)}</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Avatar.Icon
                color="#3B82F6"
                size={40}
                icon="account-circle"
                style={{ backgroundColor: "#fff" }}
              />
              <Text style={styles.infoText}>Contribution</Text>
              <Text style={styles.infoValue}>
                {limitString(contribution, 10)}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Avatar.Icon
                color="#10B981"
                size={40}
                icon="calendar-today"
                style={{ backgroundColor: "#fff" }}
              />
              <Text style={styles.infoText}>Contribution Date</Text>
              <Text style={styles.infoValue}>{limitString(date, 10)}</Text>
            </View>

            <View style={styles.infoItem}>
              <Avatar.Icon
                color="#EF4444"
                size={40}
                icon="map-marker"
                style={{ backgroundColor: "#fff" }}
              />
              <Text style={styles.infoText}>Location</Text>
              <Text style={styles.infoValue}>{limitString(location, 10)}</Text>
            </View>
          </View>
        </ImageBackground>

        <Card.Content style={styles.content}>
          <Text style={styles.cardTitle}>{limitString(title, 30)}</Text>
          <Text style={styles.description}>
            {limitString(description, 100)}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    backgroundColor: "#fff",
  },
  imageBackground: {
    padding: 16,
    height: 200,
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

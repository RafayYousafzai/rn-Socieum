import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Avatar } from "react-native-paper";

export default function BlogCard({
  contributor,
  title,
  description,
  donorDescription,
  imagePath,
  updatedAt,
  updatedAtStr,
  donorName,
  _id,
  onPress,
  children,
  hideLabel,
  charityName,
}) {
  const { width } = useWindowDimensions();
  const placeholderImg =
    "https://via.placeholder.com/300x150.png?text=Blog+Image";

  const imageUrl = imagePath
    ? `https://younite.uk/images/${imagePath}`
    : placeholderImg;

  const contribution = donorDescription || "N/A";
  const date = updatedAt
    ? new Date(updatedAt).toLocaleDateString()
    : updatedAtStr;

  const location = donorName || "Unknown";

  const iconHeight = contribution.length > 20 ? { height: 80 } : { height: 55 };
  const isLargeScreen = width > 800;

  return (
    <TouchableOpacity
      style={styles.parentContainer}
      onPress={() => onPress(_id)}
      activeOpacity={0.9}
    >
      <Card
        style={[
          styles.card,
          isLargeScreen && { maxWidth: 350 },
          Platform.OS === "web" && { height: 280 },
        ]}
      >
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: imageUrl }}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
            resizeMode={isLargeScreen ? "cover" : "contain"}
          >
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.0)", "rgba(0, 0, 0, 0.8)"]}
              style={styles.gradientOverlay}
            />
            <Text
              style={[
                styles.titleOverlay,
                !charityName && {
                  backgroundColor: "transparent",
                  color: "transparent",
                },
              ]}
            >
              {charityName && charityName}
            </Text>
            <View style={[styles.infoRow, iconHeight]}>
              <View style={styles.infoItem}>
                {contributor ? (
                  <Text style={styles.infoText}>
                    {!hideLabel && "Contributor"}
                  </Text>
                ) : (
                  <Text style={styles.infoText}>
                    {!hideLabel && "Contribution"}{" "}
                    {updatedAt === undefined ? "" : "Name"}
                  </Text>
                )}
                <Avatar.Icon
                  color="#000"
                  size={36}
                  icon="account-circle"
                  style={styles.avatarIcon}
                />
                <Text
                  style={[styles.infoValue, { fontWeight: 700, color: "#fff" }]}
                >
                  {contribution}
                </Text>
              </View>

              {date && (
                <View style={styles.infoItem}>
                  <Text style={styles.infoText}>
                    {!hideLabel && (
                      <Text>
                        {updatedAt === undefined
                          ? "Contribution Date"
                          : "6 digit code"}
                      </Text>
                    )}
                  </Text>
                  <Avatar.Icon
                    color="#000"
                    size={36}
                    icon={
                      updatedAt === undefined
                        ? "calendar-today"
                        : "ticket-confirmation"
                    }
                    style={styles.avatarIcon}
                  />

                  <Text style={styles.infoValue}>{date}</Text>
                </View>
              )}

              <View style={styles.infoItem}>
                <Text style={styles.infoText}>{!hideLabel && "Location"}</Text>
                <Avatar.Icon
                  color="#000"
                  size={36}
                  icon="map-marker"
                  style={styles.avatarIcon}
                />
                <Text style={styles.infoValue}>{location}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <Card.Content style={styles.content}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {children}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    maxWidth: 600,
  },
  titleOverlay: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
    alignSelf: "flex-start",
    marginBottom: 12,
    position: "absolute",
    top: 6,
    left: 6,
  },
  card: {
    marginVertical: 8,
    borderRadius: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    backgroundColor: "#fff",

    width: "96%",
    marginLeft: "2%",
    overflow: "hidden",
  },
  imageContainer: {
    overflow: "hidden",
  },
  imageBackground: {
    padding: 16,
    aspectRatio: 2,
    justifyContent: "center",
  },
  imageStyle: {
    // borderTopLeftRadius: 12,
    // borderTopRightRadius: 12,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
    height: 100,
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  avatarIcon: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    padding: 4,
    height: 35,
    marginBottom: 2,
  },
  infoText: {
    color: "#fff",
    fontSize: 10,
    marginTop: -6,
    height: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  infoValue: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 10,
    fontWeight: "500",
    textAlign: "center",
    width: 110,
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

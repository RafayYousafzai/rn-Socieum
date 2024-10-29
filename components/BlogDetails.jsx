import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Card, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function BlogDetails({ isVisible, onClose, blogData }) {
  if (!blogData) return null;

  const { title, description, contribution, date, location, image } = blogData;

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#1F2937" />
          </Pressable>
        </View>

        <ScrollView style={styles.scrollView}>
          <Card style={styles.card}>
            <ImageBackground
              source={{ uri: image }}
              style={styles.imageBackground}
              imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            >
              <Text style={styles.titleOverlay}>{title}</Text>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Avatar.Icon
                    color="#3B82F6"
                    size={40}
                    icon="account-circle"
                    style={{ backgroundColor: "#fff" }}
                  />
                  <Text style={styles.infoText}>Contribution</Text>
                  <Text style={styles.infoValue}>{contribution}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Avatar.Icon
                    color="#10B981"
                    size={40}
                    icon="calendar-today"
                    style={{ backgroundColor: "#fff" }}
                  />
                  <Text style={styles.infoText}>Contribution Date</Text>
                  <Text style={styles.infoValue}>{date}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Avatar.Icon
                    color="#EF4444"
                    size={40}
                    icon="map-marker"
                    style={{ backgroundColor: "#fff" }}
                  />
                  <Text style={styles.infoText}>Location</Text>
                  <Text style={styles.infoValue}>{location}</Text>
                </View>
              </View>
            </ImageBackground>

            <Card.Content style={styles.content}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Blockchain</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.buttonContainer, styles.lastButton]}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Blog Overview</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    backgroundColor: "#fff",
  },
  imageBackground: {
    padding: 16,
    height: 200,
    justifyContent: "center",
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
    marginTop: 4,
  },
  infoValue: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    color: "#1F2937",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  lastButton: {
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
});

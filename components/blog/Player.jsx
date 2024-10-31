import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import { END_POINTS, showToast } from "@/helper/endpoints";
import { IMAGES, SERVER_URL } from "../../helper/endpoints";
import { Ionicons } from "@expo/vector-icons";

export default function Player({ url }) {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(0);

  async function loadAndPlaySound() {
    try {
      if (!url) {
        showToast("Audio URL is not provided.");
        return;
      }

      const api = `${SERVER_URL}/${IMAGES}${url}`;
      const response = await fetch(api);

      if (!response.ok) {
        throw new Error("Failed to fetch audio URL");
      }

      const audioUri = response.url;
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );

      newSound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
      setSound(newSound);
      setIsPlaying(true);
      console.log("Playing Sound");
    } catch (error) {
      console.error("Error playing sound:", error);
      showToast("Error playing sound.");
    }
  }

  function updatePlaybackStatus(status) {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        resetPlayer();
      }
    }
  }

  async function togglePlayback() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } else {
      await loadAndPlaySound();
    }
  }

  async function resetPlayer() {
    setIsPlaying(false);
    setPosition(0);
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  if (!url) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.text}>Listen To Voice Message</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  playButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    padding: 10,
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});

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

  const renderTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!url) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
        <Ionicons name={isPlaying ? "pause" : "play"} size={32} color="#fff" />
      </TouchableOpacity>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${(position / duration) * 100}%` },
          ]}
        />
      </View>
      <Text style={styles.timer}>
        {renderTime(position)} / {renderTime(duration || 0)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
  },
  playButton: {
    backgroundColor: "#25D366",
    borderRadius: 30,
    padding: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginHorizontal: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#25D366",
    borderRadius: 2,
  },
  timer: {
    fontSize: 12,
    color: "#555",
  },
});

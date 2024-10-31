import { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { END_POINTS, showToast } from "@/helper/endpoints";
import { IMAGES, SERVER_URL } from "../../helper/endpoints";

export default function Player({ url }) {
  const [sound, setSound] = useState(null);

  async function playSound() {
    try {
      if (!url) {
        showToast("Audio URL is not provided.");
        return;
      }

      // Construct the full audio URL
      const api = `${SERVER_URL}/${IMAGES}${url}`;
      const response = await fetch(api);

      if (!response.ok) {
        throw new Error("Failed to fetch audio URL");
      }

      const audioUri = response.url;

      // Load and play sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      setSound(newSound);

      console.log("Playing Sound");
    } catch (error) {
      console.error("Error playing sound:", error);
      showToast("Error playing sound.");
    }
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      console.log("Sound stopped");
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
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Stop Sound" onPress={stopSound} disabled={!sound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});

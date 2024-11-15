import * as SecureStore from "expo-secure-store";

async function save(key, value, options = {}) {
  try {
    await SecureStore.setItemAsync(key, value, options);
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
}

async function getValueFor(key, options = {}) {
  try {
    const result = await SecureStore.getItemAsync(key, options);
    return result ? result : null;
  } catch (error) {
    console.error("Error retrieving data:", error);

    // Specific handling for decryption errors
    if (error.message.includes("Could not decrypt the value")) {
      console.warn(`Resetting key '${key}' due to decryption error.`);
      await SecureStore.deleteItemAsync(key, options); // Reset the corrupted key
    }

    return null;
  }
}

async function remove(key, options = {}) {
  try {
    await SecureStore.deleteItemAsync(key, options);
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}

export { save, remove, getValueFor };

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const OverView = ({ setPage, blog }) => {
  return (
    <View>
      <Text>OverView</Text>
      <TouchableOpacity onPress={() => setPage("Details")}>
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPage("Read")}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OverView;

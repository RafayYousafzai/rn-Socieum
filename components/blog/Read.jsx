import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Read = ({ setPage, blog }) => {
  return (
    <View>
      <Text>Read</Text>
      <TouchableOpacity onPress={() => setPage("OverView")}>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Read;

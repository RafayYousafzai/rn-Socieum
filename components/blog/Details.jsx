import { View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const Details = ({ setPage, blog }) => {
  return (
    <View>
      <Text>Details</Text>
      <TouchableOpacity onPress={() => setPage("AllBlogs")}>
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPage("OverView")}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;

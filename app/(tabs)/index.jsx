import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Header from "../../components/Header";

const InfoCard = ({ icon, title, description }) => (
  <View className="bg-white rounded-xl p-6 mb-6 border border-gray-100 shadow-md elevation-5  ">
    <View className="flex-row items-center mb-4">
      <Text className="text-xl font-black text-gray-800 flex-1">{title}</Text>
    </View>
    <Text className="text-base leading-6 text-gray-600">{description}</Text>
  </View>
);

const Home = () => {
  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      <Header
        text={"Welcome to Wearey"}
        desc={"Your gateway to meaningful fashion"}
      />
      <ScrollView>
        <View className="px-5 pb-12 mt-10">
          <InfoCard
            icon="info"
            title="About Wearey"
            description="By combining fashion with blockchain technology, Wearey provides consumers with the ultimate retail therapy experience. By purchasing Wearey products, you support organizations tackling social issues you care about. The Wearey philosophy is to invest in the people and communities that form our customer base, with a percentage of revenue generated given back."
          />

          <InfoCard
            icon="security"
            title="Blockchain Technology"
            description="Blockchain technology is an online record book maintained by a network of computers that securely stores and shares information for public view. The Wearey blockchain platform allows you to follow your contributions and see how they have been utilized by recipient organizations."
          />

          <InfoCard
            icon="article"
            title="Blog Wearey"
            description="Blog Wearey links you to the individuals benefiting from your contribution, giving you a personal insight into the lives you are helping to change. Wearey aims to connect people from all walks of life and build a community of social media inspirers, showing what we can achieve when we come together."
          />

          <InfoCard
            icon="group"
            title="We Are Wearey"
            description="Use your Wearey garment to make a statement and inspire others to do the same."
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

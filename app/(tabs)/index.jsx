import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";

const InfoCard = ({ title, description }) => (
  <View className="bg-white rounded-none p-6 my-6 border border-gray-100 shadow-md elevation-5">
    <Text className="text-xl font-black text-gray-800 mb-2">{title}</Text>
    <Text className="text-base leading-6 text-gray-600">{description}</Text>
  </View>
);

const Home = () => {
  const [infoData] = useState([
    {
      id: "1",
      title: "About Y",
      description:
        "By combining blockchain technology with premium, handcrafted, ethically sourced organic fashion, we offer a truly unique retail experience. A portion of revenue from each collection supports various social causes through our transparent blockchain platform. Our philosophy is to reinvest in initiatives that matter to the Y community and empower positive social change together.",
    },
    {
      id: "2",
      title: "Blockchain Technology",
      description:
        "Blockchain technology is a secure, decentralised digital ledger maintained by a network of computers designed to store and share information transparently for public access. Through the Y blockchain platform, you can track your contribution and see exactly how these funds are utilised by the organisations we support.",
    },
    {
      id: "3",
      title: "Blog Y",
      description:
        "Blog Y links you to the individuals benefitting from your contribution and gives you an insight in to the lives you are helping to change. The blog aims to connect people from all walks of life and build a community of social media inspirers to showcase what can be achieved when we all come together.",
    },
    {
      id: "4",
      title: "We Are Y",
      description: "Individually We Are One Drop Together We Are An Ocean",
    },
  ]);

  const renderInfoCard = ({ item }) => (
    <InfoCard title={item.title} description={item.description} />
  );

  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      <Header
        text={"Welcome To Y"}
        desc={"Individually We Are One Drop"}
        desc2={"Together We Are An Ocean"}
      />
      <FlatList
        data={infoData}
        renderItem={renderInfoCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default Home;

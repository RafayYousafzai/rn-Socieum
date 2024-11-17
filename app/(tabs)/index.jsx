import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Platform,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import Header from "@/components/Header";
import { Link } from "expo-router";

const InfoCard = ({ title, description, linkName, link }) => (
  <View className="mx-auto max-w-6xl w-full bg-white rounded-none p-6 my-6 border border-gray-100 shadow-md elevation-5">
    <Text className="text-xl font-black text-gray-800 mb-2">{title}</Text>
    <Text className="text-base leading-6 text-gray-600">{description}</Text>
    {linkName && link && (
      <View className="flex ">
        <Text className=" text-md text-gray-600 mb-2 font-semibold">
          {linkName}:{" "}
          <Link
            className=" font-normal text-blue-500 mb-2 00"
            target="_self"
            href={link}
          >
            {" "}
            {link}
          </Link>
        </Text>
      </View>
    )}
  </View>
);

const Home = () => {
  const [infoData] = useState([
    {
      id: "1",
      title: "About Y",
      description:
        "By combining blockchain technology with premium, handcrafted, ethically manufactured fashion, we offer a truly unique retail experience. A portion of revenue from each collection supports various social causes through our transparent blockchain platform. Our philosophy is to reinvest in initiatives that matter to the Y community and empower positive social change together.",
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
      title: "Shop Y",
      description:
        "Use your garment to make a statement and inspire others to do the same.",
      linkName: "Visit Shop Y",
      link: "https://www.wearey.co.uk",
    },
  ]);
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 800;

  const renderInfoCard = ({ item }) => (
    <InfoCard
      title={item.title}
      description={item.description}
      linkName={item.linkName}
      link={item.link}
    />
  );

  return (
    <SafeAreaView className="bg-gray-100 flex-1">
      {isLargeScreen ? (
        <Header
          text="Welcome To Y"
          desc="Individually We Are One Drop, Together We Are An Ocean"
        />
      ) : (
        <Header
          text="Welcome To Y"
          desc="Individually We Are One Drop"
          desc2="Together We Are An Ocean"
        />
      )}
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

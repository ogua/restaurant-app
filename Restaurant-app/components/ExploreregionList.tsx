import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Text, Card, Avatar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

function ExploreregionList({ item }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <TouchableOpacity
      style={{ backgroundColor: "#fff", padding: 10 }}
      onPress={() => router.push(`/restaurant-region?region=${item.region}`)}
    >
      <Card>
        <Card.Content>
          <Text variant="titleLarge">{item.region}</Text>
          <Text variant="bodyMedium">{item.total_restaurants} Restaurants</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default ExploreregionList;

const styles = StyleSheet.create({
  ribbon: {
    position: "absolute",
    bottom: -15,
    right: -70,
    zIndex: 1,
    paddingTop: 10,
    overflow: "hidden",
    width: 120,
    height: 80,
    textAlign: "right",
  },
  ribbontext: {
    transform: [{ rotate: "295deg" }],
    color: "#9BC90D",
    fontSize: 20,
  },
});

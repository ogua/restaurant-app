import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Text, Card, Avatar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

function AvailablecuisineList({ item }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <TouchableOpacity
      style={{ backgroundColor: "#fff", padding: 10 }}
      onPress={() => router.push(`/restaurant-info?id=${item.id}`)}
    >
      <Card>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Avatar.Image size={100} source={{ uri: `${item.photo}` }} />
          <Text variant="titleLarge">
            {item.name}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default AvailablecuisineList;

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

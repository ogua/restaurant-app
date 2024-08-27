import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Text, Card, Avatar, List } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

function ReviewList({ item }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  //console.log("data", item);

  return (
    <TouchableOpacity
      style={{ backgroundColor: "#fff", padding: 10 }}
      onPress={() => {}}
    >
      <Card>
        <List.Item
          title={item.title}
          description={item.body}
          descriptionNumberOfLines={30}
          left={(props) => <List.Icon {...props} icon="message" />}
        />
      </Card>
    </TouchableOpacity>
  );
}

export default ReviewList;

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

import { useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Text, Card, Avatar } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

function MenuList({ item }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  console.log("data", item);

  return (
    <TouchableOpacity
      style={{ backgroundColor: "#fff", padding: 10 }}
      onPress={() => {}}
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
          <Text variant="titleLarge">{item.name}</Text>
          <Text
            variant="titleSmall"
            style={{ marginTop: 5, color: "#abc", fontWeight: "500" }}
          >
            Price: GHC {item.price}
          </Text>
          {/* <Text
            variant="titleSmall"
            style={{ marginTop: 10, color: "#abc", fontWeight: "500" }}
          >
            Restaurant
          </Text>
          <Text variant="titleMedium">{item.restaurant}</Text> */}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default MenuList;

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

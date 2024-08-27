import { useEffect, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import { Button, Text, Card, Avatar, ActivityIndicator } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import axios from "axios";
import { base_url } from "@/constants/Baseurl";
import * as SQLite from "expo-sqlite";

function AvailableLunchList({ item, fvrts }) {
  const [visible, setVisible] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isfvrt, setIsfvrt] = useState([]);
  const router = useRouter();
  const [user, setuser] = useState({});

  //database
  const db = SQLite.useSQLiteContext();

  useEffect(() => {
    getuser();
  }, []);

  async function getuser() {
    try {
      // await db.runAsync("DELETE FROM users");
      // Binding named parameters from object

      const allRows = await db.getFirstAsync("SELECT * FROM users");

      console.log("availablelist", allRows);

      if (allRows != null) {
        console.log(
          allRows?.photo,
          allRows?.name,
          allRows?.email,
          allRows?.phone,
          allRows?.pid
        );

        setuser({
          photo: allRows.photo,
          name: allRows.name,
          email: allRows.email,
          phone: allRows.phone,
          id: allRows.pid,
        });

        console.log("user data", user);
      }

      setIsfvrt(fvrts);

    } catch (error) {
      console.log("Error while loading students : ", error);
    }
  }

  const addtofvrt = () => {
    setIsloading(true);

    console.log("user", user);

    //check if user exist
    if (user && user?.id) {
      console.log("user", user);
    } else {
      setIsloading(false);
      router.push("/(tabs)/user");
      return;
    }

    const formdata = {
      userid: user && user?.id ? user?.id : 0,
      restaurantid: item.id,
    };

    axios
      .post(base_url + "/add-to-fvrts", formdata, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        setIsloading(false);
      })
      .catch(function (error) {
        setIsloading(false);
        console.log(error);
      });
  };

  return (
    <TouchableOpacity
      style={{ backgroundColor: "#fff", padding: 10 }}
      onPress={() => router.push(`/restaurant-info?id=${item.id}`)}
    >
      <Card>
        <View style={{ position: "relative" }}>
          <Card.Cover source={{ uri: `${item.logo}` }} />
          <TouchableOpacity onPress={addtofvrt}>
            {isloading ? (
              <ActivityIndicator
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                }}
              />
            ) : (
              <>
                <Avatar.Icon
                  size={30}
                  icon="content-save"
                  style={{
                    position: "absolute",
                    right: 10,
                    bottom: 10,
                    backgroundColor: isfvrt.includes(item.id) ? "red" : "white",
                  }}
                  color={isfvrt.includes(item.id) ? "white" : "red"}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
        <Card.Content>
          <Text variant="bodyLarge">{item.name}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StarRatingDisplay rating={item.rating} starSize={20} color="red" />
            <Button icon="chat-outline">{item.totalrating}</Button>
          </View>
          <Button icon="map-marker-star" style={{ alignSelf: "flex-start" }}>
            {item.address}
          </Button>
          <Button icon="cash" style={{ alignSelf: "flex-start" }}>
            {item.lowest_price} above
          </Button>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

export default AvailableLunchList;

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

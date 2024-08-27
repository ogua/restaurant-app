import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  RefreshControl,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator, Card, Searchbar, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import AvailableLunchList from "@/components/AvailableLunchList";
import axios from "axios";
import { base_url } from "@/constants/Baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

export default function HistoryScreen() {
  const [filterdata, setFilterdata] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [user, setuser] = useState({});

  //database
  const db = SQLite.useSQLiteContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData();
        setuser(userData);
        loaddata();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    //fetchData();
    getuser();
  }, []);

  async function getuser() {
    try {
      const allRows = await db.getFirstAsync("SELECT * FROM users");
      console.log("history data", allRows);

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
      }

      loaddata();
    } catch (error) {
      console.log("Error while loading students : ", error);
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      console.log("async", jsonValue != null ? JSON.parse(jsonValue) : null);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("error", "error reading value");
    }
  };

  const loaddata = () => {
    setLoading(true);

    console.log("history user",user);

    axios
      .get(base_url + "/my-history/" + user?.id ?? 0, {
        headers: { Accept: "application/json" },
      })
      .then(function (results) {
        console.log("my history", results.data.data);
        setRestaurants(results.data.data);
        setFilterdata(results.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = restaurants.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterdata(newData);
      setSearch(text);
    } else {
      setFilterdata(restaurants);
      setSearch(text);
    }
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Searchbar
        mode="bar"
        value={search}
        placeholder="Search..."
        onChangeText={(text) => searchFilterFunction(text)}
        style={{
          backgroundColor: "#fff",
          position: "static",
          marginTop: 25,
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={loaddata} />
        }
        style={{ marginBottom: 50 }}
      >
        <Card>
          <Card.Content>
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <FlatList
                  data={filterdata}
                  renderItem={({ item }) => (
                    <AvailableLunchList item={item} fvrts={[]} user={{}} />
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  contentContainerStyle={{
                    marginBottom: 20,
                  }}
                  keyExtractor={(item) => item?.id}
                  // numColumns={2}
                />
              </>
            )}
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
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
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import AvailableLunchList from "@/components/AvailableLunchList";
import axios from "axios";
import { base_url } from "@/constants/Baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RestaurantRegionScreen() {

  const [filterdata, setFilterdata] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [user, setuser] = useState({});
  const [regionname, setRegionname] = useState("");
  const { region } = useLocalSearchParams();

  useEffect(() => {
    setRegionname(region);
    const fetchData = async () => {
      try {
        const userData = await getData();
        setuser(userData);
        loaddata();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

    axios
      .get(base_url + "/restaurant-by-region/" + region, {
        headers: { Accept: "application/json" },
      })
      .then(function (results) {
        //console.log(results.data.data);
        setRestaurants(results.data);
        setFilterdata(results.data);

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
          title: regionname ?? "Restaurant Region",
          headerShown: true,
        }}
      />
      <Searchbar
        mode="view"
        value={search}
        placeholder="Search..."
        onChangeText={(text) => searchFilterFunction(text)}
        style={{
          backgroundColor: "#fff",
          position: "static",
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
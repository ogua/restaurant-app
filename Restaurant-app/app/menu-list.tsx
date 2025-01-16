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
import { ActivityIndicator, Button, Card, Searchbar, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import AvailableLunchList from "@/components/AvailableLunchList";
import axios from "axios";
import { base_url } from "@/constants/Baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuSubList from "@/components/MenuSubList";

export default function MenuslistScreen() {
  const [filterdata, setFilterdata] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [menu, setuser] = useState("");
  const [regionname, setRegionname] = useState("");
  const { id, name, cat } = useLocalSearchParams();

  useEffect(() => {
    setuser(name);
    loaddata();
    console.log("id: ",id);
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
      .get(base_url + "/menuitems-sub/" + id + "/" + cat, {
        headers: { Accept: "application/json" },
      })
      .then(function (results) {
        //console.log(results.data.data);
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
          title: `${menu} Menu List`,
          headerShown: true,
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
          marginBottom: 30,
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
                {filterdata.length > 0 ? (
                  <>
                    <FlatList
                      data={filterdata}
                      renderItem={({ item }) => <MenuSubList item={item} />}
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
                ) : (
                  <>
                    <Button style={{ marginVertical: 200 }}>
                      NO RECORDS FOUND
                    </Button>
                  </>
                )}
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

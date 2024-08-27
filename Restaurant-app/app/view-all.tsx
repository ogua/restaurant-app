import AvailablecuisineList from "@/components/AvailablecuisineList";
import AvailableLunchList from "@/components/AvailableLunchList";
import ExploreregionList from "@/components/ExploreregionList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { SetStateAction, useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  Card,
  Dialog,
  List,
  Menu,
  Portal,
  Button,
  Provider,
  Searchbar,
  Text,
  Chip,
  Avatar,
  ActivityIndicator,
} from "react-native-paper";
import axios from "axios";
import { base_url } from "@/constants/Baseurl";
//import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Viewall() {

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [availablecusine, setAvailablecusine] = useState([]);
  const [region, setRegion] = useState([]);
  const [fvrt, setFvrt] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibiliy, setVisibiliy] = useState(true);
  const router = useRouter();
  const searchref = useRef();

  const [availableforlunch, setAvailableforlunch] = useState([]);
  const [explorebyregion, setExplorebyregion] = useState([
    { id: 1, name: "Greater Accra", totalDistricts: 29 },
    { id: 2, name: "Ashanti", totalDistricts: 43 },
    { id: 3, name: "Western", totalDistricts: 23 },
    { id: 4, name: "Eastern", totalDistricts: 33 },
    { id: 5, name: "Central", totalDistricts: 22 },
    { id: 6, name: "Northern", totalDistricts: 16 },
    { id: 7, name: "Volta", totalDistricts: 18 },
    { id: 8, name: "Upper East", totalDistricts: 15 },
    { id: 9, name: "Upper West", totalDistricts: 11 },
    { id: 10, name: "Brong Ahafo", totalDistricts: 29 },
    { id: 11, name: "Western North", totalDistricts: 9 },
    { id: 12, name: "Oti", totalDistricts: 9 },
    { id: 13, name: "Bono", totalDistricts: 12 },
    { id: 14, name: "Bono East", totalDistricts: 11 },
    { id: 15, name: "Ahafo", totalDistricts: 6 },
    { id: 16, name: "Savannah", totalDistricts: 7 },
    { id: 17, name: "North East", totalDistricts: 6 },
  ]);

  const [user, setuser] = useState({});

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
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      //
      console.log("error", "error reading value");
    }
  };

  function getrestaurants() {
    return axios.get(base_url + "/all-restaurants", {
      headers: { Accept: "application/json" },
    });
  }

  function getcuisines() {
    return axios.get(base_url + "/menuitems", {
      headers: { Accept: "application/json" },
    });
  }

  function getregions() {
    return axios.get(base_url + "/regions", {
      headers: { Accept: "application/json" },
    });
  }

  function myfvrts() {
    return axios.get(
      base_url + "/my-fvrts/" + (user && user?.id ? user.id : 0),
      {
        headers: { Accept: "application/json" },
      }
    );
  }

  const loaddata = () => {
    setLoading(true);

    Promise.all([getrestaurants(), getcuisines(), getregions(), myfvrts()])
      .then(function (results) {
        const restaurant = results[0];
        const cuisine = results[1];
        const region = results[2];
        const fvrts = results[3];
        //console.log(results.data.data);
        setRestaurants(restaurant.data.data);
        setFilterdata(restaurant.data.data);

        setAvailablecusine(cuisine.data.data);
        setRegion(region.data);
        setFvrt(fvrts.data);

        console.log("fvrt", fvrts.data);

        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const togglevisibility = () => {
    setVisibiliy(!visibiliy);
    if (!visibiliy) {
      searchref.current.focus();
    }
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
    <Provider>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerShown: visibiliy,
            headerTitle: "All Restaurants",
            headerRight: () => (
                <TouchableOpacity onPress={togglevisibility}>
                  <Avatar.Icon size={30} icon="card-search" style={{}} />
                </TouchableOpacity>
            ),
          }}
        />

        {visibiliy ? (
          <></>
        ) : (
          <>
            <Searchbar
              mode="bar"
              value={search}
              icon="keyboard-backspace"
              onIconPress={togglevisibility}
              placeholder="Search..."
              onChangeText={(text) => searchFilterFunction(text)}
              style={{
                backgroundColor: "#fff",
                position: "static",
                marginTop: 25,
              }}
            />
          </>
        )}

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={loaddata} />
          }
          style={{ marginBottom: 50 }}
        >
          <Card>
            <Card.Content>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                />
              ) : (
                <>
                    <Chip icon="information" style={{ marginVertical: 5 }}>
                      Available For Lunch
                    </Chip>

                  <FlatList
                    data={filterdata}
                    renderItem={({ item }) => (
                      <AvailableLunchList
                        item={item}
                        fvrts={fvrt}
                        user={user}
                      />
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                    contentContainerStyle={{
                      marginBottom: 20,
                    }}
                    keyExtractor={(item) => item.id}
                    // numColumns={2}
                  />

                </>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </Provider>
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
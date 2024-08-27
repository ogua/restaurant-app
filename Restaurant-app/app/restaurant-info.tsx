import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Linking,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ActivityIndicator, Button, Card, Chip, FAB, Modal, PaperProvider, Portal, Searchbar, Text, TextInput } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import AvailableLunchList from "@/components/AvailableLunchList";
import MenuList from "@/components/MenuList";
import MapView, { AnimatedRegion, Marker } from "react-native-maps";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import ReviewList from "@/components/ReviewList";
import axios from "axios";
import { base_url } from "@/constants/Baseurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";

export default function RestaurantinfoScreen() {
  const [restaurant, setRestaurants] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const mapref = useRef(null);
  const markerRef = useRef();
  const { id } = useLocalSearchParams();
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

      console.log("restaurant info user ", allRows);
      
      if (allRows != null) {
        console.log(
          "user data",
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

;

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      //
      console.log("error", "error reading value");
    }
  };


  function inserthistory(userid, restaurantid) {

    const historydata = {
      userid,
      restaurantid,
    };

    console.log("my history data", historydata);

    axios
      .post(base_url + "/add-to-history", historydata, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }

  
  const loaddata = () => {
    setLoading(true);

      axios
        .get(base_url + `/restaurant-info/${id}`, {
          headers: { Accept: "application/json" },
        })
        .then(function (results) {
          
          //console.log(results.data.data);
          setRestaurants(results.data.data);
          setMenuItems(results.data.data.menu);
          setReviews(results.data.data.reviews);

          inserthistory(user?.id ?? 0, results.data.data.id);

         // setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
  };
  
  const getAllMenuItems = () => {
    return menuItems.reduce((acc, category) => {
      return acc.concat(category.items);
    }, []);
  };
  
  const [visible, setVisible] = useState(false);
  
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const [customerservice, setcustomerservice] = useState(0);
  const [quality, setquality] = useState(0);
  const [friendly, setfriendly] = useState(0);
  const [pricing, setpricing] = useState(0);
  const [overall, setoverall] = useState(0);
  const [review, setreview] = useState("");

  const [sendingreview, setsendingreview] = useState(false);



  const addreview = () => {

    if(review == ""){
      return;
    }

    const formdata = {
      id: restaurant?.id,
      customerservice, quality, friendly, pricing, review, overall,
      userid: (user && user?.id) ? user?.id : 0
    };

    setsendingreview(true);

    axios
      .post(base_url + "/add-review", formdata, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        setsendingreview(false);
        alert("Review Saved Successfully!");
        setVisible(false);
        loaddata();
      })
      .catch(function (error) {
        setsendingreview(false);
        console.log(error);
      });
  };

  
  return (
    <PaperProvider>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerTitle: restaurant.name
              ? restaurant.name.toUpperCase()
              : "Restaurant Information",
            presentation: "formSheet",
          }}
        />
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
              >
                <Text style={{ marginTop: 10 }}>Customer service rating</Text>
                <StarRating
                  rating={customerservice}
                  onChange={setcustomerservice}
                />
                <Text style={{ marginTop: 10 }}>Food quality rating</Text>
                <StarRating rating={quality} onChange={setquality} />

                <Text style={{ marginTop: 10 }}>Friendly rating</Text>
                <StarRating rating={friendly} onChange={setfriendly} />

                <Text style={{ marginTop: 10 }}>Price rating</Text>
                <StarRating rating={pricing} onChange={setpricing} />

                <Text style={{ marginTop: 10 }}>Overall rating</Text>
                <StarRating rating={overall} onChange={setoverall} />

                <TextInput
                  mode="outlined"
                  placeholder="Enter Review"
                  multiline={true}
                  numberOfLines={10}
                  value={review}
                  onChangeText={(e) => setreview(e)}
                  style={{ marginTop: 10 }}
                />
                <View style={{ marginTop: 20 }}>
                  {sendingreview ? (
                    <ActivityIndicator size="large" />
                  ) : (
                    <Button mode="outlined" onPress={addreview}>
                      Save Review
                    </Button>
                  )}
                </View>
              </Modal>
            </Portal>

            <ScrollView>
              <Card>
                <Card.Content>
                  <Card.Cover source={{ uri: `${restaurant.logo}` }} />
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    Overview
                  </Text>
                  <Text variant="bodySmall">{restaurant.region}</Text>
                  <Text variant="bodySmall">{restaurant.description}</Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 5,
                      alignItems: "center",
                    }}
                  >
                    <StarRatingDisplay
                      rating={restaurant.rating}
                      starSize={20}
                      color="red"
                    />
                    <Button icon="chat-outline">
                      {restaurant.totalrating}
                    </Button>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Button icon="cart-outline">
                      GHC {restaurant.lowest_price} above
                    </Button>
                    <Button icon="knife">Restaurant</Button>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button icon="map-marker-star">{restaurant.address}</Button>
                    <Button icon="cellphone-basic">{restaurant.phone}</Button>
                  </View>

                  <Chip icon="information" style={{ marginVertical: 15 }}>
                    Working Hours
                  </Chip>
                  <Text variant="bodyLarge"> {restaurant.hours}</Text>

                  <Chip icon="information" style={{ marginVertical: 15 }}>
                    Menu
                  </Chip>

                  <FlatList
                    data={getAllMenuItems()}
                    renderItem={({ item }) => <MenuList item={item} />}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                    contentContainerStyle={{
                      marginBottom: 20,
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <View style={{ height: 300 }}>
                    <MapView
                      style={styles.map}
                      ref={mapref}
                      mapType="mutedStandard"
                      initialRegion={{
                        latitude: parseFloat(
                          restaurant.latitude ?? 7.7749 + 1 * 0.01
                        ),
                        longitude: parseFloat(
                          restaurant.longitude ?? -122.4194 + 1 * 0.01
                        ),
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                      }}
                    >
                      <Marker.Animated
                        coordinate={{
                          latitude: parseFloat(
                            restaurant.latitude ?? 7.7749 + 1 * 0.01
                          ),
                          longitude: parseFloat(
                            restaurant.longitude ?? -122.4194 + 1 * 0.01
                          ),
                        }}
                        title={`Destination`}
                        identifier="destination"
                      />
                    </MapView>
                  </View>
                  <Chip icon="information" style={{ marginVertical: 15 }}>
                    Recommended Reviews
                  </Chip>

                  <FlatList
                    data={reviews}
                    renderItem={({ item }) => <ReviewList item={item} />}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                    contentContainerStyle={{
                      marginBottom: 20,
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  <Button
                    mode="outlined"
                    style={{ marginVertical: 10 }}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`
                      )
                    }
                  >
                    Get Directions
                  </Button>
                </Card.Content>
              </Card>
            </ScrollView>
            <FAB icon="plus" style={styles.fab} onPress={showModal} />
          </>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 100,
  },
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
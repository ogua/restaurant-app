import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Avatar,
  Button,
  Card,
  Searchbar,
  Text,
  TextInput,
} from "react-native-paper";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import AvailableLunchList from "@/components/AvailableLunchList";

export default function UserRegScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    initializeDummyData();
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     fetchNearbyRestaurants(latitude, longitude);
    //   },
    //   (error) => console.log(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  }, []);

  const initializeDummyData = () => {
    const dummyData = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      name: `Restaurant ${index + 1}`,
      description: `Description for Restaurant ${index + 1}`,
      address: `${index + 1} Main St, Cityville`,
      latitude: 37.7749 + index * 0.01,
      longitude: -122.4194 + index * 0.01,
      rating: (Math.random() * 5).toFixed(2),
      menu: [
        {
          category: "Starters",
          items: [
            {
              name: "Garlic Bread",
              price: 5.99,
              description: "Freshly baked garlic bread",
            },
            {
              name: "Bruschetta",
              price: 6.99,
              description: "Tomato and basil on toasted bread",
            },
          ],
        },
        {
          category: "Main Course",
          items: [
            {
              name: "Margherita Pizza",
              price: 12.99,
              description: "Classic cheese and tomato pizza",
            },
            {
              name: "Pepperoni Pizza",
              price: 14.99,
              description: "Spicy pepperoni with cheese",
            },
          ],
        },
        {
          category: "Desserts",
          items: [
            {
              name: "Tiramisu",
              price: 6.99,
              description: "Coffee-flavored Italian dessert",
            },
            { name: "Gelato", price: 5.99, description: "Italian ice cream" },
          ],
        },
      ],
    }));

    setRestaurants(dummyData);
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "User Information",
        }}
      />
      <ScrollView>
        <Card>
          <Card.Content>
            <TouchableOpacity>
              <View style={{ position: "relative", marginTop: 20 }}>
                <Avatar.Image
                  size={200}
                  source={{ uri: "https://picsum.photos/700" }}
                  style={{ alignSelf: "center" }}
                />

                <Avatar.Icon
                  size={50}
                  icon="account"
                  style={{ position: "absolute", bottom: 5, right: 80 }}
                />
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: 20 }}>
              <TextInput placeholder="Enter Fullname" mode="outlined" />
              <TextInput
                placeholder="Enter Email"
                mode="outlined"
                style={{ marginTop: 20 }}
              />
              <TextInput
                placeholder="Enter Phone Number"
                mode="outlined"
                style={{ marginTop: 20 }}
              />

              <Button mode="outlined" style={{ marginTop: 20 }}>
                Save
              </Button>
            </View>
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

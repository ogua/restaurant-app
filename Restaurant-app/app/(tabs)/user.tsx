import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
} from "react-native";

import { ActivityIndicator, Avatar, Button, Card, Searchbar, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { base_url } from "@/constants/Baseurl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as SQLite from "expo-sqlite";

export default function UserScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  const [user, setuser] = useState({});
  const [checkdata, setcheckdata] = useState(false);

  //database
  const db = SQLite.useSQLiteContext();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const userData = await getData();
    //     setuser(userData);
    //     loaddata();
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();

    getuser();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("error", "error reading value");
    }
  };

  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.clear();
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log("Data stored successfully");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  //function to get all the students

  async function getuser() {
    try {
      const allRows = await db.getFirstAsync("SELECT * FROM users");
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

      loaddata();
    } catch (error) {
      console.log("Error while loading students : ", error);
    }
  }

  async function insertdata(photo = "", fullname, email, phone, pid) {
    try {
      const statement = await db.prepareAsync(
        "INSERT INTO users (photo, name, email, phone, pid) VALUES (?, ?, ?, ?, ?)"
      );
      let result = await statement.executeAsync([
        photo,
        fullname,
        email,
        phone,
        pid,
      ]);
      console.log(result?.lastInsertRowId, result?.changes);
      // await getuser();
    } catch (error) {
      console.log("Error while adding student : ", error);
    }
  }

  async function updateuser(photo, name, email, phone, id) {
    try {
      await db.runAsync(
        "UPDATE users SET photo = ?, name = ?, email = ?, phone = ? WHERE id = ?",
        [photo, name, email, phone, 1]
      );
      // await getStudents();
    } catch (error) {
      console.log("Error while updating student");
    }
  }

  const adduser = async () => {
    const data = new FormData();

    if (file != null) {
      data.append("logo", {
        uri: file.assets[0].uri,
        name: file.assets[0].name,
        type: file.assets[0].mimeType,
      });
    }

    // setLoading(true);
    data.append("fullname", fullname);
    data.append("email", email);
    data.append("phone", phone);
    data.append("userid", user && user?.id ? user?.id : 0);

    //check if data exist
    try {
      const checkdata = await db.prepareAsync(
        "SELECT * FROM users WHERE email = $email"
      );
      const checkresult = await checkdata.executeAsync<{
        email: string;
      }>({
        $email: email,
      });
      const firstRow = await checkresult.getFirstAsync();

      if (firstRow != null) {
        setcheckdata(true);
      }
    } catch (error) {
      console.log("Error while selecting user : ", error);
    }

    axios
      .post(base_url + "/add-user", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        //storeUserData(response.data);

        if (checkdata) {

          updateuser(
            response.data.photo,
            response.data.fullname,
            response.data.email,
            response.data.phone,
            response.data.id
          );

        } else {

          insertdata(
            response.data.photo,
            response.data.fullname,
            response.data.email,
            response.data.phone,
            response.data.id
          );
          
        }

        setLoading(false);
        alert("Data Saved Successfully!");
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const loaddata = () => {
    setLoading(true);

    axios
      .get(base_url + "/my-information/" + (user && user?.id ? user.id : 0), {
        headers: { Accept: "application/json" },
      })
      .then(function (results) {
        if (results.data) {
          // storeUserData(results.data);
          setFullname(results.data.name);
          setEmail(results.data.email);
          setPhone(results.data.phone);
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const checkPermissions = async () => {
    try {
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      if (!result) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title:
              "You need to give storage permission to download and save the file",
            message: "App needs access to your camera",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the camera");
          return true;
        } else {
          Alert.alert("Error", "Camera permission denied");
          console.log("Camera permission denied");
          return false;
        }
      } else {
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  async function selectFile() {
    try {
      const result = await checkPermissions();

      if (result) {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: false,
        });

        if (!result.canceled) {
          setFile(result);
          setImg(result.assets[0].uri);
        }
      }
    } catch (err) {
      setFile(null);
      console.warn(err);
      return false;
    }
  }

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "User Information",
          headerShown: true,
        }}
      />

      <ScrollView>
        <Card>
          <Card.Content>
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

            <View style={{ marginTop: 20 }}>
              <TextInput
                placeholder="Enter Fullname"
                mode="outlined"
                value={fullname}
                onChangeText={(e) => setFullname(e)}
              />

              <TextInput
                placeholder="Enter Email"
                mode="outlined"
                value={email}
                onChangeText={(e) => setEmail(e)}
                style={{ marginTop: 20 }}
              />
              <TextInput
                placeholder="Enter Phone Number"
                mode="outlined"
                value={phone}
                onChangeText={(e) => setPhone(e)}
                style={{ marginTop: 20 }}
              />

              {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
              ) : (
                <>
                  <Button
                    mode="outlined"
                    style={{ marginTop: 20 }}
                    onPress={adduser}
                  >
                    Save
                  </Button>
                </>
              )}
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

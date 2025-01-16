import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from "react-native";

import { ActivityIndicator, Avatar, Button, Card, Searchbar, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { admin_url, base_url } from "@/constants/Baseurl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as SQLite from "expo-sqlite";
import { isLoaded } from "expo-font";


export default function UserScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issubmit, setissubmit] = useState(false);
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
    
    loaddata();
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
    
    setissubmit(true);

    data.append("fullname",fullname);
    data.append("email", email);
    data.append("phone", phone);
    data.append("userid", user && user?.id ? user?.id : 0);
    
    axios
    .post(base_url + "/add-user", data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      //storeUserData(response.data);
      
      setissubmit(false);
      alert("Data Saved Successfully!");
    })
    .catch(function (error) {
      setissubmit(false);
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
      //console.log("results",results);
      
      if (results.data) {
        // storeUserData(results.data);
        setFullname(results.data.name);
        setEmail(results.data.email);
        setPhone(results.data.phone);

       // console.log("url: ",`${admin_url}/${results.data.photo}`);
        setImg(`${admin_url}/storage/${results.data.photo}`);
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

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: false, // This ensures only images can be picked
      });

      if (result) {
        if (!result.canceled) {
          setFile(result);
          setImg(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  async function selectFile() {
    console.log("working...");
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
          title: "Profile",
          headerShown: true,
        }}
      />

      <ScrollView>
        <Card>
          {loading ? (
            <ActivityIndicator size="large" style={{ marginVertical: 300 }} />
          ) : (
            <>
              <Card.Content>
                <View style={{ position: "relative", marginTop: 20 }}>
                  <TouchableOpacity onPress={pickDocument}>
                    <>
                      {img ? (
                        <Avatar.Image
                          size={200}
                          source={{
                            uri: img,
                          }}
                          style={{ alignSelf: "center" }}
                        />
                      ) : (
                        <>
                          <Avatar.Image
                            size={200}
                            source={{
                              uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEXk5ueutLfX2tynrrLn6eqrsbXq7O3h4+SyuLva3d6/w8bLz9HU19nR1NbIzM66v8KaEzi7AAAFHUlEQVR4nO2d23LjIAxAjREXYwP//7cLTrpNUzs1IEdyhvOwM7vbB5+RAHHtMHQ6nU6n0+l0Op1Op9PpdDqdTqfT6XQ6nU4JoDUMZhoTk1n/clHSt5vFRftNdN5oTf1dFYA2wYrf2HA5H9DBSrXhIoSSYoYLpRsMQcpNkxtSBkP9jUcxs3qlsuqoYC4QHTDebufXk4717HVgcuqIS2o7yk28bcDHYyqrjvWc+zUI4rhLshGBb2zAFZjcdNzAVAcKUuy/TeRpU+PC1qbKJdswHEBdnUsacQL1p/8i1Lqk2MzUH/8TWKpVcg+9sGo25lAJs4udqAUeqW4w99hEPqEB3+aSOgFGhU2jSo4Nl9Do8Nf05YCMYxIaaHdJNjyGTh0RXISILEJjMAKT4DBV043d8n8cvQyYrdWxCpSlD42ecVwSM3mrAZzmL3LvTN2hwYSUZQk7EucZ4GVZmgoQ5xlg9WWCQZ5NlZPlTZlIOxOABa/JJGgnaZhNJjcaWpmGqf+GDO3ShkFs/+Q9AGb7X5fQCPMMJrTxf4W0PIMRtTMTgrIGQO6ZhSKVaV6WeZJZ6FzQZeQnySj/QTLyk2Ro20zL4v+mTB9nmMqQLtB8UjmDXTWTFprNu0xPMrRTAOTJGe1OLfK02dNOm1G7M+pVQPNBS024i4DURzXAI6410zaZofk4wwPkWZY3zpBc0ihDHRjMwpk8y5IN1jZgpDYZEPcBA/kuYAJwXCy1xwrMKCc0mJwKhqLDzHtQW9yBpT00kkFXdqPuEPAjynJo/SswNQeG040N35Zoktf52abiWTnqz/8BTC31puWUZEPjTg31MZNfNExsKFfL96it0Xg1/i/mqmbD0wVqOmjS7aXXjAdvAn67UG7I/AEYWxIcKchn/a+AwR23kbzGyg30cnBCoNTCprjcBYw7pOOYDfvbgB7j6+JGKRvHq7zaALA4uxuepOKWS70IAFNwdqOjzkEJ05VUMgBm9CFaKdXqlP6U0kY3j+ZqKivJx0yLD8FlQpiXabqmyZ307eaL4coi62stT1xQJ3/2YCY/pwyLD8/OuJxqZv3fa5BayhKikCtP3Zm6/6t188TysvkX+dtSMJz97bA11qQfyj3bYPhJ5WY+zlmkZA6QfjqGlHecfFJi5YioIpHvzEs5tzBJOtBDDknprOynj4jB05cFqWxpNHnwWQbKTk6/LChLfVLVNhsqHT34iKZy8xE2TBQ6WgdEjQfi26MD4Nsbyg7yvUfokopAutC8hZLubas2qVwpWlCq0RHhLXMFGEbUo4x7OtafP46CCWgnf17bKDeeG5y8UnFyhj3o2FOf2oPhTWH50onnbUMB7nW5IzZ2Pqnl6OWtYblzzmtuULeX1Io6Zff2fS3/yUZij6BgIpGLyDfRUGMDeMdKq2wwTwm1HVlAAPE6OrkLog0DlwSOzfuHym0w2g3gXl6qx2L0aajXfVpAuJDWeCwOkebXQ2Fk49J8boB4sHymbfAEqoJsB9VQdGIcWEZFNby1h3TKH5H6REN7IA+Tyh6t/ej1CdS+t6l5lDHPVA2dMFJ/9iZ1oWEamKprtujvFmBRc2kQ82osKqripWoms5gtiudp4Kk/eZfyJxC4TMm2KO0CsB8uQ6X0QQfs13FQKc4zmoXlgxROoDk3mVQ7FzUazOdxT6Dsvh2MnAMjVNFvFmM3xXyibJ0G5e71edgSGcNm5W+HIhkneVNUa66/AZMxZaMm8KbIpdPpdDqdTucq/AMef1AMtjuGRwAAAABJRU5ErkJggg==",
                            }}
                            style={{ alignSelf: "center" }}
                          />

                          <Avatar.Icon
                            size={50}
                            icon="account"
                            style={{
                              position: "absolute",
                              bottom: 5,
                              right: 80,
                            }}
                          />
                        </>
                      )}
                    </>
                  </TouchableOpacity>
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

                  {issubmit ? (
                    <ActivityIndicator
                      size="large"
                      style={{ marginVertical: 30 }}
                    />
                  ) : (
                    <>
                      <Button
                        mode="outlined"
                        style={{ marginVertical: 20 }}
                        onPress={adduser}
                      >
                        Save
                      </Button>
                    </>
                  )}
                </View>
              </Card.Content>
            </>
          )}
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

import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for icons
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AddEntryPopup from "./AddEntryPopup";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getAllPassword } from "../reducer/password-slice";

export default function HomeScreen() {
  const [isSearching, setIsSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const passwords = useSelector((state: RootState) => state.password.password);
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const jwtToken = useSelector((state: RootState) => state.user.jwt_token);
  const userId = useSelector((state: RootState) => state.user.username);
  const isLoading = useSelector((state: RootState) => state.password.loading);

  useEffect(() => {
    const sendData = {
      userId: userId ?? "",
      jwtToken: jwtToken ?? "",
    };
    dispatch(getAllPassword(sendData));
  }, [userId, jwtToken , isModalVisible]);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ marginTop: 50 }}>
        {!isSearching ? (
          <View style={styles.navbar}>
            <Text style={styles.title}>My Vault</Text>
            <TouchableOpacity onPress={() => setIsSearching(true)}>
              <Ionicons name="search" size={24} color="#363636" />
            </TouchableOpacity>
          </View>
        ) : (
          <TextInput
            label="Search"
            mode="outlined"
            style={styles.inputExpanded}
            activeOutlineColor="#363636"
            right={
              <TextInput.Icon icon="close" onPress={() => setIsSearching(false)} />
            }
          />
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {passwords && passwords.length > 0 ? (
            passwords.map((password, key) => (
              <TouchableOpacity key={key} style={styles.touchableOpacity}>
                <Image source={require("../assets/image copy 3.png")} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>{password.website}</Text>
                  <Text style={styles.subText}>{password.emailOrUsername}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No passwords found.</Text>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.addButton}
      >
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <AddEntryPopup
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8FB",
    padding: 20,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#363636",
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#363636",
    fontFamily: "Poppins_700Bold",
  },
  inputExpanded: {
    backgroundColor: "transparent",
    width: "100%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  addButton: {
    backgroundColor: "#363636",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  touchableOpacity: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#363636",
    gap: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  textContainer: {
    position: "relative",
    bottom: -3,
  },
  mainText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
  },
  subText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    position: "relative",
    bottom: 4,
  },
});

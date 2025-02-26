import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for icons
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AddEntryPopup from "./AddEntryPopup";

export default function HomeScreen() {
  const [isSearching, setIsSearching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);

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
              <TextInput.Icon
                icon="close"
                onPress={() => setIsSearching(false)}
              />
            }
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={{
          backgroundColor: "#363636",
          width: 50,
          height: 50,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
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
  },
  inputExpanded: {
    backgroundColor: "transparent",
    width: "100%",
  },
});

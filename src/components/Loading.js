import React, {Component} from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center"
  }
})

export const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="yellow" />
  </View>
);

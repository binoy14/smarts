import React, {Component} from "react";

import {
	View,
	Text,
	StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
})

const App = () => (
	<View style={styles.container}>
		<Text>Hello</Text>
	</View>
);

export default App;
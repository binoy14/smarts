import {
  StyleSheet
} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 2, 
    flexDirection: "row", 
    backgroundColor: "#689BB5"
  },
  iconContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  iconText: {
    fontSize: 100, 
    fontWeight: "500", 
    fontFamily: "Roboto", 
    color: "#DEECF0", 
    textShadowOffset: {
      height: 2,
      width: 1,
    }, 
    textShadowRadius: 5, 
    textShadowColor: '#777'
  },
  temperatureContainer: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  temperatureText: {
    fontSize: 280, 
    fontWeight: "700", 
    fontFamily: "Roboto", 
    color: "#DEECF0", 
    textShadowOffset: {
      height: 4,
      width: 2,
    }, 
    textShadowRadius: 5, 
    textShadowColor: '#777'
  },
  bottomContainer: {
    flex: 1, 
    backgroundColor: "#F9FDFF",  
    justifyContent: "space-around", 
    alignItems: "center", 
    flexDirection: "row"
  },
  nextWeatherContainer: {
    flexDirection: "row"
  },
  nextWeatherText: {
    color: "#B9D1EA", 
    fontSize: 119, 
    marginLeft: 30
  },
  nextWeatherDay: {
    textAlign: "center",
    fontSize: 40,
    color: "#B9D1EA",
  },
});

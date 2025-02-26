import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./componet/LoginScreen"; // Adjust the path if necessary
import RegisterScreen from "./componet/RegisterScreen"
import MasterScreen from "./componet/MasterScreen"
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true, // Enable gestures
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0], // Right-to-left animation
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Master" component={MasterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

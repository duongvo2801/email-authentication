import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Dashboard from "./src/Dashboard";
import Login from "./src/Login";
import Register from "./src/Register";
import Header from "./components/Header";


const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Header user state changes
  function onAuthStateChanged(user) {
    setUser(user); 
    if(initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const register = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return register;
  }, []);

  if(initializing) {
    return null;
  }

  if(!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
          options={{
            headerTitle: () => <Header name="Duong" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              elevation: 25,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
            }
          }}
        />
        <Stack.Screen name="Register" component={Register} 
          options={{
            headerTitle: () => <Header name="Duong" />,
            headerStyle: {
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              elevation: 25,
              backgroundColor: "#00e4d0",
              shadowColor: "#000",
            }
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} 
            options={{
              headerTitle: () => <Header name="Welcome Vo Van Duong" />,
              headerStyle: {
                height: 150,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                elevation: 25,
                backgroundColor: "#00e4d0",
                shadowColor: "#000",
              }
            }}
          />
    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}

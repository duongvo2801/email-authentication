import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Dashboard from "./src/Dashboard";
import Login from "./src/account/Login";
import Register from "./src/account/Register";

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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
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

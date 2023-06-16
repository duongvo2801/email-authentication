import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import {firebase} from '../config'

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error.message)
    }
  }

  // Forget Password
  const forgetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
          alert('Password reset email sent');
      }).catch(() => {
        alert('Please enter your email!');
      })
  }

  const ref_input2 = useRef();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Login
      </Text>
      <View>
        <TextInput 
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => ref_input2.current.focus()}
        />
        <TextInput 
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          ref={ref_input2}
        />
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => loginUser(email, password)}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{marginTop: 20}} 
        onPress={() => navigation.navigate("Register")}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Don't have account? Register</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{marginTop: 20}} 
        onPress={() => (forgetPassword())}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Forget Password</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
  }
})
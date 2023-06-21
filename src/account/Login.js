import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import {firebase} from '../../config'
import { colors } from '../../colors'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';

// link icons: https://fontawesome.com/
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
      <Text style={styles.title}> Login </Text>
      <View style={{width: '88%'}}>
        <Fumi
          style={styles.input}
          label={"Email"}
          iconClass={FontAwesomeIcon}
          iconName={"envelope"}
          iconColor={colors.telegram}
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='email-address'
          returnKeyType='next'
          onSubmitEditing={() => ref_input2.current.focus()}
        />
        <Fumi
          style={styles.input}
          label={"Password"}
          iconClass={FontAwesomeIcon}
          iconName={"lock"}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          ref={ref_input2}
          iconColor={colors.telegram}
          onChangeText={(password) => setPassword(password)}
        />
        
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => (forgetPassword())}>
          <Text style={styles.forgetPass}>Forget Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => loginUser(email, password)}>
          <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{marginTop: 20}} 
        onPress={() => navigation.navigate("Register")}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Don't have account? Register</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    color: colors.telegram,
    marginBottom: 50,
  },
  input: {
    marginTop: 13,
  },
  forgetPass: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: '85%',
    backgroundColor: colors.telegram,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold'
  }
})
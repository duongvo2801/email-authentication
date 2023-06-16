import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, {useRef, useState} from 'react'
import { firebase} from '../config'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('') 
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  registerUser = async (email, password, firstName, lastName) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url:'https://email-authentication-49dba.firebaseapp.com',
      })
      .then(() => {
        alert('Verification email sent!')
      })
      .catch((error) => {
          alert(error.message)
        })
      .then(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstName,
          lastName,
          email,
        })
      })
      .catch((error) => {
        alert(error.message)
      })
    })
    .catch((error) => {
      alert(error.message)
    });
  }

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={{ marginTop: 40 }}>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
            autoFocus={true}
            returnKeyType='next'
            onSubmitEditing={() => ref_input2.current.focus()}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
            returnKeyType='next'
            onSubmitEditing={() => ref_input3.current.focus()}
            ref={ref_input2}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType='email-address'
            returnKeyType='next'
            onSubmitEditing={() => ref_input4.current.focus()}
            ref={ref_input3}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry={true}
            ref={ref_input4}
          />
        </View>
        <TouchableOpacity
          onPress={() => registerUser(email, password, firstName, lastName)}
          style={styles.button}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
  )
}

export default Register

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
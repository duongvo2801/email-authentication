import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, {useRef, useState} from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects'

import { firebase} from '../../config'
import { colors } from '../../colors'

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
        <Text style={styles.title}> Register </Text>
        <View style={{width: '85%'}}>
          <Fumi
            style={styles.input}
            label={"First Name"}
            iconClass={FontAwesomeIcon}
            iconName={"user"}
            iconColor={colors.telegram}
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
            autoFocus={true}
            returnKeyType='next'
            onSubmitEditing={() => ref_input2.current.focus()}
          />
          <Fumi
            style={styles.input}
            label={"Last Name"}
            iconClass={FontAwesomeIcon}
            iconName={"user"}
            iconColor={colors.telegram}
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
            returnKeyType='next'
            onSubmitEditing={() => ref_input3.current.focus()}
            ref={ref_input2}
          />
          <Fumi
            style={styles.input}
            label={"Email"}
            iconClass={FontAwesomeIcon}
            iconName={"envelope"}
            iconColor={colors.telegram}
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType='email-address'
            returnKeyType='next'
            onSubmitEditing={() => ref_input4.current.focus()}
            ref={ref_input3}
          />
          <Fumi
            style={styles.input}
            label={"Password"}
            iconClass={FontAwesomeIcon}
            iconName={"lock"}
            iconColor={colors.telegram}
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
          <Text style={styles.buttonText}>Register</Text>
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
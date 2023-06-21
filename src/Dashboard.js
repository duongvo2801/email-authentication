import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {firebase} from '../config'
import { colors } from '../colors';

const Dashboard = () => {
  const [name, setName] = useState('');

  // change the password
  const changePassword = () => {
      firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
          alert('Password reset email sent');
      }).catch((error) => {
        alert(error.message);
      })
  }

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists) {
        setName(snapshot.data())
      } else {
        console.log('User dose not exist');
      }
    })
  }, [])

  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Hello, {name.firstName}
        </Text>
        <TouchableOpacity
          onPress={() => { changePassword() }}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Change password
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => {firebase.auth().signOut()}}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Sign out
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
  )
}

export default Dashboard

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
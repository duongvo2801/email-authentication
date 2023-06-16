import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.name}
      </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: "center",
    textAlign: "center",
  },

})
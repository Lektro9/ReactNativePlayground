import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const ColorBox = ({ name, colorCode }) => {
  return (
    <View style={[styles.gridItem, { backgroundColor: `${colorCode}` }]}>
      <Text style={styles.gridItemText}>
        Hello I'm {name}: {colorCode}!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 5,
    margin: '2%',
  },
  gridItemText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
  },
});
export default ColorBox;

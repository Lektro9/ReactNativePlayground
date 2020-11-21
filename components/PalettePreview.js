import React from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const PalettePreview = ({ pressHandler, colorPalette }) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Text>{colorPalette.paletteName}</Text>
      <FlatList
        data={colorPalette.colors.slice(0, 5)}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <View style={[{ backgroundColor: item.hexCode }, styles.box]} />
        )}
        horizontal={true}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 30,
    width: 30,
    margin: 5,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 2,
    elevation: 3,
  },
});

export default PalettePreview;

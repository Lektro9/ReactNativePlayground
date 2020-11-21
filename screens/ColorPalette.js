import React from 'react';

import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import ColorBox from '../components/ColorBox';
const ColorPalette = ({ route }) => {
  const { colors, paletteName } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.textBox}>
        <Text style={styles.textStyle}>{paletteName}</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.safeCont}
        data={colors}
        keyExtractor={(item) => {
          item.colorName;
        }}
        renderItem={({ item }) => (
          <ColorBox name={item.colorName} colorCode={item.hexCode} />
        )}
        ListHeaderComponent={
          <Text style={styles.textStyle}>Irgendwelche Farben</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeCont: {},
  textBox: {
    marginTop: 25,
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 25,
    textShadowColor: 'red',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default ColorPalette;

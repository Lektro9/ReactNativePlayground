import React, { useState, useCallback, useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import PalettePreview from '../components/PalettePreview';

const COLORS = [
  { colorName: 'Base03', hexCode: '#002b36' },
  { colorName: 'Base02', hexCode: '#073642' },
  { colorName: 'Base01', hexCode: '#586e75' },
  { colorName: 'Base00', hexCode: '#657b83' },
  { colorName: 'Base0', hexCode: '#839496' },
  { colorName: 'Base1', hexCode: '#93a1a1' },
  { colorName: 'Base2', hexCode: '#eee8d5' },
  { colorName: 'Base3', hexCode: '#fdf6e3' },
  { colorName: 'Yellow', hexCode: '#b58900' },
  { colorName: 'Orange', hexCode: '#cb4b16' },
  { colorName: 'Red', hexCode: '#dc322f' },
  { colorName: 'Magenta', hexCode: '#d33682' },
  { colorName: 'Violet', hexCode: '#6c71c4' },
  { colorName: 'Blue', hexCode: '#268bd2' },
  { colorName: 'Cyan', hexCode: '#2aa198' },
  { colorName: 'Green', hexCode: '#859900' },
];
const RAINBOW = [
  { colorName: 'Red', hexCode: '#FF0000' },
  { colorName: 'Orange', hexCode: '#FF7F00' },
  { colorName: 'Yellow', hexCode: '#FFFF00' },
  { colorName: 'Green', hexCode: '#00FF00' },
  { colorName: 'Violet', hexCode: '#8B00FF' },
];

const FRONTEND_MASTERS = [
  { colorName: 'Red', hexCode: '#c02d28' },
  { colorName: 'Black', hexCode: '#3e3e3e' },
  { colorName: 'Grey', hexCode: '#8a8a8a' },
  { colorName: 'White', hexCode: '#ffffff' },
  { colorName: 'Orange', hexCode: '#e66225' },
];

const AllSchemas = [
  { paletteName: 'Solarized', colors: COLORS },
  { paletteName: 'Rainbow', colors: RAINBOW },
  { paletteName: 'FrontendMasters', colors: FRONTEND_MASTERS },
];
const Home = ({ navigation, route }) => {
  const newPalette = route.params ? route.params.newPalette : null;
  console.log(newPalette);
  const [colorSamples, setColors] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const getDemColors = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    const receivedColors = await result.json();
    if (result.ok) {
      setColors(receivedColors);
    }
  }, []);

  useEffect(() => {
    getDemColors();
  }, []);

  useEffect(() => {
    if (newPalette) {
      setColors((current) => [newPalette, ...current]);
    }
  }, [newPalette]);

  const refreshHandler = useCallback(async () => {
    setIsRefreshing(true);
    await getDemColors();
    setIsRefreshing(false);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={colorSamples}
        keyExtractor={(item) => {
          item.paletteName;
        }}
        renderItem={({ item }) => (
          <PalettePreview
            pressHandler={() => {
              navigation.navigate('ColorsYo', item);
            }}
            colorPalette={item}
          />
        )}
        refreshing={isRefreshing}
        onRefresh={refreshHandler}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ColorPaletteModal');
            }}
            style={styles.beautifulBox}>
            <Text>Create A New Color Palette</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  beautifulBox: {
    margin: 20,
    height: 40,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default Home;

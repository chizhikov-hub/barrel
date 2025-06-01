import React, {useState} from "react";
import {SafeAreaView, StatusBar, StatusBarStyle, StyleSheet, View} from "react-native";
import {createTheme, ThemeProvider, useTheme} from "@rneui/themed";
import HomeScreen from "./views/home/HomeScreen";
import SettingsScreen from "./views/settings/SettingsScreen";
import CatalogsScreen from "./views/catalogs/CatalogsScreen";
import ProductTypesScreen from "./views/catalogs/ProductTypesScreen";
import ProductTypeEditScreen from "./views/catalogs/ProductTypeEditScreen";
import BottomNavigation from "./views/BottomNavigation";
import {ScreenType} from "./types/ScreenType";
import {ProductType} from "./types/ProductType";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

// StatusBar component that uses theme
const StatusBarWithTheme: React.FC = () => {
  const { theme } = useTheme();
  // Use light-content for dark theme and dark-content for light theme
  const barStyle: StatusBarStyle = theme.mode === 'dark' ? 'light-content' : 'dark-content';

  return <StatusBar barStyle={barStyle} backgroundColor={theme.colors.background} />;
};

// Mock data - in a real app, this would come from an API or database
const initialProductTypes: ProductType[] = [
  { id: '1', name: 'Напитки', unit: 'л.' },
  { id: '2', name: 'Закуски', unit: 'шт.' },
];

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('Home');
  const [productTypes, setProductTypes] = useState<ProductType[]>(initialProductTypes);
  const [currentProductType, setCurrentProductType] = useState<ProductType | null>(null);

  const renderScreen = (): React.ReactNode => {
    switch (activeScreen) {
      case 'Home':
        return <HomeScreen />;
      case 'Settings':
        return <SettingsScreen setActiveScreen={setActiveScreen} />;
      case 'Catalogs':
        return <CatalogsScreen setActiveScreen={setActiveScreen} />;
      case 'ProductTypes':
        return <ProductTypesScreen 
          setActiveScreen={setActiveScreen}
          productTypes={productTypes}
          setProductTypes={setProductTypes}
          setCurrentProductType={setCurrentProductType}
        />;
      case 'ProductTypeEdit':
        return <ProductTypeEditScreen 
          setActiveScreen={setActiveScreen}
          productTypes={productTypes}
          setProductTypes={setProductTypes}
          currentProductType={currentProductType}
        />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StatusBarWithTheme />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {renderScreen()}
        </View>
        <BottomNavigation 
          activeScreen={activeScreen} 
          setActiveScreen={setActiveScreen} 
        />
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;

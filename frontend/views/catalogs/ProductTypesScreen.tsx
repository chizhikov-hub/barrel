import { FC } from "react";
import { View, ScrollView, ViewStyle, TextStyle, TouchableOpacity } from "react-native";
import { makeStyles, Text, ListItem } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import { ProductType } from "../../types/ProductType";

interface StyleProps {
  container: ViewStyle;
  header: TextStyle;
  scrollView: ViewStyle;
}

const ProductTypesScreen: FC<{
  setActiveScreen: React.Dispatch<React.SetStateAction<'Home' | 'Settings' | 'Catalogs' | 'ProductTypes' | 'ProductTypeEdit'>>;
  productTypes: ProductType[];
  setProductTypes: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setCurrentProductType: React.Dispatch<React.SetStateAction<ProductType | null>>;
}> = ({ setActiveScreen, productTypes, setProductTypes, setCurrentProductType }) => {
  const styles = useStyles();

  // Navigate to the edit screen for creating a new product type
  const handleAddNew = () => {
    setCurrentProductType(null);
    setActiveScreen('ProductTypeEdit');
  };

  // Navigate to the edit screen for editing an existing product type
  const handleEdit = (productType: ProductType) => {
    setCurrentProductType(productType);
    setActiveScreen('ProductTypeEdit');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="#2089dc" 
          onPress={() => setActiveScreen('Catalogs')}
          style={styles.backButton}
        />
        <Text h4 style={styles.header}>Типы товаров</Text>
        <TouchableOpacity onPress={handleAddNew}>
          <Ionicons name="add" size={24} color="#2089dc" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {productTypes.map((productType) => (
          <ListItem 
            key={productType.id} 
            bottomDivider 
            onPress={() => handleEdit(productType)}
          >
            <Ionicons name="list-outline" size={24} color="#2089dc" />
            <ListItem.Content>
              <ListItem.Title>{productType.name}</ListItem.Title>
              <ListItem.Subtitle>Единица измерения: {productType.unit}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    flex: 1,
  },
  backButton: {
    marginRight: 10,
  },
  scrollView: {
    flex: 1,
  },
}));

export default ProductTypesScreen;

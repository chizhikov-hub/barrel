import { FC, useState, useEffect } from "react";
import { View, ScrollView, ViewStyle, TextStyle } from "react-native";
import { makeStyles, Text, Button, Input } from "@rneui/themed";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { ProductType, UNITS } from "../../types/ProductType";

interface StyleProps {
  container: ViewStyle;
  header: TextStyle;
  content: ViewStyle;
  input: ViewStyle;
  buttonContainer: ViewStyle;
  deleteButton: ViewStyle;
  pickerContainer: ViewStyle;
  picker: ViewStyle;
}

const ProductTypeEditScreen: FC<{
  setActiveScreen: React.Dispatch<React.SetStateAction<'Home' | 'Settings' | 'Catalogs' | 'ProductTypes' | 'ProductTypeEdit'>>;
  productTypes: ProductType[];
  setProductTypes: React.Dispatch<React.SetStateAction<ProductType[]>>;
  currentProductType: ProductType | null;
}> = ({ setActiveScreen, productTypes, setProductTypes, currentProductType }) => {
  const styles = useStyles();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState<'л.' | 'шт.' | 'мл.'>('л.');

  useEffect(() => {
    // Initialize form fields when currentProductType changes
    if (currentProductType) {
      setName(currentProductType.name);
      setUnit(currentProductType.unit);
    } else {
      setName('');
      setUnit('л.');
    }
  }, [currentProductType]);

  // Save a new or updated product type
  const handleSave = () => {
    if (name.trim() === '') {
      // Show error message
      return;
    }

    if (currentProductType) {
      // Update existing product type
      setProductTypes(productTypes.map(pt => 
        pt.id === currentProductType.id ? { ...pt, name, unit } : pt
      ));
    } else {
      // Create new product type
      const newProductType: ProductType = {
        id: Date.now().toString(), // Simple ID generation
        name,
        unit,
      };
      setProductTypes([...productTypes, newProductType]);
    }

    // Navigate back to the product types list
    setActiveScreen('ProductTypes');
  };

  // Delete a product type
  const handleDelete = () => {
    if (currentProductType) {
      setProductTypes(productTypes.filter(pt => pt.id !== currentProductType.id));
      // Navigate back to the product types list
      setActiveScreen('ProductTypes');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons 
          name="arrow-back" 
          size={24} 
          color="#2089dc" 
          onPress={() => setActiveScreen('ProductTypes')}
          style={styles.backButton}
        />
        <Text h4 style={styles.header}>
          {currentProductType ? 'Редактировать тип товара' : 'Новый тип товара'}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <Input
          label="Наименование"
          value={name}
          onChangeText={setName}
          containerStyle={styles.input}
        />
        
        <Text style={styles.label}>Единица измерения:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={unit}
            onValueChange={(itemValue) => setUnit(itemValue as 'л.' | 'шт.' | 'мл.')}
            style={styles.picker}
          >
            {UNITS.map((unitOption) => (
              <Picker.Item key={unitOption} label={unitOption} value={unitOption} />
            ))}
          </Picker>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Отмена" 
            type="outline" 
            onPress={() => setActiveScreen('ProductTypes')} 
          />
          <Button 
            title="Сохранить" 
            onPress={handleSave} 
          />
        </View>
        
        {currentProductType && (
          <Button 
            title="Удалить" 
            type="outline" 
            buttonStyle={styles.deleteButton}
            onPress={handleDelete} 
          />
        )}
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
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e1e8ee',
    borderRadius: 5,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  deleteButton: {
    marginTop: 20,
    borderColor: theme.colors.error,
    color: theme.colors.error,
  },
}));

export default ProductTypeEditScreen;
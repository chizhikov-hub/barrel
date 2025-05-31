import { StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Table } from '@/components/Table';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
    const { width, height } = useWindowDimensions();
    const isHorizontal = width > height;

    // Get theme-aware colors
    const buttonBackgroundColor = useThemeColor({
        light: '#20B2AA', // Light green for light theme
        dark: '#2E8B57'   // Sea green for dark theme
    }, 'tint');

    const buttonIconColor = useThemeColor({
        light: 'white',
        dark: 'white'
    }, 'background');

    const [tables, setTables] = useState(Array.from({ length: 6 }, (_, index) => index + 1));

    const handleAddTable = () => {
        setTables(currentTables => {
            const maxTableNumber = currentTables.length > 0 ? Math.max(...currentTables) : 0;
            return [...currentTables, maxTableNumber + 1];
        });
    };

    const handleDeleteTable = (tableNumber: number) => {
        setTables(currentTables => currentTables.filter(num => num !== tableNumber));
    };

    return (
        <ThemedView style={[
            styles.container,
            isHorizontal ? styles.horizontalLayout : styles.verticalLayout
        ]}>
            <ThemedView style={styles.section}>
                <ScrollView>
                    <ThemedView style={styles.tablesGrid}>
                        {tables.map((tableNumber) => (
                            <Table 
                                key={tableNumber} 
                                number={tableNumber} 
                                onDelete={handleDeleteTable} 
                            />
                        ))}
                        <TouchableOpacity 
                            style={[
                                styles.addButton,
                                { backgroundColor: buttonBackgroundColor }
                            ]} 
                            onPress={handleAddTable}
                        >
                            <MaterialIcons name="add" size={24} color={buttonIconColor} />
                        </TouchableOpacity>
                    </ThemedView>
                </ScrollView>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="title">Популярные товары</ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
                <ThemedText type="title">Категории</ThemedText>
            </ThemedView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    horizontalLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    verticalLayout: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    section: {
        flex: 1,
        padding: 16,
        margin: 8,
        borderRadius: 8,
        backgroundColor: 'rgba(161, 206, 220, 0.1)',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    addButton: {
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tablesGrid: {        
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
    },
});

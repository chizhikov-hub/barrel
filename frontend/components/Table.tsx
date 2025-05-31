import { StyleSheet, TouchableOpacity, Modal, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TableProps {
    number: number;
    onDelete?: (number: number) => void;
}

// Компонент для отображения стола
export const Table = ({ number, onDelete }: TableProps) => {
    const [menuVisible, setMenuVisible] = useState(false);

    // Get theme-aware colors
    const menuBackgroundColor = useThemeColor({
        light: 'white',
        dark: '#2c2c2c'
    }, 'background');

    const menuBorderColor = useThemeColor({
        light: '#f0f0f0',
        dark: '#3d3d3d'
    }, 'text');

    const menuShadowColor = useThemeColor({
        light: '#000',
        dark: '#000'
    }, 'text');

    const handleLongPress = () => {
        setMenuVisible(true);
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(number);
        }
        setMenuVisible(false);
    };

    return (
        <>
            <TouchableOpacity 
                style={styles.table} 
                onLongPress={handleLongPress}
            >
                <ThemedText type="defaultSemiBold">#{number}</ThemedText>
            </TouchableOpacity>

            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={[
                        styles.contextMenu,
                        { backgroundColor: menuBackgroundColor, shadowColor: menuShadowColor }
                    ]}>
                        <TouchableOpacity 
                            style={[
                                styles.menuItem,
                                { borderBottomColor: menuBorderColor }
                            ]} 
                            onPress={handleDelete}
                        >
                            <ThemedText type="default">Удалить стол</ThemedText>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    table: {
        width: 56,
        height: 56,
        backgroundColor: 'rgba(161, 206, 220, 0.3)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A1CEDC',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contextMenu: {
        borderRadius: 8,
        padding: 8,
        width: '80%',
        maxWidth: 300,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        padding: 12,
        borderBottomWidth: 1,
    },
});

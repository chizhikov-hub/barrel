import { StyleSheet, TouchableOpacity, Modal, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';

interface TableProps {
    number: number;
    onDelete?: (number: number) => void;
}

// Компонент для отображения стола
export const Table = ({ number, onDelete }: TableProps) => {
    const [menuVisible, setMenuVisible] = useState(false);

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
                    <View style={styles.contextMenu}>
                        <TouchableOpacity 
                            style={styles.menuItem} 
                            onPress={handleDelete}
                        >
                            <ThemedText type="default">Удалить</ThemedText>
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
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        width: '80%',
        maxWidth: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
});

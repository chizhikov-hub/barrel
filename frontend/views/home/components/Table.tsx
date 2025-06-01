import { StyleSheet, TouchableOpacity, Modal, View, Pressable } from 'react-native';
import { useState } from 'react';
import {Text, makeStyles, Theme, Button} from "@rneui/themed";

interface TableProps {
    number: number;
    onDelete?: (number: number) => void;
}

export const Table = ({ number, onDelete }: TableProps) => {
    const styles = useStyles();
    const [menuVisible, setMenuVisible] = useState(false);

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
                onLongPress={() => setMenuVisible(true)}
            >
                <Text>#{number}</Text>
            </TouchableOpacity>

            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.contextMenu}>
                        <Text style={styles.modalTitle}>Стол #{number}</Text>
                        <Button
                            title="Удалить"
                            onPress={handleDelete}
                            buttonStyle={styles.deleteButton}
                        />
                        <Button
                            title="Отмена"
                            type="outline"
                            onPress={() => setMenuVisible(false)}
                            buttonStyle={styles.cancelButton}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const useStyles = makeStyles((theme) => ({
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
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contextMenu: {      
        backgroundColor: theme.colors.background,      
        borderRadius: 8,
        padding: 8,
        width: '80%',
        maxWidth: 300,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    deleteButton: {
        backgroundColor: theme.colors.error,
        width: '100%',
        marginBottom: 10,        
    },
    cancelButton: {
        width: '100%',
    },
}));

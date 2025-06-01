import { StyleSheet, TouchableOpacity, Modal, View } from 'react-native';
import { useState } from 'react';
import {Text, makeStyles, Theme} from "@rneui/themed";

interface TableProps {
    number: number;
    onDelete?: (number: number) => void;
}

export const Table = ({ number, onDelete }: TableProps) => {
    const styles = useStyles();
    const [menuVisible, setMenuVisible] = useState(false);

    return (
        <TouchableOpacity style={styles.table}>
            <Text>#{number}</Text>
        </TouchableOpacity>
    );
};

const useStyles = makeStyles((theme: Theme) => ({
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
}));
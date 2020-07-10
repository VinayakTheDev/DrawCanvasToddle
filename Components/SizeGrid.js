import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const size = 10
const SizeGrid = (props) => {

    const sized = props.size
    const color = props.color
    const updateStroke = props.onClick
    const sizeIndicator = (size, color) => {
        return {
            backgroundColor: color,
            borderRadius: size/2,
            width: size,
            height: size,
          }
    }
    return (
        <TouchableOpacity style={styles.gridContainer} onPress={() => updateStroke()}>
            <View style={styles.sizeContainer}>
                <View style={sizeIndicator(sized, color)}></View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    sizeContainer: {
        padding: 10,
    }
});


export default SizeGrid;

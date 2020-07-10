
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ColorSizeHandlerComponent = (props) => {
    const color = props.color
    const showColorPicker = props.colorPicker
    const showSizePicker = props.sizePicker
    return (
<View style={styles.mainContainer}>
<View style={styles.container}>
            <TouchableOpacity style={styles.handlerComponent} onPress={showColorPicker}>
                <Octicons name="primitive-dot" size={24} color={color}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.handlerComponent} onPress={showSizePicker}>
                 <FontAwesome name="dot-circle-o" size={24} color={color}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.handlerComponent}>
                <Fontisto name="nav-icon-grid-a" size={24} color={color}/>
            </TouchableOpacity>
        </View>
        <View>
            {props.children}
        </View>
</View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginRight: 10,
    },
    handlerComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    }, 
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});


export default ColorSizeHandlerComponent;

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TitleText = (props) => (
        <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
);

const styles = StyleSheet.create({
    body: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default TitleText;

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../Constants/Colors';
import TitleText from './../Components/TitleText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Header = (props) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerContentContainer}>
                <TitleText style={styles.headerTitle}>{props.title}</TitleText>
                {
                    props.leftCluster ? (
                    <View style={styles.leftCluster}>
                        {
                            [...Array(props.leftCluster)].map((_, index) => (<TouchableOpacity key={index} style={styles.headerButton} onPress={() => { props.actions.left[index]() }}>
                                <Icon key={index} name={props.icons.left[index]} size={24} />
                            </TouchableOpacity>))
                        }
                    </View>) : <View></View>
                }
                {
                    props.rightCluster ? (
                        <View style={styles.rightCluster}>
                        {
                            [...Array(props.rightCluster)].map((_, index) => (<TouchableOpacity key={index} style={styles.headerButton} onPress={() => { props.actions.right[index]() }}>
                                 <Icon key={index} name={props.icons.right[index]} size={24} />
                             </TouchableOpacity>))
                        }
                    </View>
                    ) : <View></View>
                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 2.00,

        elevation: 1,
        zIndex: 2,
    },
    headerTitle: {
        color: 'black',
        fontSize: 18
    },
    headerContentContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    rightCluster: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    headerButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextButton: {
        width: 54,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    leftCluster: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    }
})
export default Header;
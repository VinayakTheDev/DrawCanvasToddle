import React from 'react';
import { Text, View, Button } from 'react-native';
import  Header  from './../Components/Header';
import ImagePicker from 'react-native-image-picker';


const ChoosePhotoScreen = (props) => {
    const chooseImage = () => {
        const options = {
          title: 'Select Photo',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);  
              } else {
                const source = { uri: response.uri };   
                props.navigation.navigate("CanvasDrawScreen", {image: source});
              }
          });
       
      }
    return (
        <View>
             <Header title="Photo" leftCluster={0} rightCluster={0} actions={{ left: [], right: [] }} />
             <View>
                 <Button title="Choose Photo" onPress={() => chooseImage()}/>
             </View>
    </View>
    )
};

export default ChoosePhotoScreen;

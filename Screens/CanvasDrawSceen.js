import React, {useState, createRef, Component} from 'react';
import {
    StyleSheet, Button, View, UIManager, findNodeHandle, SafeAreaView, TouchableOpacity, Image, Dimensions, Animated, Platform
  } from 'react-native';
import ColorPickerView from './../Components/ColorPickerComponent';
import SizeGrid from './../Components/SizeGrid';
import ColorSizeHandlerComponent from './../Components/ColorSizeHandlerComponent';
import Draggable from 'react-native-draggable';
import CanvasDrawView from './../Components/CanvasDrawView';
import Header from './../Components/Header';
const win = Dimensions.get('window');


const CanvasDrawScreen = (props) => {
    const {source} = props.route.params.image.uri;
    
    const [imagePath, setImagePath] = useState('');
    
    const [pencilY, setPencilY] = [new Animated.Value(0)]
    const [eraserY, setEraserY] = [new Animated.Value(0)] 
    
    const [visible, setVisible] = useState(false)
    const [colorPicker, setColorPicker] = useState(false)
    const [sizePicker, setSizePicker] = useState(false)

    const canvasRef = createRef();

    const CLEAR = 1;
    const SAVE = 2;
    const UNDO = 3;
    const REDO = 4;
    const TOGGLE = 5;

    
  
    const getImagePath = (path) => {
        setImagePath(path)
      }

    const clear = () => {
      const nativeCommands =  Platform === 'ios'  ? UIManager.CanvasDrawView.Commands.clearCanvas : CLEAR;
      const canvasNodeHandle = findNodeHandle(this.canvasRef);
      UIManager.dispatchViewManagerCommand(canvasNodeHandle, nativeCommands, []);
    };
  
    const undo = () => {
      const nativeCommands = Platform === 'ios'  ? UIManager.CanvasDrawView.Commands.undo : UNDO;
      const canvasNodeHandle = findNodeHandle(this.canvasRef);
      UIManager.dispatchViewManagerCommand(canvasNodeHandle, nativeCommands, []);
    }
  
    const redo = () => {
      const nativeCommands =  Platform === 'ios'  ? UIManager.CanvasDrawView.Commands.redo : REDO;
      const canvasNodeHandle = findNodeHandle(this.canvasRef);
      UIManager.dispatchViewManagerCommand(canvasNodeHandle, nativeCommands, []);
    }
  
    const toggle = (bool) => {
      choosePencil(!bool)
      chooseEraser(bool)
    //   const nativeCommands = Platform === 'ios'  ? UIManager.CanvasDrawView.Commands.toggle : TOGGLE;
    //   const canvasNodeHandle = findNodeHandle(this.canvasRef);
    //   UIManager.dispatchViewManagerCommand(canvasNodeHandle, nativeCommands, []);
    }
  
    const done = () => {
      const nativeCommands = Platform === 'ios'  ? UIManager.CanvasDrawView.Commands.save : SAVE;
      {console.log(nativeCommands)}
      const canvasNodeHandle = findNodeHandle(this.canvasRef);
      UIManager.dispatchViewManagerCommand(canvasNodeHandle, nativeCommands, []);
    }
  
  
    const [stroke, setStroke] = useState(2)
    const [pencil, setPencil] = useState(false)
  
    const [color, setColor] = useState('#000000')
  
    const updateStroke = (strokeWidth) => {
      setStroke(strokeWidth)
      //  toggle(pencil)
      setSizePicker(false)
    }
  
    const colorChange = (event) => {
      const color = event.color
      setColor(color)
    }

    const hideComponents = () => {
      setColorPicker(false)
      setSizePicker(false)
      toggle(false)
    }
  
    const showColorPicker = (show) => {
      setColorPicker(show)
      if(sizePicker) {
        setSizePicker(false)
      }
      if(!show) {
          toggle(pencil)
      }
    }
    const showSizePicker = (show) => {
      setSizePicker(show)
      if(colorPicker) {
        setColorPicker(false)
      }
  
    }
  
    const choosePencil = (choose) => {
     
      if(choose) {
        var toVal = -50
        Animated.spring(
          pencilY,
          {
            toValue: toVal,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true, 
          }
        ).start();
      } else {
        var toVal = 0
      Animated.spring(
        pencilY,
        {
          toValue: toVal,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true, 
        }
      ).start();
      }
    }
  
    const chooseEraser = (choose) => {
      
      if(choose) {
        var toVal = -50
        Animated.spring(
          eraserY,
          {
            toValue: toVal,
            velocity: 3,
            tension: 2,
            friction: 8,
            useNativeDriver: true, 
          }
        ).start();
      } else {
        var toVal = 0
      Animated.spring(
        eraserY,
        {
          toValue: toVal,
          velocity: 3,
          tension: 2,
          friction: 8,
          useNativeDriver: true, 
        }
      ).start();
      }
    }

    return (
        <View>
        {choosePencil(true)}
       
        <Header 
            title="" leftCluster={1} 
            rightCluster={3} 
            actions={{ 
                left: [clear], 
                right: [undo, redo, done] 
                }} 
            icons={{left:["delete"], 
            right:["undo-variant", "redo-variant", "check"]
            }}/>
        <CanvasDrawView 
            ref={(el) => { this.canvasRef = el; }} 
            style={styles.drawView} 
            strokeWidth={stroke} 
            strokeColor={color} 
            drawImagePath={source} 
            onSaved={res => alert('saved')} >
  
          <Draggable 
            onDrag={() => hideComponents()} 
            y={win.height / 3 - 66}
            minX={0} 
            maxX={win.width} 
            shouldReverse={true}>
            <ColorSizeHandlerComponent 
                style={styles.colorSizeHandler} 
                color={color} colorPicker={() => showColorPicker(!colorPicker)} 
                sizePicker={() => showSizePicker(!sizePicker)}>
             
              
                <View>
                  {
                  colorPicker ? (
                  <View style={styles.colorPickerContainer}>
                    <ColorPickerView style={styles.colorPicker} onColorChange={res => colorChange(res.nativeEvent)} />
                  </View>
                ) : null}
             { sizePicker ? (
                  <View style={styles.sizeGrid}>
                    <SizeGrid size={5} color={color} onClick={() => updateStroke(2)} />
                    <SizeGrid size={10} color={color} onClick={() => updateStroke(5)} />
                    <SizeGrid size={15} color={color} onClick={() => updateStroke(10)} />
                  </View>
              ) : null}
                </View>
  
              
            </ColorSizeHandlerComponent>
          </Draggable>
        </CanvasDrawView>
        <View style={styles.editPanel}>
          <Animated.View style={
                {transform: [{translateY: pencilY}]}}>
          <TouchableOpacity style={styles.editTool} onPress={() => { toggle(false) }}>
            <Image source={require('./../Assets/images/pencil.png')} style={{ height: 250, width: 100, resizeMode: 'stretch', }} />
  
          </TouchableOpacity>
          </Animated.View>
          <Animated.View style={
                {transform: [{translateY: eraserY}]}}>
          <TouchableOpacity style={styles.editTool} onPress={() => { toggle(true) }}>
            <Image source={require('./../Assets/images/eraser.png')} style={{ height: 250, width: 100, resizeMode: 'stretch', }} />
          </TouchableOpacity>
          </Animated.View>
        </View>
  
      </View>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    drawView: {
      height: '70%',
      width: '100%',
      backgroundColor: 'white',
      overflow: 'hidden',
      alignItems: 'flex-start'
    },
    editPanel: {
      backgroundColor: 'white',
      width: win.width,
      height: '30%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    editTool: {
  
    },
    colorPicker: {
      width: 200,
      height: 200,
    },
    colorPickerContainer: {
  
    },
    sizeGrid: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: 75,
      backgroundColor: '#ebebeb',
      borderRadius: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    colorSizeHandler: {
      marginTop: win.height - 66
  
    }
  })
export default CanvasDrawScreen;

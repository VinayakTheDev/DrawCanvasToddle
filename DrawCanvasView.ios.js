import React from 'react';

class CanvasDrawView extends React.Component {
    clearCanvas = () => {
      UIManager.dispatchViewManagerCommand(
        ReactNative.findNodeHandle(this),
        UIManager.getViewManagerConfig('CanvasDrawView').Commands
          .clearCanvas,
        []
      );
    };
    undo = () => {
      UIManager.dispatchViewManagerCommand(
        ReactNative.findNodeHandle(this),
        UIManager.getViewManagerConfig('CanvasDrawView').Commands
          .undo,
        []
      );
    };
    redo = () => {
      UIManager.dispatchViewManagerCommand(
        ReactNative.findNodeHandle(this),
        UIManager.getViewManagerConfig('CanvasDrawView').Commands
          .redo,
        []
      );
    };
  
    render() {
      return <CanvasDrawViewComponent ref={NATIVE_COMPONENT_REF} />;
    }
  }
  
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DragTextEditor} from 'react-native-drag-text-editor';

const DraggableText = () => {
  const viewComponent = () => <View style={styles.cornerStyles}/>;

  const _cornerComponent = [
    {
      side: 'TR',
      customCornerComponent: () => viewComponent()
    },
  ];

  const _rotateComponent = {
    side: 'bottom',
    customRotationComponent: () => viewComponent()
  };

  const _resizerSnapPoints = ['right', 'left'];

  return (
      <DragTextEditor
        visible={true}
        resizerSnapPoints={_resizerSnapPoints}
        cornerComponents={_cornerComponent}
        rotationComponent={_rotateComponent}
        externalTextStyles={styles.textStyles}
        externalBorderStyles={styles.borderStyles}
      />
  );
};

const styles = StyleSheet.create({
  borderStyles: {
    borderStyle: 'dashed',
    borderColor: 'gray',
  },
  textStyles: {
    color: '#000',
  },
  cornerStyles: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: '#aaa',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default DraggableText;

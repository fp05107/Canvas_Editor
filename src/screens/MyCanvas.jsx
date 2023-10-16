import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Svg, {Circle, Text as SVGText} from 'react-native-svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faRotateLeft,
  faRotateRight,
  faXmark,
  faCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import CONSTANTS from '../config/constants.config';
import COLORS from '../config/colors.config';
import {useNavigation} from '@react-navigation/native';

export default function MyCanvas(props) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnItems, setDrawnItems] = useState([]);
  const [text, setText] = useState('');
  const [textSize, setTextSize] = useState(20);

  const navigation = useNavigation();

  // Maintain separate history stacks for drawing and text actions
  const drawingHistoryRef = useRef([]);
  const textHistoryRef = useRef([]);

  // console.log('====================================');
  // console.log(props.route.params.text);
  // console.log('====================================');

  const handlePress = e => {
    if (isDrawing) {
      const newItem = (
        <Circle
          cx={e.nativeEvent.locationX}
          cy={e.nativeEvent.locationY}
          r="5"
          fill="black"
          key={drawnItems.length}
        />
      );
      setDrawnItems([...drawnItems, newItem]);

      // Add the drawing action to the drawing history stack
      drawingHistoryRef.current.push(newItem);
    }
  };

  const addText = () => {
    if (text) {
      const newText = (
        <SVGText
          x="50"
          y="50"
          fontSize={textSize}
          fill="black"
          key={drawnItems.length}>
          {text}
        </SVGText>
      );
      setDrawnItems([...drawnItems, newText]);

      // Add the text action to the text history stack
      textHistoryRef.current.push(newText);
    }
  };

  const increaseTextSize = () => {
    setTextSize(textSize + 5);
  };

  const decreaseTextSize = () => {
    if (textSize > 5) {
      setTextSize(textSize - 5);
    }
  };

  const undo = () => {
    if (isDrawing && drawingHistoryRef.current.length > 0) {
      drawingHistoryRef.current.pop(); // Remove the last drawing action
      setDrawnItems([...textHistoryRef.current, ...drawingHistoryRef.current]);
    } else if (!isDrawing && textHistoryRef.current.length > 0) {
      textHistoryRef.current.pop(); // Remove the last text action
      setDrawnItems([...textHistoryRef.current, ...drawingHistoryRef.current]);
    }
  };

  const redo = () => {
    
  }

  const clearCanvas = () => {
    setDrawnItems([]);
    drawingHistoryRef.current = [];
    textHistoryRef.current = [];
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <FontAwesomeIcon color="#FFF" size={30} icon={faArrowLeft} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon color="#FFF" size={30} icon={faRotateRight} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon color="#FFF" size={30} icon={faRotateLeft} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF'}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <Svg
        width={CONSTANTS.windowWidth * 0.95}
        height={CONSTANTS.windowHeight * 0.7}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={handlePress}
        style={{borderWidth: 1, borderColor: 'black', borderRadius: 5}}>
        {drawnItems.map(item => item)}
      </Svg>

      <TouchableOpacity
        style={{
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: 5,
          paddingHorizontal: 10,
          marginTop: 5,
        }}
        onPress={addText}>
        <Text>Add Text</Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginTop: 5,
            marginRight: 10,
          }}
          onPress={decreaseTextSize}>
          <Text>Decrease Text Size</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Enter text"
          value={text}
          onChangeText={text => setText(text)}
        />
        <TouchableOpacity
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginTop: 5,
            marginLeft: 10,
          }}
          onPress={increaseTextSize}>
          <Text>Increase Text Size</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 20}}>
        <TouchableOpacity
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginTop: 5,
            marginRight: 10,
          }}
          onPress={undo}>
          <Text>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 5,
            paddingHorizontal: 10,
            marginTop: 5,
          }}
          onPress={clearCanvas}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: CONSTANTS.windowWidth,
    justifyContent: 'space-between',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Secondary,
    backgroundColor: COLORS.Primary,
    marginBottom: 20,
  },
  inputBox: {
    width: CONSTANTS.windowWidth * 0.9,
    alignSelf: 'center',
    margin: 10,
  },
  textButton: {
    width: CONSTANTS.windowWidth,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    backgroundColor: COLORS.Primary, // Button background color
    padding: 15,
    alignItems: 'center',
  },
});

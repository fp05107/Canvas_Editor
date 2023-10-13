// import React, {useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
// } from 'react-native';
// import Svg, {Circle, Rect, Text as SVGText} from 'react-native-svg';

// export default function MyCanvas() {

//   const [isDrawing, setIsDrawing] = useState(false);
//   const [drawnItems, setDrawnItems] = useState([]);
//   const [text, setText] = useState('');
//   const [textSize, setTextSize] = useState(20);

//   // Maintain a history stack for undo functionality
//   const historyRef = useRef([]);
//   const historyIndexRef = useRef(-1);

//   const handlePress = (e) => {
//     if (isDrawing) {
//       const newItem = <Circle cx={e.nativeEvent.locationX} cy={e.nativeEvent.locationY} r="5" fill="black" key={drawnItems.length} />;
//       setDrawnItems([...drawnItems, newItem]);

//       // Add the drawing action to the history stack
//       historyRef.current.push(newItem);
//       historyIndexRef.current = historyRef.current.length - 1;
//     }
//   };

//   const addText = () => {
//     if (text) {
//       const newText = <SVGText x="50" y="50" fontSize={textSize} fill="black" key={drawnItems.length}>{text}</SVGText>;
//       setDrawnItems([...drawnItems, newText]);

//       // Add the text action to the history stack
//       historyRef.current.push(newText);
//       historyIndexRef.current = historyRef.current.length - 1;
//     }
//   };

//   const increaseTextSize = () => {
//     setTextSize(textSize + 5);
//   };

//   const decreaseTextSize = () => {
//     if (textSize > 5) {
//       setTextSize(textSize - 5);
//     }
//   };

//   const undo = () => {
//     if (historyIndexRef.current >= 0) {
//       historyRef.current.pop(); // Remove the last action from history
//       historyIndexRef.current--;
//       setDrawnItems([...historyRef.current]);
//     }
//   };

//   const clearCanvas = () => {
//     setDrawnItems([]);
//     historyRef.current = [];
//     historyIndexRef.current = -1;
//   };
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Svg
//         width={300}
//         height={300}
//         onTouchStart={() => setIsDrawing(true)}
//         onTouchEnd={() => setIsDrawing(false)}
//         onTouchMove={handlePress}
//         style={{borderWidth: 1, borderColor: 'black'}}>
//         {drawnItems.map(item => item)}
//       </Svg>

//       <TouchableOpacity
//         style={{
//           backgroundColor: 'green',
//           padding: 10,
//           borderRadius: 5,
//           paddingHorizontal: 15,
//         }}
//         onPress={addText}>
//         <Text style={{color: '#FFF', fontWeight: 'bold'}}>Add Text</Text>
//       </TouchableOpacity>

//       <TextInput
//         style={{
//           borderWidth: StyleSheet.hairlineWidth,
//           borderRadius: 5,
//           paddingHorizontal: 10,
//           marginTop: 5,
//         }}
//         placeholder="Enter text"
//         value={text}
//         onChangeText={text => setText(text)}
//       />
//       <TouchableOpacity
//         style={{
//           backgroundColor: 'green',
//           padding: 10,
//           borderRadius: 5,
//           paddingHorizontal: 15,
//         }}
//         onPress={increaseTextSize}>
//         <Text>Increase Text Size</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={undo} style={{ marginRight: 10 }}>
//           <Text>Undo</Text>
//         </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           backgroundColor: 'green',
//           padding: 10,
//           borderRadius: 5,
//           paddingHorizontal: 15,
//         }}
//         onPress={clearCanvas}>
//         <Text style={{color: '#FFF', fontWeight: 'bold'}}>Clear</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// style={{
//   borderWidth: StyleSheet.hairlineWidth,
//   borderRadius: 5,
//   paddingHorizontal: 10,
//   marginTop: 5,
// }}

import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Svg, {Circle, Text as SVGText} from 'react-native-svg';

export default function MyCanvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnItems, setDrawnItems] = useState([]);
  const [text, setText] = useState('');
  const [textSize, setTextSize] = useState(20);

  // Maintain separate history stacks for drawing and text actions
  const drawingHistoryRef = useRef([]);
  const textHistoryRef = useRef([]);

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
    console.log('====================================');
    console.log(textHistoryRef.current);
    console.log('====================================');
    if (isDrawing && drawingHistoryRef.current.length > 0) {
      drawingHistoryRef.current.pop(); // Remove the last drawing action
      setDrawnItems([...textHistoryRef.current, ...drawingHistoryRef.current]);
    } else if (!isDrawing && textHistoryRef.current.length > 0) {
   
      textHistoryRef.current.pop(); // Remove the last text action
      setDrawnItems([...textHistoryRef.current, ...drawingHistoryRef.current]);
    }
  };

  const clearCanvas = () => {
    setDrawnItems([]);
    drawingHistoryRef.current = [];
    textHistoryRef.current = [];
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Svg
        width={300}
        height={300}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={handlePress}
        style={{borderWidth: 1, borderColor: 'black'}}>
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

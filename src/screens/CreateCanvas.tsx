import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
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
import {Input, ScrollView, StatusBar} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import CanvasBoard from '../components/CanvasBoard/CanvasBoard';

const CreateCanvas = () => {
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const handleTickPress = () => {
    navigation.navigate('MyCanvas', {text: input});
  };
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* <StatusBar hidden /> */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <FontAwesomeIcon color="#FFF" size={30} icon={faArrowLeft} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon color="#FFF" size={30} icon={faXmark} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTickPress}>
          <FontAwesomeIcon color="#FFF" size={30} icon={faCheck} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon color="#FFF" size={30} icon={faTrash} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            Save
          </Text>
        </TouchableOpacity>
        {/* <FontAwesomeIcon size={30} icon={faRotateRight} /> */}
        {/* <FontAwesomeIcon size={30} icon={faRotateLeft} /> */}
        <Text></Text>
      </View>

      <View
        style={{
          flex: 1,
          height: CONSTANTS.windowHeight * 0.94,
          width: CONSTANTS.windowWidth,
          alignSelf: 'center',
        }}>
        <CanvasBoard />
      </View>

      {/* <View style={styles.inputBox}>
        <Input
          value={input}
          onChangeText={value => setInput(value)}
          variant="outline"
          placeholder="Type Something....."
        />
      </View> */}

      {/* <TouchableOpacity style={styles.textButton}>
        <Text>TEXT</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default CreateCanvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: CONSTANTS.windowWidth,
    justifyContent: 'space-between',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.Secondary,
    backgroundColor: COLORS.Primary,
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

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
import CONSTANTS from '../config/Constants.config';
import COLORS from '../config/colors.config';
import {Input, StatusBar} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const CreateCanvas = () => {
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const handleTickPress = () => {
    navigation.navigate('MyCanvas', {text: input});
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar hidden /> */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesomeIcon size={30} icon={faArrowLeft} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon size={30} icon={faXmark} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTickPress}>
          <FontAwesomeIcon size={30} icon={faCheck} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesomeIcon size={30} icon={faTrash} />
        </TouchableOpacity>
        {/* <FontAwesomeIcon size={30} icon={faRotateRight} /> */}
        {/* <FontAwesomeIcon size={30} icon={faRotateLeft} /> */}
        <Text></Text>
      </View>

      <View style={styles.inputBox}>
        <Input
          value={input}
          onChangeText={value => setInput(value)}
          variant="outline"
          placeholder="Type Something....."
        />
      </View>

      <TouchableOpacity style={styles.textButton}>
        <Text>TEXT</Text>
      </TouchableOpacity>
    </View>
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

import {Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CONSTANTS = {
  windowHeight,
  windowWidth,
};

export default CONSTANTS;

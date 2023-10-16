import React from 'react';
import {Box, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import SignatureScreen from '../components/Sign';
import DraggableText from '../components/DraggableText';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const handleCreateNew = () => {
    navigation.navigate('CreateCanvas');
  };

  const handleMyProjects = () => {
    navigation.navigate('MyProjects');
  };

  return (
    <Box bg={'black'} flex={1}>
      <Button m={10} onPress={handleCreateNew}>
        Create New
      </Button>
      <Button onPress={handleMyProjects}>My Projects</Button>
    </Box>
  );
};

export default Home;

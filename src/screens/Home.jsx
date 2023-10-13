import React, {useState} from 'react';
import {Box, Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  function handleCreateNew() {
    navigation.navigate('CreateCanvas');
  }
  function handleMyProjects() {
    navigation.navigate('MyProjects');
  }

  return (
    <Box alignItems="center">
      <Button m={10} onPress={handleCreateNew}>Create New</Button>
      <Button onPress={handleMyProjects}>My Projects</Button>
    </Box>
  );
};

export default Home;

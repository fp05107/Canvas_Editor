import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
        navigation.navigate("Home");       
    }, 2000);
  }, []);
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;

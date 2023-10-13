import React from 'react';
import StackNavigator from './src/routes/StackNavigator';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <StackNavigator />
    </NativeBaseProvider>
  );
};

export default App;

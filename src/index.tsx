import {StatusBar} from 'react-native';
import React from 'react';
import Routes from './routes/routes';
import './config/ReactotronConfig';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
      <Routes />
    </>
  );
};

export default App;

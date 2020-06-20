import React from 'react';
import {WebView} from 'react-native-webview';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {StackParamList} from '../../routes/types';

const PageWeb: React.FC = () => {
  const navigation = useNavigation<
    StackNavigationProp<StackParamList, 'PageWeb'>
  >();
  const route = useRoute<RouteProp<StackParamList, 'PageWeb'>>();
  const {url, nameLib} = route.params;

  navigation.setOptions({title: nameLib});

  return <WebView source={{uri: url}} style={{flex: 1}} />;
};

export default PageWeb;

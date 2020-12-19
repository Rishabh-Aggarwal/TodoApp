import * as React from 'react';

import Todo_App from './screens/Todo_App';
import YellowBox  from 'react-native';
//import { StyleSheet, Text, View } from 'react-native';

import store from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
  
  return (
    <Provider store={store}>
      <Todo_App/>
    </Provider>
  );
}

export default App;

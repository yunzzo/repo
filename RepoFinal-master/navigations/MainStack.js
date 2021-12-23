import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Channel, ChannelCreation } from '../screens';
import DetailPage from "../DetailPage"

const Stack = createStackNavigator();


const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.background },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
      options={{
        headerShown: false,
      }}
      name="Channel Creation" component={DetailPage} />
      <Stack.Screen name="Channel" component={Channel} />
    </Stack.Navigator>
  );
};

export default MainStack;
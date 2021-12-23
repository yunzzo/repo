import React from "react";
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ChannelCreation = ({ navigation }) => {
    return (
        <Container>
            <Text style={{ fontSize: 24 }}>안뇽 로그인 된거임</Text>
            <Button title = "Channel" onPress = {() =>navigation.navigate('Channel')} />
        </Container>
    );
};

export default ChannelCreation;

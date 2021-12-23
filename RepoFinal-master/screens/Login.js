import React, {useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Image, Input } from '../components';
import { images } from '../utils/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { login } from '../utils/firebase';
import { ProgressContext, UserContext } from '../contexts';
import { Button } from '../components';
import { View, Text } from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  backgroundColor: #627cec;
  padding-top: ${({ insets: { top } }) => top}px;
`;

const ErrorText = styled.Text`
  align-items: flex-end;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {
  const { dispatch} = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const insets = useSafeAreaInsets();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    );
  };
  const _handlePasswordChange = password => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async () => {
    try {
      spinner.start()
      const user = await login({ email, password });
      dispatch(user);
    } catch (e) {
      Alert.alert('Login Error', e.message);
    } finally {spinner.stop();}
  };


  return ( 
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets = {insets}>
        <Image url={images.logo} imageStyle = {{ borderRadius: 1, width: 300, height: 150, marginTop: 200}} />
        
        <View style={{ width: "100%", 
        paddingTop: 30,
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 730,

        }}>
          <View style = {{ marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: "white", borderBottomColor: "#627cec"}}>
          <FloatingLabelInput
          style = {{height: 50}}
          inputStyles = {{fontSize: 20, marginTop: 10, color: "#627cec"}}
          labelStyles = {{fontSize: 20,}}
          containerStyles= {{margin: 10}}
              label="Email"
              value={email}
              onChangeText={_handleEmailChange}
              onSubmitEditing={() => passwordRef.current.focus()}
              placeholder="Email"
              returnKeyType="next"
            />
          </View>
          <View style = {{ marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: "white", borderBottomColor: "#627cec"}}>
          <FloatingLabelInput
          containerStyles= {{margin: 10}}
         style = {{height: 50}}
         inputStyles = {{fontSize: 20, marginTop: 10, color: "#627cec"}}
         labelStyles = {{fontSize: 20,}}
            ref={passwordRef}
            label="Password"
            value={password}
            onChangeText={_handlePasswordChange}
            onSubmitEditing={_handleLoginButtonPress}
            placeholder="Password"
            returnKeyType="done"
            isPassword
          />
          </View>
          <Text style={{color: "#939393", fontWeight: "700", marginLeft: 180, marginTop: 20}}>아이디 찾기   |   비밀번호 찾기</Text>
          <View
          style={{
            marginTop: 210,
          }}>
            
          <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled = {disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
          shadowColor = "grey"
        />
        </View>
        
        </View>
        </Container>
      
    </KeyboardAwareScrollView>
  )
}

export default Login;

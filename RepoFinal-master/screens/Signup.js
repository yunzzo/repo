import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, removeWhitespace } from '../utils/common';
import { Alert } from 'react-native';
import { signup } from '../utils/firebase';
import { ProgressContext, UserContext } from '../contexts';
import { View, Text } from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
  fontWeight: 700;
`;
const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Signup = () => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = 'Please enter your name.';
      } else if (!validateEmail(email)) {
        _errorMessage = 'Please verify your email.';
      } else if (password.length < 8) {
        _errorMessage = 'The password must contain 8 characters at least.';
      } else if (password !== passwordConfirm) {
        _errorMessage = 'Passwords need to match.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);
  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignupButtonPress = async () => {
    try {
      spinner.start();
      const user = await signup({ email, password, name });
      Alert.alert('Signup Success', user.email)
      dispatch(user);

    } catch (e) {
      Alert.alert('Signup Error', e.message);
    } finally{
      spinner.stop();
    }
  };


  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <View style = {{width: "100%"}}>
      <View style = {{ marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: "white", borderBottomColor: "#627cec"}}>
          <FloatingLabelInput
          containerStyles= {{margin: 10}}
         style = {{height: 50}}
         inputStyles = {{fontSize: 20, marginTop: 15, color: "#627cec"}}
         labelStyles = {{fontSize: 20,}}
          label="Enter Your Name!"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />
        </View>

        <View style = {{ marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: "white", borderBottomColor: "#627cec"}}>
          <FloatingLabelInput
          containerStyles= {{margin: 10}}
         style = {{height: 50}}
         inputStyles = {{fontSize: 20, marginTop: 10, color: "#627cec"}}
         labelStyles = {{fontSize: 20,}}
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={text => setEmail(removeWhitespace(text))}
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
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        </View>
        <View style = {{ marginBottom: 20, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor: "white", borderBottomColor: "#627cec"}}>
          <FloatingLabelInput
          containerStyles= {{margin: 10}}
         style = {{height: 50}}
         inputStyles = {{fontSize: 20, marginTop: 10, color: "#627cec"}}
         labelStyles = {{fontSize: 20,}}
          ref={passwordConfirmRef}
          label="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          placeholder="Password Confirm"
          returnKeyType="done"
          isPassword
        />
        </View>
        <ErrorText>{errorMessage}</ErrorText>
        
        <View style ={{marginTop: 250}}>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
        />
        </View>
        </View>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
import React, {ReactNode} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface IProps {
  children: ReactNode;
}

const KeyboardWrapper: React.FC<IProps> = ({children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{}}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-between',
          minHeight: '100%',
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;

const styles = StyleSheet.create({});

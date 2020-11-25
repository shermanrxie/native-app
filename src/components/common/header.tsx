import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

interface IHeader extends React.Props<any> {
  headerText: string;
}

export const Header = ({headerText}: IHeader) => {
  const {textStyle, viewStyle} = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
  } as ViewStyle,
  viewStyle: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative',
  } as ViewStyle,
});

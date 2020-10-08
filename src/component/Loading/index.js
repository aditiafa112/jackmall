import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dimensions} from 'react-native';

const Loading = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container(windowWidth, windowHeight)}>
      <Text style={styles.title}>Loading ...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: (width, height) => ({
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(42, 49, 50, 0.7)',
  }),
  title: {
    color: '#fff',
    fontSize: 16,
  },
});

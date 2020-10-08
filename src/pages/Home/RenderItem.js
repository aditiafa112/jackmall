import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const RenderItem = ({item, index}) => {
  const stateGlobal = useSelector((state) => state);
  const dispatch = useDispatch();

  const HelloWorld = () => {
    Alert.alert(
      'Hello World',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Hello too!', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  const moveToFirst = (arr, old_index = 0, new_index) => {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while (k-- + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    dispatch({type: 'SET_LIST', value: arr});
  };

  return (
    <TouchableOpacity style={styles.listWrapper} onPress={HelloWorld}>
      <View style={styles.indexWrapper}>
        <Text style={styles.index}>{index + 1}</Text>
      </View>
      <Text style={{flex: 1, marginRight: 10, color: '#fff', fontSize: 16}}>
        {item.joke}
      </Text>
      {index !== 0 ? (
        <TouchableOpacity
          style={styles.upWrapper(true)}
          onPress={() => moveToFirst(stateGlobal.listText, index)}>
          <Text style={styles.up}>UP</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.upWrapper(false)}>
          <Text style={styles.up}>TOP</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: 'row',
    margin: 10,
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#763626',
    alignItems: 'center',
  },
  indexWrapper: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  index: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  upWrapper: (active) => ({
    backgroundColor: active ? '#266676' : 'transparent',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  }),
  up: {
    color: '#fff',
  },
});

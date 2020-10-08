import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../api';
import RenderItem from './RenderItem';

const Home = () => {
  const [addLimit, setaddLimit] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const stateGlobal = useSelector((state) => state);
  const dispatch = useDispatch();

  const getApi = async (quantity) => {
    dispatch({type: 'SET_LOADING', value: true});
    console.log('quantiti', quantity);
    const getRandomText = await Api.getRandomText(quantity);
    if (quantity) {
      dispatch({type: 'SET_LIST', value: getRandomText});
    } else {
      setaddLimit(addLimit + 1);
      dispatch({type: 'ADD_LIST', value: getRandomText[0]});
    }
    console.log('LIST : ', stateGlobal.listText);
    dispatch({type: 'SET_LOADING', value: false});
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getApi(3).then(() => {
      setaddLimit(0);
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getApi(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text style={styles.title}>Who's on top ?</Text>

      <FlatList
        data={stateGlobal.listText}
        renderItem={(item) => {
          return <RenderItem item={item.item} index={item.index} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => {
          return (
            <View style={styles.listEmptyWrapper}>
              <Image
                style={styles.listEmptyText}
                source={require('../../assets/empty.png')}
              />
            </View>
          );
        }}
        ListFooterComponent={() => {
          return (
            addLimit !== 2 && (
              <TouchableOpacity
                style={styles.listFooterWrapper}
                onPress={() => getApi()}>
                <Text style={styles.listFooterText}>+ Add more data</Text>
              </TouchableOpacity>
            )
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  listEmptyWrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  listEmptyText: {width: 200, height: 200},
  listFooterWrapper: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2a3132',
    alignItems: 'center',
  },
  listFooterText: {color: 'white'},
});

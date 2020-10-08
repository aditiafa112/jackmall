import React from 'react';
import {Provider, useSelector} from 'react-redux';
import Loading from './component/Loading';
import Home from './pages/Home';
import store from './redux/store';

const MainApp = () => {
  const stateGlobal = useSelector((state) => state);

  return (
    <>
      <Home />
      {stateGlobal.loading && <Loading />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;

const {createStore} = require('redux');

const initialState = {
  loading: false,
  listText: [],
  author: 'Aditia Falacha Arvin',
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === 'SET_LIST') {
    return {
      ...state,
      listText: action.value,
    };
  }
  if (action.type === 'ADD_LIST') {
    return {
      ...state,
      listText: [...state.listText, action.value],
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;

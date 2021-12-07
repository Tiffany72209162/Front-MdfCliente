import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducers from '../redux/index';
import thunk from 'redux-thunk';
const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunkMiddleware, thunk),
      window.devToolsExtension
        ? window.devToolsExtension()
        : function (f) {
            return f;
          }
    )
  );


export default store;